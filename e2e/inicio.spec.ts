import { expect, test } from "@playwright/test";

test("la página de inicio está en español y presenta Pase", async ({ page }) => {
  await page.goto("/");

  await expect(page).toHaveTitle(/Pase/);
  await expect(page.locator("html")).toHaveAttribute("lang", "es-MX");
  await expect(
    page.getByRole("heading", { level: 1, name: /sistema para tu gimnasio/i }),
  ).toBeVisible();
  await expect(page.getByRole("heading", { name: "Punto de venta" })).toBeVisible();
});

test("no hay desplazamiento horizontal (celular y recepción)", async ({ page }) => {
  await page.goto("/");
  const desborde = await page.evaluate(
    () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
  );
  expect(desborde).toBeLessThanOrEqual(0);
});
