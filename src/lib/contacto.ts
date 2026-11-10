// Lógica del formulario de contacto que no depende del entorno ni de la red:
// leer el cuerpo, validar, armar el correo y la respuesta. Vive aparte del
// endpoint (src/pages/api/contacto.ts) para poder probarla sin servidor, sin
// claves y sin llamar a Turnstile ni a Resend (src/lib/contacto.test.ts).

import { contacto as sitioContacto, limitesFormulario } from '../data/site';
import { contacto as texto } from '../data/contenido';

const REMITENTE = 'Formulario hpalomino.dev <formulario@hpalomino.dev>';
const ES_CORREO = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export type CodigoError = 'campos' | 'turnstile' | 'envio';

export interface Mensaje {
  nombre: string;
  contacto: string;
  /** Label legible de la opción elegida, o null si no eligió ninguna. */
  necesidad: string | null;
  mensaje: string;
}

// ---- Lectura del cuerpo -----------------------------------------------------

/** Devuelve los campos como texto, o null si el cuerpo no se puede leer. */
export async function leerCampos(request: Request): Promise<Record<string, string> | null> {
  const tipo = request.headers.get('content-type') ?? '';
  const campos: Record<string, string> = {};
  try {
    if (tipo.includes('application/json')) {
      const datos: unknown = await request.json();
      if (typeof datos !== 'object' || datos === null) return null;
      for (const [clave, valor] of Object.entries(datos)) {
        if (typeof valor === 'string') campos[clave] = valor;
      }
      return campos;
    }
    if (tipo.includes('application/x-www-form-urlencoded') || tipo.includes('multipart/form-data')) {
      const datos = await request.formData();
      for (const [clave, valor] of datos) {
        if (typeof valor === 'string') campos[clave] = valor;
      }
      return campos;
    }
  } catch {
    return null;
  }
  return null;
}

// ---- Validación -------------------------------------------------------------
// Las mismas reglas que valida el navegador (FormularioContacto.astro).

function largoValido(valor: string, { min, max }: { min: number; max: number }): boolean {
  return valor.length >= min && valor.length <= max;
}

export function validar(campos: Record<string, string>): Mensaje | null {
  const nombre = (campos.nombre ?? '').trim();
  const contacto = (campos.contacto ?? '').trim();
  const mensaje = (campos.mensaje ?? '').trim();
  const valorNecesidad = (campos.necesidad ?? '').trim();

  if (!largoValido(nombre, limitesFormulario.nombre)) return null;
  if (!largoValido(contacto, limitesFormulario.contacto)) return null;
  if (!largoValido(mensaje, limitesFormulario.mensaje)) return null;

  // Opcional, pero si viene tiene que ser una de las opciones del formulario.
  let necesidad: string | null = null;
  if (valorNecesidad) {
    const opcion = texto.formulario.campos.necesidad.opciones.find((o) => o.valor === valorNecesidad);
    if (!opcion) return null;
    necesidad = opcion.label;
  }

  return { nombre, contacto, necesidad, mensaje };
}

// ---- Origen -----------------------------------------------------------------

/** IP de quien envía. Vercel la pone en x-real-ip; x-forwarded-for trae la
 *  cadena de proxies y la primera es la del cliente. */
export function ipCliente(request: Request): string | undefined {
  const real = request.headers.get('x-real-ip')?.trim();
  if (real) return real;
  return request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || undefined;
}

// ---- Correo -----------------------------------------------------------------

export function armarCorreo(m: Mensaje, ahora: Date = new Date()) {
  // Sin saltos de línea en el asunto, aunque el nombre los traiga.
  const nombreEnAsunto = m.nombre.replace(/[\r\n]+/g, ' ');
  const asunto = `Nuevo mensaje de ${nombreEnAsunto}` + (m.necesidad ? ` · ${m.necesidad}` : '');
  const fecha = new Intl.DateTimeFormat('es-CL', {
    dateStyle: 'full',
    timeStyle: 'short',
    timeZone: 'America/Santiago',
  }).format(ahora);

  // Texto plano: nada se interpreta como HTML.
  const cuerpo = [
    `Nombre: ${m.nombre}`,
    `Contacto: ${m.contacto}`,
    `Necesita: ${m.necesidad ?? 'Sin indicar'}`,
    `Fecha: ${fecha} (hora de Chile)`,
    '',
    'Mensaje:',
    m.mensaje,
  ].join('\n');

  return {
    from: REMITENTE,
    to: [sitioContacto.email],
    subject: asunto,
    text: cuerpo,
    // "Responder" va directo a la persona solo si dejó un correo. Si dejó un
    // teléfono, se le escribe por WhatsApp.
    ...(ES_CORREO.test(m.contacto) ? { reply_to: m.contacto } : {}),
  };
}

// ---- Respuesta --------------------------------------------------------------

export function responder(quiereJson: boolean, resultado: { ok: true } | { ok: false; error: CodigoError; estado: number }) {
  if (quiereJson) {
    return resultado.ok
      ? Response.json({ ok: true })
      : Response.json({ ok: false, error: resultado.error }, { status: resultado.estado });
  }
  // Sin JavaScript: de vuelta a la sección de contacto, que lee el parámetro.
  const destino = resultado.ok ? '/?contacto=enviado#contacto' : '/?contacto=error#contacto';
  return new Response(null, { status: 303, headers: { Location: destino } });
}
