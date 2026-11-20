/**
 * Dinero en Pase.
 *
 * Regla del proyecto: todo monto se guarda y se calcula en CENTAVOS (enteros).
 * Nunca se usan flotantes para sumar dinero, porque 0.1 + 0.2 no da 0.3.
 * Solo al mostrarlo en pantalla o en el ticket se convierte a pesos.
 */

const formatoPesos = new Intl.NumberFormat("es-MX", {
  style: "currency",
  currency: "MXN",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

/** Muestra un monto en centavos como pesos: 123450 → "$1,234.50". */
export function formatearPesos(centavos: number): string {
  if (!Number.isInteger(centavos)) {
    throw new Error(`El monto debe venir en centavos enteros y llegó ${centavos}`);
  }
  return formatoPesos.format(centavos / 100);
}

/**
 * Convierte lo que escribe recepción ("1,234.50", "$80", "80.5") a centavos.
 * Devuelve null si el texto no es un monto válido (por ejemplo "12.345" o "abc").
 * Acepta negativos solo si se pide (para ajustes y egresos se usa el signo aparte).
 */
export function pesosACentavos(
  texto: string,
  opciones: { permitirNegativo?: boolean } = {},
): number | null {
  const limpio = texto.trim().replace(/\s/g, "").replace(/^\$/, "");
  const negativo = limpio.startsWith("-");
  const sinSigno = negativo ? limpio.slice(1).replace(/^\$/, "") : limpio;

  // Miles con coma opcionales (1,234 o 1234) y hasta dos decimales.
  const patron = /^(\d{1,3}(,\d{3})+|\d+)(\.(\d{1,2}))?$/;
  const partes = patron.exec(sinSigno);
  if (!partes) return null;
  if (negativo && !opciones.permitirNegativo) return null;

  const enteros = Number(partes[1].replace(/,/g, ""));
  const decimales = Number((partes[4] ?? "0").padEnd(2, "0"));
  const centavos = enteros * 100 + decimales;
  if (!Number.isSafeInteger(centavos)) return null;

  return negativo ? -centavos : centavos;
}
