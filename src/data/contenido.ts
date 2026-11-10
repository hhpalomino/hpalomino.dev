// Este es el archivo que se edita para cambiar lo que dice la página.
// Las dos frases de consultoría marcadas "vinculante" son palabras propias del
// dueño del sitio y no se deben editar.
//
// Fuente del texto: docs/propuesta-contenido.md §4, aprobada el 1 de octubre
// de 2026. El orden de las constantes sigue el orden de la página (§3).

import type { trabajos } from './site';

export interface TituloConEnfasis {
  readonly antes: string;
  readonly enfasis: string;
  readonly despues: string;
}

export interface Enlace {
  readonly label: string;
  readonly href: string;
}

/** Ilustración esquemática de un servicio (componente EsquemaServicio). */
export type TipoEsquema = 'sitio' | 'panel' | 'integracion';

export interface Servicio {
  /** Identificador para el enlace del índice (#servicio-<id>). Minúsculas, sin espacios. */
  readonly id: string;
  /** Nombre corto para el índice numerado de arriba. */
  readonly corto: string;
  /**
   * Ancho del cuadro en escritorio, sobre 12 columnas:
   * 'grande' = 7, 'chico' = 5, 'completo' = 12.
   * Cada fila tiene que sumar 12: grande + chico, chico + grande, o completo.
   */
  readonly tamano: 'grande' | 'chico' | 'completo';
  readonly titulo: string;
  readonly texto: string;
  readonly lista: readonly string[];
  readonly enlace: Enlace | null;
  /**
   * Dibujo esquemático al pie del cuadro: 'sitio', 'panel' o 'integracion'.
   * null (o sin el campo) = el cuadro va sin ilustración.
   */
  readonly esquema?: TipoEsquema | null;
  /**
   * Color propio del servicio (tokens.css, --tono-<nombre>): pinta el número,
   * los detalles del esquema y la luz de la tarjeta. Uno distinto por
   * servicio; el amarillo queda para los botones.
   */
  readonly tono: 'naranjo' | 'turquesa' | 'violeta';
}

/** Frase en negrita seguida del resto del bloque. */
export interface ConEntrada {
  readonly entrada: string;
  readonly resto: string;
}

export interface Paso {
  readonly numero: number;
  readonly nombre: string;
  readonly texto: string;
  /** Lo esencial del paso en dos o tres palabras, sacado del propio texto
   *  (nada que el texto no diga). Va en una etiqueta sobre el nombre. */
  readonly dato: string;
}

export interface Pregunta {
  readonly pregunta: string;
  readonly respuesta: string;
}

export interface DatoFicha {
  readonly etiqueta: string;
  readonly valor: string;
}

/** Opción de una lista desplegable: `valor` es lo que se envía, `label` lo que se lee. */
export interface Opcion {
  readonly valor: string;
  readonly label: string;
}

type NombreTrabajo = (typeof trabajos)[number]['nombre'];

export const accesibilidad = {
  saltar: 'Saltar al contenido',
  navPrincipal: 'Principal',
  navSecundaria: 'Secundaria',
  cerrarFormulario: 'Cerrar el formulario',
} as const;

// ---- 4.1 Cabecera -----------------------------------------------------------

export const cabecera = {
  cta: 'Escríbeme',
  // Nombre para lectores de pantalla: incluye el texto visible y dice adónde.
  ctaAccesible: 'Escríbeme por WhatsApp',
} as const;

// ---- 4.2 Hero ---------------------------------------------------------------

