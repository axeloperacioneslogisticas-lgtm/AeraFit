import { describe, expect, it } from "vitest";
import { formatearPesos, pesosACentavos } from "./dinero";

describe("formatearPesos", () => {
  it("muestra pesos con $, separador de miles y dos decimales", () => {
    expect(formatearPesos(123450)).toBe("$1,234.50");
    expect(formatearPesos(50000)).toBe("$500.00");
    expect(formatearPesos(5)).toBe("$0.05");
    expect(formatearPesos(0)).toBe("$0.00");
    expect(formatearPesos(123456789)).toBe("$1,234,567.89");
  });

  it("muestra negativos (egresos y diferencias de corte)", () => {
    expect(formatearPesos(-2550)).toBe("-$25.50");
  });

  it("rechaza montos que no vienen en centavos enteros", () => {
    expect(() => formatearPesos(12.5)).toThrow();
  });
});

describe("pesosACentavos", () => {
  it("lee lo que escribe recepción", () => {
    expect(pesosACentavos("1,234.50")).toBe(123450);
    expect(pesosACentavos("1234.5")).toBe(123450);
    expect(pesosACentavos("$80")).toBe(8000);
    expect(pesosACentavos(" 450 ")).toBe(45000);
    expect(pesosACentavos("0.05")).toBe(5);
  });

  it("no pierde centavos por redondeo de flotantes", () => {
    expect(pesosACentavos("0.29")).toBe(29);
    expect(pesosACentavos("1.15")).toBe(115);
  });

  it("rechaza textos que no son un monto", () => {
    for (const malo of ["", "abc", "12.345", "1,23", "1.2.3", "$", "12,34.00"]) {
      expect(pesosACentavos(malo), malo).toBeNull();
    }
  });

  it("solo acepta negativos si se pide", () => {
    expect(pesosACentavos("-100")).toBeNull();
    expect(pesosACentavos("-100", { permitirNegativo: true })).toBe(-10000);
    expect(pesosACentavos("-$1,000.00", { permitirNegativo: true })).toBe(-100000);
  });
});
