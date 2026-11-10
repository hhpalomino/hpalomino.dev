# hpalomino.dev

Sitio de Héctor Palomino, desarrollador de software: una portada que explica
los servicios a dueños de negocio y un portafolio tipo CV para empresas que
evalúan contratarlo.

- **Portada:** [hpalomino.dev](https://hpalomino.dev)
- **Portafolio:** [hpalomino.dev/portafolio](https://hpalomino.dev/portafolio)

## Stack

| Pieza | Elección | Por qué |
|---|---|---|
| Framework | [Astro 7](https://astro.build) con TypeScript estricto | El sitio es casi todo contenido: se prerenderiza entero y llega sin JavaScript de framework al navegador. |
| Estilos | CSS propio con tokens (`src/styles/tokens.css`) | Pocos componentes y un diseño propio; un sistema de tokens alcanza y no agrega dependencias. |
| Formulario | Endpoint de Astro + [Resend](https://resend.com) + [Cloudflare Turnstile](https://www.cloudflare.com/products/turnstile/) | La única ruta de servidor. Valida, verifica que no sea un bot y manda un correo. No guarda nada. |
| Publicación | [Vercel](https://vercel.com) | Sitio estático más una función para el formulario. |
| DNS y correo | Cloudflare (Email Routing) | `hola@hpalomino.dev` se reenvía a Gmail. |

## Cómo está organizado

```text
src/
├── data/            Todo el texto y los datos del sitio (sin JSX ni HTML)
│   ├── site.ts        Datos globales: nombre, contacto, menú, límites del formulario
│   ├── contenido.ts   Textos de la portada
│   └── portafolio.ts  Trayectoria, proyectos y herramientas
├── components/      Una sección por componente (.astro); portafolio/ para /portafolio
├── layouts/Base.astro  <head>, metadatos para compartir y datos estructurados
├── lib/contacto.ts  Lógica del formulario sin red ni entorno (probada)
├── pages/
│   ├── index.astro      Portada
│   ├── portafolio.astro Portafolio
│   └── api/contacto.ts  Endpoint del formulario (función de Vercel)
└── styles/          tokens.css (colores, tipografía, medidas) y global.css
public/              Favicon, imágenes para compartir y el CV en PDF
docs/formulario.md   Puesta en marcha del formulario (Resend, Turnstile, Vercel)
```

Decisiones que guían el código:

- **Contenido separado de la presentación.** Cambiar un texto, un proyecto o
  una herramienta se hace en `src/data/`, sin tocar componentes.
- **Ningún color ni tamaño literal en los componentes.** Todo sale de
  `tokens.css`, así que el aspecto del sitio se ajusta en un solo archivo.
- **Funciona sin JavaScript.** El formulario cae a un POST normal con
  redirección; las secciones que aparecen al hacer scroll solo se esconden si
  hay JavaScript para mostrarlas.
- **Comentarios que explican el porqué.** Muchos registran la decisión y su
  fecha. Algunos citan documentos de producto y diseño (`PRODUCT.md`,
  `docs/propuesta-contenido.md`, `design/`) que son internos y no están en
  este repositorio.

## Desarrollo

Requiere Node 22.12 o superior (ver `.nvmrc`).

```sh
npm install
npm run dev       # http://localhost:4321
```

| Comando | Qué hace |
|---|---|
| `npm run dev` | Servidor de desarrollo |
| `npm run check` | Revisión de tipos de TypeScript y Astro (`astro check`) |
| `npm test` | Pruebas unitarias (Vitest) |
| `npm run build` | Compila el sitio para producción |
| `npm run verify` | Las tres anteriores, en orden: lo mismo que corre la CI |

### Formulario de contacto

Sin variables de entorno el formulario igual se prueba en local: usa las
claves de prueba de Turnstile y muestra el correo en la consola en vez de
enviarlo. Para enviar de verdad, copia `.env.example` como `.env` y completa
las tres variables. El paso a paso está en
[`docs/formulario.md`](docs/formulario.md).

## Calidad

- **CI** (`.github/workflows/ci.yml`): cada push a `main` y cada pull request
  pasa por revisión de tipos, pruebas y compilación.
- **Pruebas** (`src/lib/contacto.test.ts`): la lectura del cuerpo, la
  validación, el armado del correo (sin inyección de cabeceras en el asunto)
  y las dos formas de responder, con y sin JavaScript.
- **Encabezados de seguridad** en `vercel.json`.
- **Dependencias:** `npm audit` reporta avisos en dependencias del adaptador
  de Vercel (`@vercel/nft`, `@vercel/routing-utils`). Se usan solo al
  compilar y no llegan al navegador ni a la función del formulario; se
  actualizan cuando el adaptador publique la corrección.

## Uso del contenido

El código está a la vista como referencia. Los textos, las fotos, las
capturas y las marcas de los proyectos de clientes no se pueden reutilizar.