export const hero = {
  rotulo: 'Desarrollador de software · Chile y Brasil',
  // vinculante (PRODUCT.md)
  titular: {
    antes: '¿Tienes una idea? Te ayudo a convertirla en un ',
    enfasis: 'producto real.',
    despues: '',
  } satisfies TituloConEnfasis,
  bajada:
    'Hago sitios web y sistemas a medida para tu negocio, también si recién está partiendo. Me escribes a mí, y soy yo quien los construye.',
  // Enlaces a cada servicio de la página (antes eran pastillas sin enlace,
  // que parecían botones y no hacían nada).
  pastillas: [
    { label: 'Sitios web', href: '#servicio-sitios-web' },
    { label: 'Software a medida', href: '#servicio-software' },
    { label: 'Integraciones', href: '#servicio-integraciones' },
    { label: 'Consultoría', href: '#consultoria' },
  ] satisfies readonly Enlace[],
  botonWhatsApp: 'Escríbeme por WhatsApp',
  // Abre la ventana del formulario. El correo vive solo en la sección de
  // contacto, como respaldo.
  enlaceFormulario: 'Déjame un mensaje',
} as const;

// ---- 4.4 Qué hago -----------------------------------------------------------

export const servicios = {
  rotulo: 'Servicios',
  titulo: {
    antes: 'Sistemas a medida para ',
    enfasis: 'tu negocio',
    despues: '',
  } satisfies TituloConEnfasis,
  bajada:
    'Desde una página para que te encuentren hasta una herramienta que ordena tu operación. Partimos por lo que necesitas hoy, y se amplía cuando el negocio lo pida.',
  // ── CÓMO AGREGAR UN SERVICIO NUEVO ──────────────────────────────────────
  // Copia uno de los bloques de abajo, pégalo donde quieras que aparezca y
  // cambia sus textos. El número (01, 02…), el índice de arriba y el enlace
  // se generan solos según el orden. No hay que tocar ningún componente.
  //   id:     corto, en minúsculas, sin espacios ni tildes (ej. 'chatbot')
  //   corto:  como aparece en el índice (ej. 'Chatbot de WhatsApp')
  //   tamano: 'grande' (7/12), 'chico' (5/12) o 'completo' (12/12). Cada fila
  //           debe sumar 12: grande+chico, chico+grande, o un completo solo.
  //   lista:  tres o cuatro puntos; puede quedar vacía: []
  //   enlace: null, o { label: 'Ver más', href: '/ruta' } si hay página
  //   esquema: dibujo al pie del cuadro: 'sitio' (página y teléfono),
  //           'panel' (tablero) o 'integracion' (sistemas conectados).
  //           null = el cuadro va sin ilustración.
  // ────────────────────────────────────────────────────────────────────────
  items: [
    {
      id: 'sitios-web',
      tono: 'naranjo',
      corto: 'Sitios web',
      tamano: 'chico',
      titulo: 'Sitios web',
      texto:
        'Sitios web, ecommerce y landing pages hechos para tu negocio. Sin plantillas de por medio.',
      lista: [
        'Diseño propio, para tu marca',
        'Preparado para que Google lo entienda',
        'Ficha de Google vinculada al sitio',
      ],
      enlace: null,
      esquema: 'sitio',
    },
    {
      id: 'software',
      tono: 'turquesa',
      corto: 'Software a medida',
      tamano: 'grande',
      titulo: 'Software a medida',
      texto:
        'Diseño y construyo la herramienta que ningún programa te da, pensada en cómo trabaja tu negocio. Si hace falta, la conecto con el sistema que ya tienes.',
      lista: [
        'Un panel para lo que hoy llevas a mano',
        'Conectado con el sistema que ya usas, si hace falta',
        'Lo que haces repetido, lo hace el sistema',
        'Hecho para crecer cuando el negocio crezca',
      ],
      enlace: null,
      esquema: 'panel',
    },
    // Las dos frases de consultoría (vinculantes, PRODUCT.md) viven en la sección
    // "¿No sabes aún qué necesitas?" (`consultoria`), no en estos bloques.
    {
      id: 'integraciones',
      tono: 'violeta',
      corto: 'Integraciones',
      tamano: 'completo',
      titulo: 'Integraciones',
      texto:
        'Conecto tu sitio con los sistemas que ya usas —de gestión, de pagos, tu calendario— para que dejes de copiar datos de un lado a otro.',
      lista: [
        'Agenda del sitio sincronizada con tu calendario',
        'Pagos del sitio a tu sistema de cobro',
        'Tu programa de gestión conectado al sitio',
      ],
      enlace: null,
      esquema: 'integracion',
    },
  ] satisfies readonly Servicio[],
} as const;

