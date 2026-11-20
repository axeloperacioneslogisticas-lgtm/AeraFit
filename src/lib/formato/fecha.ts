/**
 * Fechas en Pase.
 *
 * Hay dos tipos de fecha y no se mezclan:
 * - Fecha de calendario ("2026-11-20"): inicio y vencimiento de membresías,
 *   nacimientos. Se guarda en Postgres como `date` y aquí como texto ISO.
 *   No tiene hora ni zona, así que nunca se "corre" un día por la zona horaria.
 * - Instante (`timestamptz`): llegadas, ventas, cortes de caja. Se muestra en la
 *   zona horaria de la sucursal (nombre IANA, por ejemplo "America/Tijuana").
 *
 * En pantalla siempre se muestra dd/mm/aaaa.
 */

/** Zona por omisión si una sucursal no tiene otra configurada. */
export const ZONA_POR_OMISION = "America/Mexico_City";

const PATRON_ISO = /^(\d{4})-(\d{2})-(\d{2})$/;

/** Revisa que "aaaa-mm-dd" sea una fecha que existe (no 31/02). */
export function esFechaIsoValida(fechaIso: string): boolean {
  const partes = PATRON_ISO.exec(fechaIso);
  if (!partes) return false;
  const [anio, mes, dia] = partes.slice(1).map(Number);
  const fecha = new Date(Date.UTC(anio, mes - 1, dia));
  return (
    fecha.getUTCFullYear() === anio &&
    fecha.getUTCMonth() === mes - 1 &&
    fecha.getUTCDate() === dia
  );
}

function exigirFechaIso(fechaIso: string): [number, number, number] {
  if (!esFechaIsoValida(fechaIso)) {
    throw new Error(`Fecha inválida: "${fechaIso}" (se espera aaaa-mm-dd)`);
  }
  return fechaIso.split("-").map(Number) as [number, number, number];
}

const dosDigitos = (n: number) => String(n).padStart(2, "0");

/** "2026-11-20" → "20/11/2026". */
export function formatearFecha(fechaIso: string): string {
  const [anio, mes, dia] = exigirFechaIso(fechaIso);
  return `${dosDigitos(dia)}/${dosDigitos(mes)}/${anio}`;
}

/** "20/11/2026" (o "20-11-2026") → "2026-11-20". Devuelve null si no es válida. */
export function leerFecha(texto: string): string | null {
  const partes = /^(\d{1,2})[/-](\d{1,2})[/-](\d{4})$/.exec(texto.trim());
  if (!partes) return null;
  const [dia, mes, anio] = partes.slice(1).map(Number);
  const iso = `${anio}-${dosDigitos(mes)}-${dosDigitos(dia)}`;
  return esFechaIsoValida(iso) ? iso : null;
}

/** Suma (o resta, con número negativo) días a una fecha de calendario. */
export function sumarDias(fechaIso: string, dias: number): string {
  const [anio, mes, dia] = exigirFechaIso(fechaIso);
  const fecha = new Date(Date.UTC(anio, mes - 1, dia + dias));
  return fecha.toISOString().slice(0, 10);
}

/** Días que van de `desde` a `hasta` (positivo si `hasta` es posterior). */
export function diasEntre(desde: string, hasta: string): number {
  const [a1, m1, d1] = exigirFechaIso(desde);
  const [a2, m2, d2] = exigirFechaIso(hasta);
  const ms = Date.UTC(a2, m2 - 1, d2) - Date.UTC(a1, m1 - 1, d1);
  return Math.round(ms / 86_400_000);
}

/** Partes de un instante vistas en una zona horaria. */
function partesEnZona(instante: Date, zona: string) {
  const partes = new Intl.DateTimeFormat("en-CA", {
    timeZone: zona,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(instante);
  const valor = (tipo: string) => partes.find((p) => p.type === tipo)?.value ?? "";
  return {
    anio: valor("year"),
    mes: valor("month"),
    dia: valor("day"),
    hora: valor("hour"),
    minuto: valor("minute"),
  };
}

/** La fecha de "hoy" en la sucursal, como "aaaa-mm-dd". */
export function hoyEnZona(zona: string = ZONA_POR_OMISION, ahora: Date = new Date()): string {
  const { anio, mes, dia } = partesEnZona(ahora, zona);
  return `${anio}-${mes}-${dia}`;
}

/** Un instante mostrado en la zona de la sucursal: "20/11/2026 14:05". */
export function formatearFechaHora(
  instante: Date | string,
  zona: string = ZONA_POR_OMISION,
): string {
  const fecha = typeof instante === "string" ? new Date(instante) : instante;
  if (Number.isNaN(fecha.getTime())) {
    throw new Error(`Instante inválido: "${String(instante)}"`);
  }
  const { anio, mes, dia, hora, minuto } = partesEnZona(fecha, zona);
  return `${dia}/${mes}/${anio} ${hora}:${minuto}`;
}

/** Edad cumplida en una fecha dada (para saber si es menor de edad). */
export function edadEn(nacimientoIso: string, enFechaIso: string): number {
  const [an, mn, dn] = exigirFechaIso(nacimientoIso);
  const [a, m, d] = exigirFechaIso(enFechaIso);
  let edad = a - an;
  if (m < mn || (m === mn && d < dn)) edad -= 1;
  return edad;
}
