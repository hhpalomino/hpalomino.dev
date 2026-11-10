// ============================================================================
//  CONTENIDO DE /portafolio (la página CV)
//  Para empresas y consultoras que evalúan contratar a Héctor (PRODUCT.md,
//  decisiones del 5 de octubre de 2026). Puede repetir cosas del inicio: la
//  audiencia es otra.
//
//  Reglas de siempre: sin cifras ni logros inventados, sin verbos de
//  marketing. Todo lo de acá sale del portafolio anterior (../Portafolio) o
//  de lo que Héctor confirmó.
// ============================================================================

import type { ImageMetadata } from 'astro';
import type { TituloConEnfasis } from './contenido';

import logoEglo from '../assets/logos/eglo-iso.png';
import logoBistream from '../assets/logos/bistream-iso.svg';
import logoTrasciende from '../assets/logos/trasciende-iso.svg';
import logoMateos from '../assets/logos/mateos-iso.png';

// Capturas de Bistream con datos ficticios (9 de noviembre de 2026): el
// nombre del cliente, sus empresas, canales y el usuario se reemplazaron por
// "Cliente de ejemplo", Demo/Demo 2, RET/WEB y "Usuario de ejemplo", y
// las cifras del tablero por montos inventados.
import bistreamInicio from '../assets/proyectos/bistream-inicio.png';
import bistreamTablero from '../assets/proyectos/bistream-tablero.png';
import trasciendeHome from '../assets/proyectos/trasciende-home.png';
import trasciendeAgenda from '../assets/proyectos/trasciende-agenda.png';
import mateosHome from '../assets/proyectos/mateos-home.jpg';
import mateosCarta from '../assets/proyectos/mateos-carta.png';
// Al administrador se le borró el correo de la cuenta (arriba a la derecha).
import mateosAdministrador from '../assets/proyectos/mateos-administrador.png';
import mateosCoworking from '../assets/proyectos/mateos-coworking.jpg';
import mateosVitrine from '../assets/proyectos/mateos-vitrine.jpg';

// ---- SEO --------------------------------------------------------------------

export const seo = {
  titulo: 'Portafolio y trayectoria — Héctor Palomino',
  descripcion:
    'Desarrollador de software con diez años de experiencia: aplicaciones internas con .NET y SQL Server, integración con Softland ERP y sitios web. Disponible en modalidad remota. Trayectoria, proyectos y herramientas.',
} as const;

// ---- Encabezado -------------------------------------------------------------

export const encabezado = {
  rotulo: 'Portafolio',
  nombre: 'Héctor Palomino Astudillo',
  rol: 'Desarrollador de software',
  bajada:
    'Diez años construyendo y manteniendo sistemas que una empresa usa todos los días: aplicaciones internas con .NET y SQL Server, integración con Softland ERP y sitios web. Hoy en EGLO Chile Iluminación y, en paralelo, con proyectos propios para negocios.',
  fotoAlt: 'Héctor Palomino',
  datos: [
    { etiqueta: 'Experiencia', valor: '10 años' },
    { etiqueta: 'Hoy', valor: 'EGLO Chile · Independiente' },
    { etiqueta: 'Formación', valor: 'Analista programador, DUOC UC' },
    { etiqueta: 'Idiomas', valor: 'Español · Inglés intermedio · Portugués básico' },
    { etiqueta: 'Modalidad', valor: 'Remota, desde Santiago de Chile' },
  ],
  botonLinkedIn: 'Ver LinkedIn',
  // CV de una página (10 de noviembre de 2026). Se genera fuera del sitio y
  // se copia a public/; si cambia el CV, se reemplaza ese archivo.
  botonCV: 'Descargar CV',
  archivoCV: '/cv-hector-palomino.pdf',
  botonCorreo: 'Escríbeme',
} as const;

// ---- Experiencia ------------------------------------------------------------