// ---- 4.4b ¿No sabes aún qué necesitas? ---------------------------------------
// vinculante (PRODUCT.md): la cita y la frase de cierre son palabras propias
// del dueño del sitio. No editar.

export const consultoria = {
  rotulo: 'Consultoría',
  titulo: {
    antes: '¿No sabes qué necesitas? Te ayudo a ',
    enfasis: 'averiguarlo',
    despues: '',
  } satisfies TituloConEnfasis,
  intro:
    'Si estás partiendo un negocio y la tecnología no es lo tuyo, no tienes que llegar sabiendo qué pedir. Me cuentas qué quieres hacer y lo ordenamos juntos:',
  puntos: [
    {
      lead: 'Qué contratar y qué no.',
      texto: 'Dominio, correo, dónde alojar la página, qué cuenta abrir primero y cuál puede esperar.',
    },
    {
      lead: 'Qué programas usar.',
      texto: 'Para facturar, agendar, cobrar o llevar el inventario, casi siempre hay algo que ya existe y sirve.',
    },
    {
      lead: 'Si conviene desarrollar algo, o no.',
      texto: 'Te lo digo con razones. Las dos respuestas son parte del trabajo.',
    },
  ],
  cierre: 'Si conviene construir algo, lo hago yo. A veces la respuesta es no desarrollar nada.',
  // Palabras propias del dueño del sitio: no editar.
  cita: 'A veces lo que necesitas ya existe y cuesta veinte dólares al mes. Prefiero decírtelo a venderte un desarrollo que no te va a rendir.',
} as const;

// ---- 4.5 Cómo trabajo -------------------------------------------------------

export const comoTrabajo = {
  rotulo: 'Cómo trabajo',
  titulo: {
    antes: 'De la primera conversación a la entrega, ',
    enfasis: 'hablas conmigo',
    despues: '',
  } satisfies TituloConEnfasis,
  pasos: [
    {
      numero: 1,
      nombre: 'Conversamos.',
      dato: '20 min · sin costo',
      texto:
        'Veinte minutos, sin costo. Me cuentas cómo funciona hoy tu negocio y qué te está complicando. Yo pregunto; tú no tienes que preparar nada.',
    },
    {
      numero: 2,
      nombre: 'Te mando una propuesta por escrito.',
      dato: 'Alcance, plazo y precio',
      texto:
        'Qué se va a hacer, qué queda fuera, cuánto demora y cuánto vale. Si creo que no te conviene hacerlo, esa es la propuesta.',
    },
    {
      numero: 3,
      nombre: 'Construyo y te muestro.',
      dato: 'Ves avances',
      texto: 'Vas viendo avances y los comentas antes de que esté terminado, no después.',
    },
    {
      numero: 4,
      nombre: 'Publico y me quedo cerca.',
      dato: 'Sigo en WhatsApp',
      texto:
        'Lo dejo andando y sigo del otro lado del WhatsApp para lo que venga después.',
    },
  ] satisfies readonly Paso[],
  // Cierre de la sección: el primer paso es escribir.
  cierre: 'El primer paso es una conversación.',
} as const;

// "Después de entregar" (la mantención mensual) salió de la home el 2 de
// octubre: va en /sitios-web. Su texto completo quedó en
// docs/propuesta-contenido.md §4.6.

// "Qué no incluye" salió de la home el 2 de octubre: no aportaba. Si muchos
// clientes llegan preguntando por lo que queda fuera, se reevalúa. El texto
// quedó en docs/propuesta-contenido.md §4.7.

// ---- 4.8 Trabajo publicado --------------------------------------------------
// Nombre, tipo, lugar y enlace viven en site.ts (`trabajos`). Acá solo la
// línea de cada uno. PRODUCT.md: una franja corta; el detalle va en /portafolio.

