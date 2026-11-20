import { fileURLToPath } from "node:url";
import { defineConfig } from "vitest/config";

// Pruebas de lógica (sin navegador). Las de flujos completos van en e2e/ con Playwright.
export default defineConfig({
  resolve: {
    alias: { "@": fileURLToPath(new URL("./src", import.meta.url)) },
  },
  test: {
    include: ["src/**/*.test.ts", "src/**/*.test.tsx"],
    environment: "node",
    // Fijamos la zona para que las pruebas den lo mismo en tu equipo y en CI.
    env: { TZ: "UTC" },
  },
});
