import { defineConfig, devices } from "@playwright/test";

// Pruebas de flujos completos en navegador real.
// Se prueban dos tamaños porque Pase se usa en la computadora de recepción
// y en el celular del cliente.
const PUERTO = Number(process.env.PUERTO_PRUEBAS ?? 3100);
const enCI = Boolean(process.env.CI);

export default defineConfig({
  testDir: "./e2e",
  fullyParallel: true,
  forbidOnly: enCI,
  retries: enCI ? 1 : 0,
  reporter: enCI ? [["github"], ["html", { open: "never" }]] : "list",
  use: {
    baseURL: `http://localhost:${PUERTO}`,
    locale: "es-MX",
    timezoneId: "America/Mexico_City",
    trace: "on-first-retry",
  },
  projects: [
    { name: "recepcion", use: { ...devices["Desktop Chrome"] } },
    { name: "celular", use: { ...devices["Pixel 7"] } },
  ],
  // Se prueba la versión de producción (build + start), igual que lo que se publica.
  webServer: {
    command: `npm run build && npm run start -- --port ${PUERTO}`,
    url: `http://localhost:${PUERTO}`,
    reuseExistingServer: !enCI,
    timeout: 240_000,
  },
});
