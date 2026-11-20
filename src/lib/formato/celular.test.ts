import { describe, expect, it } from "vitest";
import { enlaceWhatsApp, formatearCelular, normalizarCelular } from "./celular";

describe("normalizarCelular", () => {
  it("deja el celular en 10 dígitos", () => {
    expect(normalizarCelular("5512345678")).toBe("5512345678");
    expect(normalizarCelular("55 1234 5678")).toBe("5512345678");
    expect(normalizarCelular("(55) 1234-5678")).toBe("5512345678");
    expect(normalizarCelular("+52 55 1234 5678")).toBe("5512345678");
    expect(normalizarCelular("+52 1 55 1234 5678")).toBe("5512345678");
    expect(normalizarCelular("525512345678")).toBe("5512345678");
  });

  it("rechaza lo que no tiene 10 dígitos", () => {
    for (const malo of ["", "551234567", "55123456789", "abc", "+1 555 123 4567"]) {
      expect(normalizarCelular(malo), malo).toBeNull();
    }
  });
});

describe("formatearCelular", () => {
  it("lo agrupa para leerlo fácil", () => {
    expect(formatearCelular("5512345678")).toBe("55 1234 5678");
  });

  it("deja tal cual lo que no es un celular válido", () => {
    expect(formatearCelular("123")).toBe("123");
  });
});

describe("enlaceWhatsApp", () => {
  it("arma el enlace wa.me con lada de México y el mensaje codificado", () => {
    expect(enlaceWhatsApp("55 1234 5678", "Hola Ana, tu mensualidad vence el 23/11/2026 ✔")).toBe(
      "https://wa.me/525512345678?text=Hola%20Ana%2C%20tu%20mensualidad%20vence%20el%2023%2F11%2F2026%20%E2%9C%94",
    );
  });

  it("no arma enlaces con celulares inválidos", () => {
    expect(() => enlaceWhatsApp("123", "hola")).toThrow();
  });
});