export const trabajoPublicado = {
  // Rehecho el 4 de octubre de 2026. En primera persona ("en mí", no "en
  // nosotros"): el sitio entero se apoya en que es una sola persona.
  // "Quienes" y no "clientes": Bistream es propio, no un cliente.
  rotulo: 'Portafolio',
  titulo: {
    antes: 'Quienes ya ',
    enfasis: 'confiaron en mí',
    despues: '',
  } satisfies TituloConEnfasis,
  intro: 'Un estudio jurídico, una cafetería y una empresa que lo usa todos los días. Entra y pruébalos: están en línea.',
  // Texto alternativo de cada captura: "Captura de <nombre>".
  altCaptura: 'Captura de',
  // Etiqueta sobre cada captura. Solo va si el trabajo está en línea.
  enLinea: 'En línea',
  // Texto del botón de cada trabajo: Bistream es una plataforma, no un sitio.
  ver: {
    'Trasciende Legal': 'Ver el sitio',
    "Mateo's Coffee": 'Ver el sitio',
    Bistream: 'Ver la plataforma',
  } satisfies Record<NombreTrabajo, string>,
  // Cierre de la sección, con el botón de WhatsApp.
  cierre: '¿Quieres algo así para tu negocio?',
  descripciones: {
    'Trasciende Legal': 'Sitio a medida y agendamiento en línea.',
    "Mateo's Coffee": 'Sitio en dos idiomas, catálogo administrable y ficha de Google.',
    Bistream: 'Producto propio: tablero de ventas, pedidos e inventario conectado al sistema de una empresa. En uso todos los días.',
  } satisfies Record<NombreTrabajo, string>,
  enlace: { label: 'Ver todo el portafolio', href: '/portafolio' } satisfies Enlace,
} as const;

// ---- 4.9 Con quién hablas ---------------------------------------------------

export const sobreMi = {
  rotulo: 'Sobre mí',
  titulo: {
    antes: 'El que responde es ',
    enfasis: 'el que construye',
    despues: '',
  } satisfies TituloConEnfasis,
  // Sin mencionar que trabaja en una empresa: decisión del dueño, 2 de
  // octubre de 2026. La experiencia como empleado va en el portafolio/CV.
  parrafo:
    'Soy Héctor Palomino, desarrollador de software con diez años de experiencia. Me gusta acercar la tecnología a las personas: que tu negocio la aproveche sin que tengas que entenderla por dentro.',
  fotoAlt: 'Foto de Héctor Palomino',
  // Credencial: foto, nombre y rol arriba; los datos de la ficha debajo.
  credencial: {
    nombre: 'Héctor Palomino',
    rol: 'Desarrollador de software',
  },
  // Hechos, sin cifras inventadas. Sin ubicación: el dueño no quiere
  // publicar dónde está, solo dónde atiende (2 de octubre de 2026).
  ficha: [
    { etiqueta: 'Atiendo en', valor: 'Chile y Brasil' },
    { etiqueta: 'Formación', valor: 'Analista programador, DUOC UC' },
  ] satisfies readonly DatoFicha[],
  enlace: { label: 'Ver el portafolio', href: '/portafolio' } satisfies Enlace,
} as const;

// ---- 4.10 Preguntas frecuentes ----------------------------------------------

