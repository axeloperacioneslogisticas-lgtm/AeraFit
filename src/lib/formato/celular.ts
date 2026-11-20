/**
 * Celulares en Pase.
 *
 * El cliente se identifica por su celular de 10 dígitos (sin lada de país).
 * Ojo: un mismo celular puede ser de varias personas (mamá e hijos), así que
 * NUNCA se trata como único. Ver CLAUDE.md.
 */

/**
 * Deja el celular en 10 dígitos. Acepta espacios, guiones, paréntesis y los
 * prefijos de país "+52" o "52", y el viejo "1" de celular ("+52 1 55...").
 * Devuelve null si no quedan exactamente 10 dígitos.
 */
export function normalizarCelular(texto: string): string | null {
  let digitos = texto.replace(/\D/g, "");
  if (digitos.length === 13 && digitos.startsWith("521")) digitos = digitos.slice(3);
  else if (digitos.length === 12 && digitos.startsWith("52")) digitos = digitos.slice(2);
  return /^\d{10}$/.test(digitos) ? digitos : null;
}

/** "5512345678" → "55 1234 5678", para leerlo fácil en recepción. */
export function formatearCelular(celular: string): string {
  const limpio = normalizarCelular(celular);
  if (!limpio) return celular;
  return `${limpio.slice(0, 2)} ${limpio.slice(2, 6)} ${limpio.slice(6)}`;
}

/**
 * Enlace de WhatsApp (wa.me) con el mensaje ya escrito. El gimnasio lo edita
 * antes de enviarlo; Pase no manda mensajes por su cuenta.
 */
export function enlaceWhatsApp(celular: string, mensaje: string): string {
  const limpio = normalizarCelular(celular);
  if (!limpio) throw new Error(`Celular inválido: "${celular}"`);
  return `https://wa.me/52${limpio}?text=${encodeURIComponent(mensaje)}`;
}
