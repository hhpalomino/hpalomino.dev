// Datos del sitio. Editar acá cambia el sitio entero; los componentes no
// llevan datos literales.

export const site = {
  nombre: 'Héctor Palomino',
  nombreCompleto: 'Héctor Palomino Astudillo',
  dominio: 'hpalomino.dev',
  idioma: 'es',
  tituloSEO: 'Héctor Palomino — Desarrollador de software',
  descripcionSEO: 'Sitios web y sistemas a medida para tu negocio, en Chile y Brasil. Me escribes directo y soy yo quien los hace. Diez años construyendo software para empresas.',
} as const;

// Correo del dominio (3 de octubre de 2026). Cloudflare Email Routing lo
// reenvía a Gmail: solo recibe; las respuestas salen desde Gmail.
export const contacto = {
  email: 'hola@hpalomino.dev',
  whatsappCL: {
    pais: 'Chile',
    numero: '+56 9 9159 4818',
    url: 'https://wa.me/56991594818',
  },
} as const;

// Límites del formulario de contacto, en caracteres (después de quitar los
// espacios de los extremos). Los usan el HTML (maxlength), la validación del
// navegador y el servidor (src/pages/api/contacto.ts): cambiarlos acá los
// cambia en los tres. El mínimo del mensaje aparece también en el texto de
// error de contenido.ts (contacto.formulario.errores.mensaje).
export const limitesFormulario = {
  nombre: { min: 1, max: 100 },
  contacto: { min: 3, max: 200 },
  mensaje: { min: 10, max: 3000 },
} as const;

// Rutas siempre planas. Nunca anidadas bajo /servicios.
// /sitios-web sale del menú hasta que exista (10 de noviembre de 2026):
// daba 404 desde todas las páginas. Vuelve acá cuando se construya.
// "Software" no va en la navegación: no tiene ruta propia y lo cubre la
// sección "Qué hago" de la página de inicio.
export const nav = [
  { label: 'Portafolio', href: '/portafolio' },
] as const;

// Trabajo publicado: sitios en vivo, con enlace (PRODUCT.md, decisión del
// 1 de octubre de 2026). La línea de cada uno vive en contenido.ts.
export const trabajos = [
  { nombre: 'Trasciende Legal', tipo: 'Estudio jurídico', lugar: 'Chile', url: 'https://trasciendelegal.cl', etiqueta: 'trasciendelegal.cl' },
  { nombre: "Mateo's Coffee", tipo: 'Cafetería de especialidad', lugar: 'Brasil', url: 'https://mateoscoffee.com.br', etiqueta: 'mateoscoffee.com.br' },
  { nombre: 'Bistream', tipo: 'Plataforma de gestión', lugar: 'Chile', url: 'https://bistream.cl', etiqueta: 'bistream.cl' },
] as const;

export const redes = {
  linkedin: { label: 'LinkedIn', url: 'https://linkedin.com/in/palominohector' },
} as const;