export const preguntas = {
  rotulo: 'Preguntas frecuentes',
  // Título propio (antes la sección solo tenía el rótulo). Se sostiene solo
  // si se tapa el rótulo.
  titulo: 'Lo que más me preguntan',
  items: [
    {
      pregunta: '¿Cuánto cuesta?',
      respuesta:
        'Depende de lo que necesites, y no lo adivino: conversamos, y te mando una propuesta por escrito con el alcance y el valor antes de empezar. No hay precios publicados porque dos negocios con la misma pregunta rara vez necesitan lo mismo.',
    },
    {
      pregunta: '¿Cuánto demora?',
      respuesta:
        'Un sitio sencillo, semanas. Un sistema a medida, más, según lo que tenga que hacer y con qué tenga que conectarse. El plazo va en la propuesta escrita, no se improvisa.',
    },
    {
      pregunta: '¿La primera conversación tiene costo?',
      respuesta:
        'No. Son veinte minutos para entender qué te pasa. Si lo que necesitas no es algo que yo haga, te lo digo ahí mismo.',
    },
    {
      pregunta: 'Ya tengo un sitio. ¿Puedes mejorarlo?',
      respuesta:
        'Depende de cómo esté hecho. Lo reviso y te digo si conviene arreglarlo o partir de nuevo, y por qué.',
    },
    {
      pregunta: '¿Atiendes en Brasil?',
      respuesta:
        'Sí. Tengo clientes allá. El sitio está en español; si prefieres hablar en portugués, escríbeme igual.',
    },
  ] satisfies readonly Pregunta[],
} as const;

// ---- 4.11 Contacto ----------------------------------------------------------

export const contacto = {
  titulo: {
    antes: '¿Empezamos por una ',
    enfasis: 'conversación',
    despues: '?',
  } satisfies TituloConEnfasis,
  bajada:
    'Cuéntame qué te está complicando hoy, aunque no sepas cómo se llama la solución ni si existe. Por ahí parte cualquier trabajo.',
  etiquetaWhatsApp: 'WhatsApp',
  etiquetaCorreo: 'Correo',
  // Orden de los canales en todo el sitio: WhatsApp es el principal
  // (cabecera, hero, botón flotante y la tarjeta destacada de acá); el
  // formulario es el segundo (enlace del hero y tarjeta de acá) y se abre en
  // una ventana, como en titacode.com; el correo es respaldo y aparece solo
  // en esta sección, como una línea bajo las tarjetas. Los límites de largo
  // del formulario viven en site.ts (`limitesFormulario`).
  etiquetaFormulario: 'Formulario',
  correo: { antes: '¿Prefieres tu correo? ' },
  formulario: {
    abrir: 'Déjame un mensaje',
    titulo: 'Déjame un mensaje',
    bajada: 'Cuéntame qué necesitas. Te respondo al correo o al WhatsApp que me dejes.',
    campos: {
      nombre: { label: 'Tu nombre' },
      contacto: {
        label: '¿Cómo te contacto?',
        ayuda: 'Tu correo o tu WhatsApp, lo que prefieras.',
      },
      necesidad: {
        label: '¿Qué necesitas?',
        placeholder: 'Elige una opción',
        // El servidor acepta solo estos valores y pone el label en el asunto
        // del correo. Agregar una opción acá basta: no hay que tocar el
        // endpoint.
        opciones: [
          { valor: 'sitio', label: 'Un sitio web' },
          { valor: 'software', label: 'Software a medida' },
          { valor: 'integracion', label: 'Conectar sistemas que ya uso' },
          { valor: 'no-se', label: 'Todavía no lo sé' },
        ] satisfies readonly Opcion[],
      },
      mensaje: {
        label: 'Cuéntame',
        ayuda: 'Como lo vives en tu negocio. No hace falta usar términos técnicos.',
      },
    },
    errores: {
      nombre: 'Escribe tu nombre.',
      contacto: 'Déjame un correo o un WhatsApp para responderte.',
      mensaje: 'Cuéntame un poco más (al menos 10 caracteres).',
      verificacion: 'Marca la casilla de verificación antes de enviar.',
    },
    boton: 'Enviar mensaje',
    botonEnviando: 'Enviando…',
    privacidad: 'Lo que escribas me llega solo a mí, por correo. No lo guardo en ninguna base de datos.',
    exito: 'Me llegó bien. Te respondo yo, directo.',
    // {email} se reemplaza por el correo de site.ts, como enlace.
    error: 'No se pudo enviar. Escríbeme por WhatsApp o a {email}.',
    // Etiqueta del campo trampa contra bots: nadie la ve ni la escucha.
    trampa: 'No llenes este campo',
  },
} as const;
