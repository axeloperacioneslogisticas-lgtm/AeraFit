import { describe, expect, it } from "vitest";
import {
  diasEntre,
  edadEn,
  esFechaIsoValida,
  formatearFecha,
  formatearFechaHora,
  hoyEnZona,
  leerFecha,
  sumarDias,
} from "./fecha";

describe("fechas de calendario", () => {
  it("muestra dd/mm/aaaa", () => {
    expect(formatearFecha("2026-11-20")).toBe("20/11/2026");
    expect(formatearFecha("2027-01-05")).toBe("05/01/2027");
  });

  it("lee dd/mm/aaaa y rechaza fechas que no existen", () => {
    expect(leerFecha("20/11/2026")).toBe("2026-11-20");
    expect(leerFecha("5/1/2027")).toBe("2027-01-05");
    expect(leerFecha("29/02/2028")).toBe("2028-02-29");
    expect(leerFecha("29/02/2027")).toBeNull();
    expect(leerFecha("31/04/2026")).toBeNull();
    expect(leerFecha("2026-11-20")).toBeNull();
  });

  it("valida aaaa-mm-dd", () => {
    expect(esFechaIsoValida("2026-02-28")).toBe(true);
    expect(esFechaIsoValida("2026-02-30")).toBe(false);
    expect(esFechaIsoValida("20/11/2026")).toBe(false);
    expect(() => formatearFecha("2026-13-01")).toThrow();
  });

  it("suma días cruzando meses y años", () => {
    expect(sumarDias("2026-11-20", 30)).toBe("2026-12-20");
    expect(sumarDias("2026-12-31", 1)).toBe("2027-01-01");
    expect(sumarDias("2028-02-28", 1)).toBe("2028-02-29");
    expect(sumarDias("2026-03-01", -1)).toBe("2026-02-28");
  });

  it("cuenta los días entre dos fechas", () => {
    expect(diasEntre("2026-11-20", "2026-11-23")).toBe(3);
    expect(diasEntre("2026-11-23", "2026-11-20")).toBe(-3);
    expect(diasEntre("2026-11-20", "2026-11-20")).toBe(0);
  });

  it("calcula la edad cumplida (para detectar menores)", () => {
    expect(edadEn("2008-11-20", "2026-11-20")).toBe(18);
    expect(edadEn("2008-11-21", "2026-11-20")).toBe(17);
    expect(edadEn("2010-01-01", "2026-11-20")).toBe(16);
  });
});

describe("instantes en la zona de la sucursal", () => {
  // 20/11/2026 06:30 UTC: en CDMX ya es día 20, en Tijuana todavía es día 19.
  const nocheDeJueves = new Date("2026-11-20T06:30:00Z");

  it("muestra la hora local de cada sucursal", () => {
    expect(formatearFechaHora(nocheDeJueves, "America/Mexico_City")).toBe("20/11/2026 00:30");
    expect(formatearFechaHora(nocheDeJueves, "America/Tijuana")).toBe("19/11/2026 22:30");
    expect(formatearFechaHora("2026-11-20T20:05:00Z", "America/Cancun")).toBe("20/11/2026 15:05");
  });

  it("sabe qué día es hoy en cada sucursal", () => {
    expect(hoyEnZona("America/Mexico_City", nocheDeJueves)).toBe("2026-11-20");
    expect(hoyEnZona("America/Tijuana", nocheDeJueves)).toBe("2026-11-19");
  });

  it("CDMX ya no cambia de horario en verano; Tijuana sí", () => {
    const verano = new Date("2026-07-01T12:00:00Z");
    expect(formatearFechaHora(verano, "America/Mexico_City")).toBe("01/07/2026 06:00");
    expect(formatearFechaHora(verano, "America/Tijuana")).toBe("01/07/2026 05:00");
  });

  it("rechaza instantes inválidos", () => {
    expect(() => formatearFechaHora("no es fecha")).toThrow();
  });
});