export interface Trabajo {
  readonly empresa: string;
  readonly cargo: string;
  readonly lugar: string;
  readonly periodo: string;
  /** Marca "Actual" junto al periodo. */
  readonly actual: boolean;
  readonly logo: ImageMetadata | null;
  /** Tono de la etapa (los de tokens.css): pinta el nodo, la luz de la
   *  tarjeta y las viñetas. El amarillo no: es solo para lo que se aprieta. */
  readonly tono: string;
  readonly puntos: readonly string[];
}

export const experiencia = {
  rotulo: 'Experiencia',
  titulo: { antes: 'Dónde he ', enfasis: 'trabajado', despues: '' } satisfies TituloConEnfasis,
  etiquetaActual: 'Actual',
  trabajos: [
    {
      empresa: 'EGLO Chile Iluminación',
      cargo: 'Desarrollador de software · Analista de sistemas',
      lugar: 'Santiago, Chile',
      periodo: 'Junio 2016 – hoy',
      actual: true,
      logo: logoEglo,
      tono: 'var(--tono-turquesa)',
      puntos: [
        'Desarrollo y mantención de aplicaciones web internas con .NET (ASP, VB, C#), SQL Server, HTML, CSS y JavaScript.',
        'Automatización de procesos de logística, facturación, arqueo y reportes.',
        'Integración de los sistemas internos con el ERP Softland, para que la información esté disponible y sea consistente.',
        'Análisis de procesos del negocio y propuesta de mejoras operativas.',
        'Trabajo directo con áreas no técnicas: traducir lo que necesitan en soluciones concretas.',
        'Soporte técnico, resolución de incidencias y modernización de interfaces web.',
      ],
    },
    {
      empresa: 'Independiente',
      cargo: 'Desarrollador de sistemas para empresas y sitios web',
      lugar: 'Chile y Brasil',
      periodo: '2026 – hoy, en paralelo',
      actual: true,
      logo: null,
      tono: 'var(--tono-naranjo)',
      // Funciones, no clientes: como si fuera un cargo más. Incluye Bistream
      // (Softland, tableros) sin nombrar a sus clientes.
      puntos: [
        'Levantamiento de requerimientos con cada empresa, propuesta de solución y maquetas para validarla antes de desarrollar.',
        'Integración con Softland ERP y desarrollo de APIs para que otros sistemas consuman y registren sus datos.',
        'Tableros de indicadores y nivel de servicio con datos sincronizados desde el ERP.',
        'Plataformas para varias empresas, con APIs en .NET, paneles en Next.js y permisos por usuario.',
        'Sitios web y tiendas en línea con Astro y Jumpseller, con agendamiento y pagos con Getnet y Transbank.',
        'Automatización de procesos: carga de reportes y cuadratura de ventas, pagos, boletas y caja.',
        'Infraestructura en Vercel, Railway, Cloudflare y Neon (PostgreSQL), y soporte después de la entrega.',
        'Inteligencia artificial: desarrollo con Claude Code y flujos con IA para los negocios.',
      ],
    },
  ] satisfies readonly Trabajo[],
  formacion: {
    etiqueta: 'Formación',
    titulo: 'Analista Programador Computacional',
    institucion: 'Instituto Profesional DUOC UC, Santiago',
    periodo: '2014 – 2017',
  },
} as const;

// ---- Proyectos ---------------------------------------------------------------

export interface Captura {
  readonly src: ImageMetadata;
  readonly titulo: string;
  /** true = se muestra entera, en su proporción, sin recortar. Para capturas
   *  de software más anchas que el marco (16:10), donde recortar los lados
   *  se come la barra lateral. Sin el campo, se recorta a 16:10 desde
   *  arriba, como las de sitios web. */
  readonly completa?: boolean;
}

export interface Proyecto {
  readonly id: string;
  readonly nombre: string;
  /** Tipo de proyecto y lugar, en una línea. */
  readonly tipo: string;
  readonly rol: string;
  readonly logo: ImageMetadata | null;
  /** Color de marca del proyecto (del portafolio anterior): tiñe la luz y
   *  los detalles del caso. Solo en fondos y bordes, nunca en texto. */
  readonly color: string;
  readonly descripcion: string;
  readonly hice: readonly string[];
  readonly herramientas: readonly string[];
  readonly enlace: { readonly url: string; readonly etiqueta: string; readonly label: string };
  readonly capturas: readonly Captura[];
}

