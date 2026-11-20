# Pase · Guía del proyecto

Pase es un SaaS multiempresa para gimnasios (pesas, box, jiu jitsu, artes marciales,
crossfit). Cada gimnasio (organización) administra sus sucursales, personal, clientes,
membresías, ventas, inventario, caja y llegadas. Sus clientes usan una PWA.

**Mantén este archivo al día**: si cambia una decisión, una regla o el avance, actualízalo
en el mismo commit.

@AGENTS.md

## Idioma y formatos (obligatorio)

- Todo en **español de México**: interfaz, mensajes de error, comentarios de código,
  nombres de dominio (tablas, funciones), commits y conversación.
- Nombres técnicos del framework se quedan en inglés (`page.tsx`, `useState`); los del
  negocio van en español (`membresias`, `sucursal`, `formatearPesos`).
- Fechas en pantalla: `dd/mm/aaaa`. Horas: `HH:mm` en la zona de la sucursal.
- Dinero: se guarda y calcula en **centavos enteros**. Se muestra como `$1,234.50`.
  Usar siempre `src/lib/formato/dinero.ts`; nunca sumar flotantes.
- Fechas de calendario (`date`) como texto `aaaa-mm-dd`; instantes como `timestamptz`.
  Usar `src/lib/formato/fecha.ts`. Zonas horarias IANA por sucursal
  (`America/Mexico_City`, `America/Tijuana`, `America/Cancun`…), nunca desfases fijos.
- Celular: 10 dígitos, normalizado con `src/lib/formato/celular.ts`.
  **No es único**: varias personas pueden compartirlo (mamá e hijos).

## Stack

| Pieza | Elección |
|---|---|
| App | Next.js 16 (App Router, `cacheComponents`) + TypeScript estricto + Tailwind 4 |
| Componentes | shadcn/ui (Radix), código dentro del repo |
| Validación | Zod en cada Server Action y RPC |
| Datos | Supabase: Postgres + RLS + Auth + Storage privado |
| Dinero | Funciones de Postgres (RPC) en una sola transacción |
| PWA | Serwist |
| Pruebas | Vitest (lógica), pgTAP + Supabase local (RLS), Playwright (flujos) |
| CI | GitHub Actions (`.github/workflows/verificar.yml`) |
| Hospedaje | Vercel; solo publica `main` con CI en verde |

Next.js 16 cambió APIs: antes de escribir código de Next, lee la guía correspondiente en
`node_modules/next/dist/docs/`.

## Comandos

```
npm run dev          # servidor de desarrollo
npm run test         # pruebas de lógica (Vitest)
npm run test:e2e     # pruebas en navegador (Playwright, build de producción)
npm run typecheck    # genera tipos de rutas y revisa TypeScript
npm run lint
npm run verificar    # todo lo anterior; debe pasar antes de cada commit
```

Windows: el proyecto vive en `C:\Users\aerae\Proyectos\Gimnasios` (fuera de OneDrive).
Docker Desktop (WSL2) es necesario para Supabase local y las pruebas de RLS.

## Estructura

```
src/app/                 rutas (App Router)
  panel/                 panel del gimnasio (dueño, admin, recepción, coach)   [pendiente]
  kiosco/[sucursal]/     tableta de llegadas                                   [Fase 3]
  g/[gimnasio]/          PWA del cliente                                        [Fase 2]
src/lib/formato/         dinero, fechas y celular (con pruebas *.test.ts)
e2e/                     pruebas de Playwright
supabase/migrations/     esquema, RLS y funciones                              [pendiente]
supabase/tests/          pruebas pgTAP de aislamiento                          [pendiente]
```

## Multiempresa y seguridad (reglas que no se rompen)

1. **Toda tabla de negocio lleva `org_id`** y tiene RLS activado. La seguridad vive en la
   base de datos, no solo en la interfaz.
2. Habrá una prueba que recorre todas las tablas de `public` y **falla si alguna no tiene
   RLS o `org_id`**. Cada tabla nueva entra además a la prueba de aislamiento
   (un gimnasio no lee ni escribe datos de otro).
3. Las consultas de usuarios van con su sesión (RLS aplica). La llave `service_role`
   solo en tareas internas del servidor, nunca en algo que pide un usuario ni en el navegador.
