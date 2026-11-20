# Pase

Sistema para gimnasios, box, crossfit y academias de artes marciales: sucursales,
clientes, membresías, punto de venta, caja, inventario y llegadas.

## Para empezar

Requisitos: Node 24 y, para la base de datos local, Docker Desktop.

```
npm install
npm run dev
```

Abre http://localhost:3000.

## Pruebas

```
npm run verificar
```

Corre lint, revisión de tipos, pruebas de lógica (Vitest) y pruebas en navegador
(Playwright). Antes de la primera vez: `npx playwright install chromium`.

La guía completa del proyecto (reglas, decisiones y avance) está en [CLAUDE.md](CLAUDE.md).
