# Formulario de contacto: puesta en marcha

El formulario de la sección de contacto manda cada mensaje por correo a
`hola@hpalomino.dev` (que Cloudflare Email Routing reenvía a Gmail). Usa dos
servicios: **Resend** para enviar el correo y **Cloudflare Turnstile** para
frenar bots. Necesita tres valores:

| Variable | De dónde sale | ¿Secreta? |
|---|---|---|
| `PUBLIC_TURNSTILE_SITE_KEY` | Turnstile → Site Key | No (queda en el HTML) |
| `TURNSTILE_SECRET_KEY` | Turnstile → Secret Key | Sí |
| `RESEND_API_KEY` | Resend → API Keys | Sí |

Los valores secretos los pegas tú en `.env` o en Vercel. Nunca van en el
código ni en el repositorio.

## 1. Resend (envío del correo)

1. Crea una cuenta en [resend.com](https://resend.com).
2. **Domains → Add Domain** → `hpalomino.dev`. La región da lo mismo para el
   código.
3. Resend muestra unos registros DNS (un MX y un TXT de SPF en el subdominio
   `send`, y un TXT de DKIM en `resend._domainkey`). Agrégalos tal cual en
   **Cloudflare → hpalomino.dev → DNS → Records**, que es donde vive el DNS
   del dominio.
   - Email Routing ya ocupa el MX y el SPF de la raíz (`hpalomino.dev`).
     Los de Resend van en su propio subdominio, así que no chocan.
     **No toques ni borres los registros de Email Routing.**
   - Si algún registro aparece con la nube naranja, déjalo en gris
     ("DNS only").
4. Vuelve a Resend y espera a que el dominio diga **Verified** (suele ser
   rápido, a veces tarda).
5. **API Keys → Create API Key**, con permiso **Sending access** (no "Full
   access"), limitado a `hpalomino.dev`. Copia la clave: Resend la muestra
   una sola vez. Ese es `RESEND_API_KEY`.

El correo sale desde `formulario@hpalomino.dev`. Esa dirección no necesita
buzón: solo envía.

## 2. Turnstile (contra bots)

1. Panel de Cloudflare → **Turnstile → Add widget**.
2. Nombre: el que quieras (por ejemplo, "Formulario hpalomino.dev").
3. Hostnames: `hpalomino.dev` (y `localhost`, si quieres probar con las
   claves reales en tu computador).
4. Widget mode: **Managed**.
5. Copia la **Site Key** (`PUBLIC_TURNSTILE_SITE_KEY`) y la **Secret Key**
   (`TURNSTILE_SECRET_KEY`).

## 3. Dónde van los valores

**En tu computador:** copia `.env.example` como `.env` y pega los valores.
`.env` está en `.gitignore`. Reinicia `astro dev` después de cambiarlo.

**En producción (Vercel):** proyecto → **Settings → Environment Variables**.
Agrega las tres, con los nombres exactos de la tabla de arriba, en el
ambiente **Production** (y **Preview**, si quieres que el formulario funcione
también en las vistas previas). Marca las dos secretas como *Sensitive*.

Después de agregarlas o cambiarlas, **vuelve a desplegar** (Deployments →
el último → Redeploy). Las variables solo llegan a despliegues nuevos, y la
Site Key se escribe en la página al compilar.

Si faltan en producción, el sitio igual compila, pero el formulario no
envía: responde error y queda el aviso en los logs de Vercel. Nunca finge
que salió.

En Preview, además de las variables, el dominio de la vista previa
(`…vercel.app`) tiene que estar en los Hostnames del widget de Turnstile.

### Publicar este proyecto en hpalomino.dev

Hoy `hpalomino.dev` lo sirve otro proyecto de Vercel, el del portafolio
anterior. Para publicar este:

1. En Vercel, **Add New → Project** e importa este repositorio (Vercel
   reconoce Astro solo).
2. Carga las variables de la sección anterior en el proyecto nuevo.
3. En el proyecto anterior, **Settings → Domains**, quita `hpalomino.dev`.
   En el nuevo, agrégalo. Los registros DNS de Cloudflare que ya apuntan a
   Vercel normalmente no cambian.

## 4. Cómo probarlo

**En tu computador, sin claves:** con `.env` vacío o sin `.env`, el
formulario usa las claves de prueba públicas de Turnstile (siempre aprueban)
y, en vez de enviar, muestra en la terminal de `astro dev` el correo que se
habría mandado. Sirve para probar el formulario de punta a punta. Para que
envíe de verdad desde tu computador, basta con poner `RESEND_API_KEY` en
`.env`.

**En producción:**

1. Manda un mensaje real desde el sitio, con tu propio correo en "¿Cómo te
   contacto?".
2. Confirma que llega a `hola@` → Gmail, con el asunto "Nuevo mensaje de
   …". La primera vez revisa Spam; si cae ahí, márcalo como "No es spam".
3. Pulsa **Responder**: la respuesta tiene que ir al correo que escribiste,
   no a `formulario@`.
4. Si la persona deja un WhatsApp en vez de un correo, el mensaje llega
   igual, pero "Responder" no le llega a ella: escríbele por WhatsApp.

Si algo falla, los logs del proyecto en Vercel muestran el motivo (líneas
que empiezan con `[contacto]`).

## 5. Spam y datos

El formulario tiene dos defensas. Un campo trampa, invisible para las
personas, que los bots suelen llenar: si llega con algo, el servidor
responde como si todo saliera bien y no envía nada. Y Turnstile, que
comprueba que quien escribe es una persona, casi siempre sin pedirle nada;
el servidor valida esa comprobación con Cloudflare antes de enviar. Nada de
lo que se escribe se guarda en el sitio ni en una base de datos: el mensaje
se valida, se envía como correo y se olvida. Resend sí guarda un registro de
los correos enviados por un tiempo limitado, según el plan, visible en su
panel (Emails).
