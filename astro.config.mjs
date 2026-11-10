// @ts-check
import { defineConfig, envField } from 'astro/config';
import vercel from '@astrojs/vercel';

// https://astro.build/config
export default defineConfig({
  site: 'https://hpalomino.dev',
  // El sitio sigue siendo estático: todo se prerenderiza. Solo el formulario
  // (src/pages/api/contacto.ts, con `prerender = false`) corre en el
  // servidor, como función de Vercel.
  adapter: vercel(),
  // Solo para desarrollo: deja entrar las visitas que llegan por un túnel de
  // Cloudflare (`cloudflared tunnel --url http://localhost:4321`), para
  // mostrar el sitio en curso con un enlace público. Sin esto, el servidor
  // de desarrollo rechaza cualquier dominio que no sea localhost.
  vite: {
    server: {
      allowedHosts: ['.trycloudflare.com'],
    },
  },
  env: {
    schema: {
      // Secretos del formulario: se leen al recibir cada mensaje, no al
      // compilar, y nunca llegan al navegador. Opcionales para que el sitio
      // compile sin ellos; el endpoint decide qué hacer si faltan.
      // Dónde se sacan y dónde se ponen: docs/formulario.md.
      TURNSTILE_SECRET_KEY: envField.string({ context: 'server', access: 'secret', optional: true }),
      RESEND_API_KEY: envField.string({ context: 'server', access: 'secret', optional: true }),
    },
  },
});