4. RLS filtra renglones, no columnas: lo que recepción o coach no deben ver (costos,
   utilidad, datos de salud) va en tablas o vistas aparte con permisos propios.
5. El kiosco es un **dispositivo registrado por sucursal**, revocable, que solo puede
   buscar por celular (datos mínimos) y registrar la llegada.
6. PIN del cliente: se guarda con hash (bcrypt vía `pgcrypto`), con límite de intentos.
7. Ventas, pagos y movimientos de inventario **no se borran**: se cancelan y generan su
   movimiento inverso. Folios por sucursal.
8. Estados de membresía *activa / por vencer / vencida* se **calculan** de las fechas;
   solo *congelada* y *cancelada* se guardan. Las congelaciones van en su propia tabla.

## Privacidad (LFPDPPP) y secretos

- Mínimo de datos y finalidades claras. Datos de salud: opcionales, con consentimiento
  expreso y en tabla aparte. Derechos ARCO, conservación y borrado.
- Supabase no tiene región en México: es transferencia internacional y debe decirse en el
  aviso de privacidad. Los textos legales los revisa un abogado antes de vender.
- **Nunca datos reales en el repositorio.** Datos de ejemplo ficticios (`.test`,
  celulares `55 0000 00xx`).
- **Nunca llaves ni contraseñas en el código.** Van en `.env.local` (ignorado por Git) y en
  Vercel/GitHub. Solo `.env.example` con nombres de variables y sin valores.

## Roles

| | Dueño / admin | Recepción | Coach |
|---|---|---|---|
| Configuración, sucursales, personal, planes | ✔ | – | – |
| Clientes | ✔ todos | Busca en todo el gimnasio | Solo de sus clases: nombre, foto, estado |
| Punto de venta y cobro | ✔ | ✔ en su sucursal | – |
| Caja | ✔ todas | Su turno y su corte | – |
| Costos, utilidad, finanzas | ✔ | – (solo ventas de su turno) | – |
| Inventario | ✔ entradas y ajustes | Ver y vender | – |
| Llegadas | ✔ | ✔ | Las de sus clases |

Además existe el **admin de plataforma** (el dueño de Pase), que da de alta gimnasios.

## Decisiones de producto

- Alta de gimnasios: la hace el admin de plataforma. Cobro a gimnasios manual (Stripe después).
- Fase 1 incluye disciplinas y horario semanal de clases con coach (reservaciones después).
- "Por vencer" = 3 días (configurable). Al cobrar a tiempo se extiende desde el vencimiento;
  si ya venció, desde hoy (configurable). Congelar sin tope (configurable).
- Tarjeta: solo se anota método y referencia (terminal propia del gimnasio).
- Precios con IVA incluido; desglose opcional en el ticket. CFDI fuera de la Fase 1.
- Ticket: impresión térmica desde el navegador (58/80 mm) y enlace al ticket.
- Kiosco: muestra primer nombre, inicial del apellido y foto; pide PIN si hay varias personas
  en el celular (el gimnasio puede exigirlo siempre).
- Fase 1 solo en línea.

## Commits

Pequeños, en español, diciendo **qué cambia para el gimnasio** (no solo qué archivo).
Título en presente ("Muestra…", "Permite…"), cuerpo con viñetas si hace falta.
`npm run verificar` en verde antes de cada commit.

## Avance de la Fase 1

- [x] 1. Base: repositorio, CI, formatos de fecha/dinero/celular, CLAUDE.md
- [ ] 2. Multiempresa, roles y RLS con pruebas de aislamiento (requiere Docker)
- [ ] 3. Alta del gimnasio, configuración y sucursales
- [ ] 4. Personal y permisos
- [ ] 5. Clientes
- [ ] 6. Disciplinas, clases y horario con coach
- [ ] 7. Planes y precios
- [ ] 8. Membresías y su regla de extensión
- [ ] 9. Productos e inventario
- [ ] 10. Caja y punto de venta con ticket
- [ ] 11. Llegada manual en recepción
- [ ] 12. Tablero
- [ ] 13. Datos de ejemplo y vista previa en Vercel
