import { describe, expect, it } from 'vitest';
import { armarCorreo, ipCliente, leerCampos, responder, validar, type Mensaje } from './contacto';
import { limitesFormulario } from '../data/site';

const valido = {
  nombre: 'Ana Pérez',
  contacto: 'ana@ejemplo.cl',
  necesidad: 'sitio',
  mensaje: 'Necesito un sitio para mi negocio.',
};

const peticion = (cuerpo: BodyInit, tipo: string) =>
  new Request('https://hpalomino.dev/api/contacto', { method: 'POST', body: cuerpo, headers: { 'content-type': tipo } });

describe('leerCampos', () => {
  it('lee JSON y descarta lo que no es texto', async () => {
    const campos = await leerCampos(peticion(JSON.stringify({ ...valido, extra: 3 }), 'application/json'));
    expect(campos).toEqual(valido);
  });

  it('lee un formulario normal (sin JavaScript)', async () => {
    const campos = await leerCampos(peticion(new URLSearchParams(valido), 'application/x-www-form-urlencoded'));
    expect(campos).toEqual(valido);
  });

  it('rechaza JSON roto y tipos de contenido desconocidos', async () => {
    expect(await leerCampos(peticion('{roto', 'application/json'))).toBeNull();
    expect(await leerCampos(peticion('hola', 'text/plain'))).toBeNull();
  });
});

describe('validar', () => {
  it('acepta un mensaje válido, recorta espacios y traduce la opción a su label', () => {
    expect(validar({ ...valido, nombre: '  Ana Pérez  ' })).toEqual({
      nombre: 'Ana Pérez',
      contacto: 'ana@ejemplo.cl',
      necesidad: 'Un sitio web',
      mensaje: 'Necesito un sitio para mi negocio.',
    });
  });

  it('la necesidad es opcional', () => {
    expect(validar({ ...valido, necesidad: '' })?.necesidad).toBeNull();
  });

  it('rechaza una opción que no está en el formulario', () => {
    expect(validar({ ...valido, necesidad: 'hackeo' })).toBeNull();
  });

  it('respeta los límites de largo compartidos con el navegador', () => {
    const corto = 'x'.repeat(limitesFormulario.mensaje.min - 1);
    const largo = 'x'.repeat(limitesFormulario.mensaje.max + 1);
    expect(validar({ ...valido, mensaje: corto })).toBeNull();
    expect(validar({ ...valido, mensaje: largo })).toBeNull();
    expect(validar({ ...valido, nombre: '   ' })).toBeNull();
  });
});

describe('ipCliente', () => {
  const con = (headers: Record<string, string>) => new Request('https://hpalomino.dev', { headers });

  it('prefiere x-real-ip y si no, la primera de x-forwarded-for', () => {
    expect(ipCliente(con({ 'x-real-ip': '1.1.1.1', 'x-forwarded-for': '2.2.2.2' }))).toBe('1.1.1.1');
    expect(ipCliente(con({ 'x-forwarded-for': '3.3.3.3, 10.0.0.1' }))).toBe('3.3.3.3');
    expect(ipCliente(con({}))).toBeUndefined();
  });
});

describe('armarCorreo', () => {
  const base: Mensaje = { nombre: 'Ana', contacto: 'ana@ejemplo.cl', necesidad: 'Un sitio web', mensaje: 'Hola' };
  const fecha = new Date('2026-11-10T20:00:00Z');

  it('responde directo a la persona solo si dejó un correo', () => {
    expect(armarCorreo(base, fecha).reply_to).toBe('ana@ejemplo.cl');
    expect(armarCorreo({ ...base, contacto: '+56 9 1234 5678' }, fecha)).not.toHaveProperty('reply_to');
  });

  it('no deja saltos de línea en el asunto', () => {
    expect(armarCorreo({ ...base, nombre: 'Ana\r\nBcc: otro@x.cl' }, fecha).subject).not.toMatch(/[\r\n]/);
  });

  it('pone la fecha en hora de Chile y el mensaje en texto plano', () => {
    const correo = armarCorreo({ ...base, mensaje: '<b>hola</b>' }, fecha);
    expect(correo.text).toContain('(hora de Chile)');
    expect(correo.text).toContain('<b>hola</b>');
  });
});

describe('responder', () => {
  it('con JavaScript responde JSON con el código que corresponde', async () => {
    const r = responder(true, { ok: false, error: 'turnstile', estado: 400 });
    expect(r.status).toBe(400);
    expect(await r.json()).toEqual({ ok: false, error: 'turnstile' });
  });

  it('sin JavaScript redirige de vuelta a la sección de contacto', () => {
    const r = responder(false, { ok: true });
    expect(r.status).toBe(303);
    expect(r.headers.get('location')).toBe('/?contacto=enviado#contacto');
  });
});
