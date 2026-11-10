// Recibe el formulario de contacto y lo manda por correo a hola@hpalomino.dev.
// Es la única ruta del sitio que corre en el servidor (función de Vercel);
// todo lo demás se prerenderiza. No guarda nada: lo que llega se valida, se
// envía con Resend y se olvida.
//
// Dos formas de llegar:
// - Con JavaScript, el formulario manda JSON y pide JSON de vuelta
//   (`Accept: application/json`): se responde { ok } con el código HTTP que
//   corresponde.
// - Sin JavaScript, es un POST normal de formulario: se responde con una
//   redirección 303 a la página, con ?contacto=enviado o ?contacto=error.
//
// Este archivo solo coordina y habla con el exterior (entorno, Turnstile,
// Resend). Leer, validar y armar el correo está en src/lib/contacto.ts.
//
// Configuración (claves de Turnstile y Resend): docs/formulario.md.

import type { APIRoute } from 'astro';
import { RESEND_API_KEY, TURNSTILE_SECRET_KEY } from 'astro:env/server';
import {
  armarCorreo,
  ipCliente,
  leerCampos,
  responder,
  validar,
  type CodigoError,
  type Mensaje,
} from '../../lib/contacto';

export const prerender = false;

// Clave secreta de PRUEBA de Turnstile, publicada por Cloudflare: siempre
// aprueba. Solo se usa en desarrollo, cuando no hay clave real en .env.
const TURNSTILE_SECRETO_PRUEBA = '1x0000000000000000000000000000000AA';

// ---- Entorno ----------------------------------------------------------------
// El único lugar que lee variables de entorno. Se leen con astro:env (el
// esquema está en astro.config.mjs): en Vercel salen de process.env en cada
// petición, no quedan escritas en el código compilado; en desarrollo salen
// de .env. Un valor vacío cuenta como que no está.

function leerEntorno() {
  const vacio = (valor: string | undefined) => valor?.trim() || undefined;
  const turnstile = vacio(TURNSTILE_SECRET_KEY);
  return {
    // En producción, sin clave no hay verificación: el endpoint responde
    // error en vez de dejar pasar todo (la clave de prueba aprueba siempre).
    turnstileSecreto: turnstile ?? (import.meta.env.DEV ? TURNSTILE_SECRETO_PRUEBA : undefined),
    resendClave: vacio(RESEND_API_KEY),
  };
}

// ---- Turnstile --------------------------------------------------------------

async function verificarTurnstile(token: string, secreto: string, ip: string | undefined): Promise<boolean> {
  if (!token) return false;
  const cuerpo = new URLSearchParams({ secret: secreto, response: token });
  if (ip) cuerpo.set('remoteip', ip);
  try {
    const respuesta = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      body: cuerpo,
    });
    const datos = (await respuesta.json()) as { success?: boolean };
    return datos.success === true;
  } catch (error) {
    console.error('[contacto] No se pudo verificar Turnstile:', error);
    return false;
  }
}

// ---- Correo -----------------------------------------------------------------

async function enviarCorreo(m: Mensaje, clave: string | undefined): Promise<boolean> {
  const correo = armarCorreo(m);

  if (!clave) {
    // En desarrollo, sin clave de Resend, el correo se muestra en la consola
    // para poder probar el formulario. En producción, faltar la clave es un
    // error: nunca se finge que salió.
    if (import.meta.env.DEV) {
      console.log('[contacto] Sin RESEND_API_KEY: este correo se habría enviado.\n', correo);
      return true;
    }
    console.error('[contacto] Falta RESEND_API_KEY en producción.');
    return false;
  }

  try {
    const respuesta = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${clave}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(correo),
    });
    if (!respuesta.ok) {
      console.error('[contacto] Resend rechazó el envío:', respuesta.status, await respuesta.text());
      return false;
    }
    return true;
  } catch (error) {
    console.error('[contacto] No se pudo llamar a Resend:', error);
    return false;
  }
}

export const POST: APIRoute = async ({ request }) => {
  const quiereJson = (request.headers.get('accept') ?? '').includes('application/json');
  const fallo = (error: CodigoError, estado: number) => responder(quiereJson, { ok: false, error, estado });

  const campos = await leerCampos(request);
  if (!campos) return fallo('campos', 400);

  // Campo trampa: una persona no lo ve, un bot lo llena. Se le responde
  // como si hubiera salido bien, para que no insista, y no se envía nada.
  if ((campos.sitio_web ?? '').trim() !== '') return responder(quiereJson, { ok: true });

  const mensaje = validar(campos);
  if (!mensaje) return fallo('campos', 400);

  const entorno = leerEntorno();
  if (!entorno.turnstileSecreto) {
    console.error('[contacto] Falta TURNSTILE_SECRET_KEY en producción.');
    return fallo('turnstile', 500);
  }
  const token = (campos['cf-turnstile-response'] ?? '').trim();
  if (!(await verificarTurnstile(token, entorno.turnstileSecreto, ipCliente(request)))) {
    return fallo('turnstile', 400);
  }

  if (!(await enviarCorreo(mensaje, entorno.resendClave))) {
    return fallo('envio', entorno.resendClave ? 502 : 500);
  }

  return responder(quiereJson, { ok: true });
};