export const proyectos = {
  rotulo: 'Proyectos',
  titulo: { antes: 'Lo que he ', enfasis: 'construido', despues: '' } satisfies TituloConEnfasis,
  bajada: 'Sitios y sistemas en uso hoy. Toca una captura para verla en grande, con el resto.',
  etiquetaHice: 'Lo que hice',
  etiquetaHerramientas: 'Herramientas',
  etiquetaCaptura: 'Ver captura',
  /** "Ver las capturas de Bistream (2)": el nombre del botón de la imagen. */
  etiquetaCapturas: 'Ver las capturas de',
  /** "2 capturas", sobre la imagen. */
  unidadCapturas: 'capturas',
  etiquetaEnLinea: 'En línea',
  etiquetaCerrar: 'Cerrar',
  etiquetaAnterior: 'Captura anterior',
  etiquetaSiguiente: 'Captura siguiente',
  items: [
    {
      id: 'trasciende-legal',
      nombre: 'Trasciende Legal',
      tipo: 'Estudio jurídico · Chile',
      rol: 'Proyecto para cliente',
      logo: logoTrasciende,
      color: '#2B8A74',
      descripcion: 'Sitio para un estudio jurídico de herencias y derecho de familia, con agendamiento de horas en línea.',
      hice: [
        'Diseño a medida a partir del manual de marca del estudio.',
        'Agendamiento de horas en línea con Cal.com.',
        'Dominio propio y publicación.',
      ],
      herramientas: ['Astro', 'Tailwind CSS', 'Cal.com', 'Vercel', 'Claude Code'],
      enlace: { url: 'https://trasciendelegal.cl', etiqueta: 'trasciendelegal.cl', label: 'Ver el sitio' },
      capturas: [
        { src: trasciendeHome, titulo: 'Inicio: presentación del estudio' },
        { src: trasciendeAgenda, titulo: 'Agendamiento de hora con Cal.com' },
      ],
    },
    {
      id: 'mateos-coffee',
      nombre: "Mateo's Coffee",
      tipo: 'Cafetería de especialidad · Brasil',
      rol: 'Proyecto para cliente',
      logo: logoMateos,
      color: '#CD6340',
      descripcion: 'Sitio bilingüe, en portugués y español, para una cafetería de especialidad, con carta digital y un administrador para mantenerla.',
      hice: [
        'Identidad web a partir del manual de marca.',
        'Carta digital bilingüe, a la que se entra desde el sitio o con un código QR.',
        'Administrador de la carta: el local edita platos, precios, fotos y orden, y publica los cambios.',
        'Vitrina y catálogo de productos.',
        'Dominio propio y SEO local para reforzar su ficha de Google.',
      ],
      herramientas: ['Astro', 'Vercel', 'Cloudflare Analytics', 'Claude Code'],
      enlace: { url: 'https://mateoscoffee.com.br', etiqueta: 'mateoscoffee.com.br', label: 'Ver el sitio' },
      capturas: [
        { src: mateosHome, titulo: 'Inicio: presentación bilingüe y acceso a la carta' },
        { src: mateosCarta, titulo: 'Carta digital: se abre desde el sitio o con el QR de la mesa', completa: true },
        { src: mateosAdministrador, titulo: 'Administrador de la carta: platos, precios y fotos, en portugués y español', completa: true },
        { src: mateosCoworking, titulo: 'Coworking: los tres ambientes del local' },
        { src: mateosVitrine, titulo: 'Vitrina: productos de la cafetería' },
      ],
    },
    {
      id: 'bistream',
      nombre: 'Bistream',
      tipo: 'Plataforma de gestión · Chile',
      // Producto propio y cocreado.
      rol: 'Cocreador · Producto propio',
      logo: logoBistream,
      color: '#1D9E75',
      descripcion:
        'Producto propio: una plataforma sobre el ERP Softland, con un sistema de gestión de órdenes de compra y notas de venta (OMS), tableros de nivel de servicio y una API con los datos del ERP. Hoy la usa una empresa todos los días.',
      hice: [
        'Diseño y desarrollo de punta a punta.',
        'Acceso a los datos del ERP como API y como sistema de gestión.',
        'Arquitectura para varios clientes, con seguridad y modos de operación con y sin conexión.',
        'Infraestructura en Vercel, Railway, Cloudflare y Neon (PostgreSQL).',
      ],
      herramientas: ['Next.js', 'React', '.NET', 'PostgreSQL', 'Astro', 'Claude Code'],
      enlace: { url: 'https://bistream.cl', etiqueta: 'bistream.cl', label: 'Ver la plataforma' },
      capturas: [
        { src: bistreamInicio, titulo: 'Inicio: el OMS, el estado de la API y su documentación (datos de ejemplo)', completa: true },
        { src: bistreamTablero, titulo: 'Tablero de nivel de servicio: recorrido del pedido y facturado por canal (datos de ejemplo)', completa: true },
      ],
    },
  ] satisfies readonly Proyecto[],
} as const;

// ---- Herramientas -------------------------------------------------------------
// Agrupadas por área, sin niveles: los niveles autoasignados restan más de lo
// que suman.

export const herramientas = {
  rotulo: 'Herramientas',
  titulo: { antes: 'Con qué ', enfasis: 'trabajo', despues: '' } satisfies TituloConEnfasis,
  grupos: [
    {
      nombre: 'Sistemas y datos',
      items: ['.NET (C#, VB, ASP)', 'SQL Server', 'MySQL', 'PostgreSQL', 'APIs REST', 'Integración con Softland', 'Microsoft Graph'],
    },
    {
      nombre: 'Web',
      items: ['JavaScript', 'HTML y CSS', 'Astro', 'Next.js', 'React', 'Tailwind CSS', 'Payload CMS', 'Jumpseller'],
    },
    {
      nombre: 'Infraestructura',
      items: ['Vercel', 'Cloudflare', 'Railway', 'Neon'],
    },
    // Lo que de verdad se usa (noviembre de 2026): servidores MCP de bases de
    // datos, navegador, correo y documentos, y skills propias (contenido para
    // redes). MCP va en genérico: no son solo de bases de datos.
    {
      nombre: 'Desarrollo con IA',
      items: ['Claude Code', 'Servidores MCP', 'Skills a medida'],
    },
  ],
  idiomas: {
    nombre: 'Idiomas',
    items: [
      { idioma: 'Español', nivel: 'Nativo' },
      { idioma: 'Inglés', nivel: 'Intermedio' },
      { idioma: 'Portugués', nivel: 'Básico' },
    ],
  },
} as const;

// ---- Sobre mí ------------------------------------------------------------------
// Texto personal del portafolio anterior, actualizado. La frase del título es
// de Héctor.

export const sobreMi = {
  rotulo: 'Sobre mí',
  titulo: { antes: 'Me gusta acercar la tecnología ', enfasis: 'a\u00a0las personas', despues: '' } satisfies TituloConEnfasis,
  parrafos: [
    'Lo que más me mueve son las personas y sus ideas. Cuando alguien me cuenta un problema o algo que no sabe cómo concretar, me meto, investigo y lo ayudo a resolverlo con tecnología.',
    'Aprendí a programar en 2012 y estudié Analista Programador Computacional en DUOC UC. Desde el primer día me enganchó lo mismo: tomar una idea y convertirla en algo que funciona.',
    'Soy desarrollador con oficio, y hoy me apoyo en las mejores herramientas —la IA incluida, con Claude Code— para lograrlo en casi cualquier tecnología, aprendiendo lo que haga falta en el camino.',
  ],
} as const;

// ---- Contacto ------------------------------------------------------------------

export const contactoPortafolio = {
  titulo: { antes: '¿', enfasis: 'Conversamos', despues: '?' } satisfies TituloConEnfasis,
  bajada: 'Escríbeme por donde te acomode.',
  correo: 'Correo',
  linkedin: 'LinkedIn',
} as const;
