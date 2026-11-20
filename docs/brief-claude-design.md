# Brief de diseño · AeraFit

**Para:** Claude Design
**Qué diseñar:** el sistema completo de AeraFit: el panel del gimnasio, el portal del miembro y la tableta de check-in.
**Idioma de toda la interfaz:** español de México.
**Datos:** todos los nombres, montos y cifras de este brief son ficticios. Úsalos tal cual en las maquetas.

---

## 1. Qué es AeraFit

AeraFit es una plataforma que se vende a gimnasios en México: pesas, box, crossfit, jiu jitsu y artes marciales. Cada gimnasio tiene su cuenta y puede tener una o varias sucursales.

La plataforma no solo guarda datos. **Le dice al dueño qué está pasando y qué debe hacer**:

- quién está por darse de baja;
- qué clases y qué coaches funcionan mejor;
- de dónde vienen los mejores clientes;
- a quién hay que llamar hoy.

Hay tres experiencias:

| Experiencia | Quién la usa | Dónde |
|---|---|---|
| **Panel del gimnasio** | Dueño, gerente, recepción, coach | Computadora de recepción (1366×768 es lo más común) y celular del dueño |
| **Portal del miembro** (app web instalable) | El cliente del gimnasio | Celular (360–390 px de ancho) |
| **Tableta de check-in** (modo kiosco) | El cliente al llegar | Tableta de 10" horizontal en la entrada |

## 2. Adaptación a México (aplica en todas las pantallas)

**Formatos**
- Dinero en pesos: `$1,234.50`, con IVA incluido. Si el espacio es poco, sin centavos: `$899`.
- Fechas cortas: `15/11/2026`. Fechas en texto: `15 nov 2026` o "sábado 15 de noviembre".
- Horas en formato de 12 horas, como se usa aquí: `7:00 p. m.`, `10:32 a. m.`
- Celular de 10 dígitos, mostrado como `55 1234 5678`. El celular es la forma principal de identificar a un cliente, no una matrícula.

**Cómo se paga en México**
- **En recepción:** efectivo, tarjeta (con la terminal del gimnasio) o transferencia SPEI.
- **En línea:** cargo automático mensual con tarjeta (domiciliación), pago en OXXO con referencia y Mercado Pago.
- **Meses sin intereses** en planes anuales con tarjeta de crédito.
- **Inscripción** (cobro único al entrar) y **anualidad** de mantenimiento: son comunes y deben poder agregarse al plan.

**Facturación**
- Algunos clientes piden **factura (CFDI)**. Para eso se capturan RFC, razón social, régimen fiscal, código postal y uso del CFDI.
- Diseña el botón "Solicitar factura" en el portal y en el recibo.

**WhatsApp es el canal principal**
- En México casi todo se habla por WhatsApp. El correo y los SMS van en segundo plano.
- Cada botón de contacto abre WhatsApp con un mensaje ya escrito, que el gimnasio puede editar antes de enviar.

**Familias**
- Un mismo celular puede ser de varias personas, por ejemplo una mamá y sus hijos.
- Al buscar por celular, si aparece más de una persona, se elige con foto y nombre.
- En el portal, quien maneja el celular puede cambiar entre los perfiles de su familia.

**Plataformas de acceso corporativo**
- Wellhub (antes Gympass) y TotalPass son comunes. Cuentan como canal de llegada y como tipo de check-in.

**Temporadas**
- **Enero:** pico de altas por los propósitos de Año Nuevo.
- **Diciembre:** renovaciones con el aguinaldo.
- **Días festivos:** el horario especial del gimnasio debe poder marcarse en el calendario.

**Privacidad (Ley Federal de Protección de Datos Personales)**
- Peso, medidas corporales, lesiones y condiciones médicas son **datos sensibles**. Se capturan solo si el miembro da su consentimiento expreso.
- Solo los ven el miembro, su coach asignado y el dueño. Márcalos con un ícono de candado.
- El portal incluye la sección "Mis datos y privacidad": aviso de privacidad y derechos de acceso, rectificación, cancelación y oposición (ARCO).

**Vocabulario: así se dice en la interfaz**

| Concepto | En pantalla |
|---|---|
| Churn | **Tasa de bajas** (en tooltips: "también conocido como churn") |
| Churn risk / Risk score | **Riesgo de baja**: Alto, Medio, Bajo |
| Lead | **Prospecto** |
| Lead scoring | **Calificación de prospectos** |
| Lifetime value | **Valor del cliente** |
| Merch | **Tienda** |
| Check-in | **Check-in** (así se dice en los gimnasios); en reportes, "asistencias" |
| Personal training | **Entrenamiento personal** |
| Coach | **Coach** |

## 3. Usuarios y permisos

| Rol | Qué ve y hace |
|---|---|
| **Dueño** | Todo: tablero, ingresos, miembros, pagos, clases, métricas, retención, reportes, configuración, todas las sucursales |
| **Gerente** (admin) | Lo mismo que el dueño, pero no puede nombrar dueños ni ver la facturación de AeraFit |
| **Recepción** | Check-in, punto de venta, cobro de mensualidades, alta de miembros y prospectos, tareas que le asignen, caja de su turno. **No ve** ingresos totales, costos, utilidad ni el ranking de coaches |
| **Coach** | Sus clases y asistencias, sus clientes asignados, metas y progreso (medidas y peso, si el miembro dio permiso). **No ve** pagos ni ingresos |
| **Miembro** | Su membresía, su QR, clases y reservas, pagos y recibos, su progreso y sus datos personales |

El menú y cada pantalla cambian según el rol. Diseña cómo se ve el tablero para el dueño, para recepción y para el coach.

## 4. Mapa del panel del gimnasio

Barra lateral (en celular, menú inferior con "Más"):

1. **Inicio**: el tablero
2. **Miembros**
3. **Prospectos**
4. **Clases**: horario, reservas, asistencia
5. **Check-in**: registro manual en recepción
6. **Punto de venta**: productos y mensualidades
7. **Pagos**: cobros, pagos fallidos, recibos
8. **Retención**: tareas automáticas
9. **Coaches**
10. **Reportes**
11. **Inventario** y **Caja**
12. **Configuración**: gimnasio, sucursales, planes, personal, mensajes de WhatsApp, reglas

**Barra superior:**
- **Selector de sucursal**, con la opción "Todas las sucursales".
- **Selector de periodo**: hoy, esta semana, este mes, mes anterior, rango personalizado.
- **Buscador global por nombre o celular**, siempre visible.

## 5. Pantallas a diseñar

### 5.1 Tablero (Inicio)

**A. Indicadores principales** (fila de tarjetas)

Cada tarjeta lleva:
- la cifra;
- la **tendencia contra el periodo anterior**, con flecha y porcentaje;
- una minigráfica de los últimos 6 meses;
- un tooltip con la definición.

| Indicador | Ejemplo | Definición (para el tooltip) |
|---|---|---|
| Ingresos del mes | **$248,500** ↑ 8.2% vs. mes anterior | Todo lo cobrado en el mes: membresías, clases, entrenamiento personal y tienda |
| Miembros activos | **412** ↑ 3.1% | Miembros con membresía vigente hoy |
| Tasa de bajas | **4.8%** ↓ 0.6 pts | Miembros que no renovaron en el mes ÷ activos al inicio del mes |
| Ingreso promedio por miembro | **$603** ↑ 4.9% | Ingresos de membresías ÷ miembros activos |
| Prospectos nuevos | **57** ↓ 12% | Personas registradas como prospecto en el mes |

**Regla de color de la tendencia:** el color indica si el cambio es **bueno o malo**, no si sube o baja.
- Si la tasa de bajas sube, va en **rojo**, aunque la flecha apunte hacia arriba.
- Si el cambio es menor a ±2%, se marca como **estable**: gris, con flecha horizontal.
- Cada tendencia lleva una palabra además del color: "mejorando", "empeorando" o "estable".

**B. Radar de riesgo de baja**
- Los 5 a 10 miembros con más riesgo.
- Cada uno con foto, nombre, plan, nivel de riesgo y **las razones**:

  ```
  Carlos Méndez · Pro · Riesgo alto (86)
  ├── No viene hace 24 días
  ├── Pago fallido el 12/11/2026
  └── Su asistencia cayó 70% este mes
  [Enviar WhatsApp] [Crear tarea]
  ```

- Al final: enlace "Ver todos los miembros en riesgo".

**C. Ingresos por categoría**
- Barra horizontal apilada, o barras con porcentaje y monto. Evita la gráfica de pastel.

  ```
  Membresías ............. 65%  $161,525
  Entrenamiento personal . 18%  $44,730
  Clases sueltas ......... 10%  $24,850
  Tienda .................  7%  $17,395
  ```

**D. Actividad en vivo**
- Lista que se actualiza sola, con un ícono por tipo de evento:

  ```
  10:32 a. m. · Carlos Méndez hizo check-in con QR · Sucursal Cumbres
  10:28 a. m. · Nueva membresía Pro · Ana Ríos
  10:20 a. m. · Pago recibido · $899 · Luis Ortega
  10:14 a. m. · Membresía cancelada · Jorge Salas
  ```

- **Tipos de evento:** nuevo miembro, check-in (QR, celular, Wellhub o TotalPass), pago recibido, pago fallido, cancelación, reserva y prospecto nuevo.
- Lleva filtro por tipo y un indicador "En vivo".

**E. Mapa de calor de asistencia**
- Cuadrícula de **días (lunes a domingo) por horas** (de 5:00 a. m. a 11:00 p. m.). La intensidad es el número de check-ins.
- Al pasar el mouse sobre una celda: "Lunes 6:00 p. m. · 87 personas en promedio · 92% del aforo".
- Debajo, tres datos destacados:
  - **Hora pico:** lunes 6–8 p. m.
  - **Día más ocupado:** miércoles
  - **Menor tráfico:** sábado 2–4 p. m.

**F. Ocupación por día y por hora**
- Barras de **ocupación promedio** (% del aforo de la sucursal):

  ```
  Lunes      78%
  Martes     64%
  Miércoles  82%
  Jueves     61%
  Viernes    74%
  ```

- Nota bajo la gráfica: la ocupación se estima con los check-ins y una estancia promedio configurable (por ejemplo, 75 min), porque nadie registra su salida.
- Agrega un recuadro de **sugerencias** generadas por el sistema, que ayuden a decidir horarios, personal, clases, promociones y mantenimiento:
  - "El sábado de 2 a 4 p. m. está al 18%: buen horario para mantenimiento o para una promoción."
  - "El lunes de 6 a 8 p. m. estás al 92%: considera otra clase o más personal en piso."

**G. Clases con mejor desempeño** (resumen)

| Clase | Inscritos | Asistencia | Ingresos |
|---|---|---|---|
| Spinning | 28 | 91% | $8,400 |
| HIIT | 24 | 88% | $7,200 |
| Yoga | 17 | 76% | $5,100 |

**H. Ranking de coaches** (solo dueño y gerente)

  ```
  1. Daniela Torres   92 pts  ↑
  2. Carlos Ruiz      87 pts  =
  3. Andrés López     81 pts  ↓
  ```

- Al abrir un coach se ve el desglose: asistencia a sus clases, retención de sus clientes, clientes asignados, ingresos generados y satisfacción (encuesta de 1 a 5 después de clase).
- La fórmula y el peso de cada factor se muestran y se pueden configurar.
- **Tono:** que se lea como reconocimiento y oportunidad de mejora, no como castigo.

**Versiones del tablero:**
- **Recepción:** check-ins de hoy, cobros pendientes del día, clases de hoy con cupo y sus tareas.
- **Coach:** sus clases de hoy, asistencia y sus clientes en riesgo.

### 5.2 Miembros (una de las partes más importantes)

**Tabla de miembros**

| Columna | Qué muestra |
|---|---|
| Miembro | Foto, nombre y celular |
| Plan | Lo define cada gimnasio; por ejemplo Básico, Pro, Elite |
| Fecha de alta | Cuándo empezó: `03/02/2025` |
| Último check-in | "Hace 3 días" (con la fecha exacta al pasar el mouse) |
| Clases | Clases tomadas este mes y en total |
| Ingreso | Lo que ha pagado en total |
| Riesgo de baja | Indicador Alto / Medio / Bajo con su puntaje de 0 a 100 |
| Estado | Activo, Por vencer, Vencido, En riesgo, Congelado, Cancelado |
| Sucursal | La sucursal donde se inscribió |

- **Estados:** cada uno con color **y** texto o ícono (no solo color).
  - Verde: al corriente.
  - Amarillo: vence en 3 días o menos.
  - Rojo: vencido o con documentos pendientes.
  - Gris: congelado o cancelado.

**Filtros**
- Plan, riesgo, estado, sucursal, coach asignado, canal por el que llegó, fecha de alta, días sin venir.
- **Vistas guardadas** que responden preguntas del dueño, por ejemplo: "¿Quiénes son mis miembros Elite con riesgo alto?" → `Plan: Elite` + `Riesgo: Alto`.
- Vistas sugeridas: "En riesgo alto", "Vencen esta semana", "Sin venir hace 20+ días", "Nuevos este mes", "Cumplen 1 año este mes".

**Acciones**
- **Masivas:** crear tareas, exportar a Excel y "Contactar por WhatsApp". Esta última abre una cola: los chats se abren uno por uno para enviar y marcar.
- **Rápidas** por renglón: cobrar, hacer check-in, enviar WhatsApp.

**Celular:** la tabla se convierte en tarjetas.

**Perfil lateral del miembro**

Se abre al hacer clic en una persona. Es un panel a la derecha, con pestañas.

- **Encabezado:**
  - Foto, nombre, celular, plan y estado.
  - Riesgo de baja con sus razones.
  - Botones: **Enviar WhatsApp**, Cobrar, Check-in, Más.
- **Resumen:**
  - **Valor del cliente: $18,200**. Es lo que ha pagado desde que llegó; el tooltip lo explica.
  - **Asistencia mensual: 82%**. Muestra la tendencia de 6 meses y avisa si viene bajando ("bajó de 95% a 82%: señal temprana de baja").
  - Miembro desde, sucursal y coach asignado.
  - Cómo llegó. Si llegó por referido, quién lo refirió; y a cuántos ha referido él.
  - Clases favoritas y próxima clase reservada.
  - Metas, por ejemplo "Bajar 5 kg para marzo" o "Cinta azul en BJJ", con su avance.
- **Progreso** (dato sensible, con candado):
  - Peso y medidas corporales con su historial y una gráfica.
  - Quién las registró y cuándo.
  - Si no hay consentimiento: un estado vacío que lo explique y un botón para pedirlo.
- **Membresía y pagos:**
  - Plan actual, vigencia y próximo cobro (`Membresía Pro · $899/mes · Próximo cobro: 15 nov 2026`).
  - Método de pago (tarjeta domiciliada •••• 4242, o "paga en recepción").
  - Historial de pagos y recibos, y congelaciones.
- **Asistencia:** calendario de check-ins y clases.
- **Documentos:** INE, responsiva y aviso de privacidad aceptado, cada uno con su estado: pendiente, aprobado o rechazado.
- **Notas y tareas:** notas del equipo e historial de contactos (qué se le escribió y cuándo).

**WhatsApp desde el perfil**
- Al tocar "Enviar WhatsApp" aparece un selector de **plantillas**. Cada una se puede editar antes de enviar y tiene variables como `{nombre}`, `{clase}`, `{hora}`, `{fecha_vencimiento}` y `{monto}`.

  > **Reactivación**
  > Hola Carlos 👋
  > Vimos que hace unos días no vienes al gimnasio. ¿Todo bien?
  > Tenemos tu próxima sesión lista 💪

  > **Descuento para renovar**
  > Hola Carlos, tenemos una promoción para renovar tu membresía Pro: 15% de descuento si pagas antes del 20/11/2026.

  > **Recordatorio de clase**
  > Recuerda que mañana tienes tu clase de spinning a las 7:00 p. m. 🚴

  > **Pago pendiente**
  > Hola Carlos, tu mensualidad de $899 venció el 12/11/2026. Puedes pagar en recepción o aquí: {enlace_pago}

  > **Después del check-in** (por ejemplo, la primera visita o la visita número 50)
  > ¡Felicidades por tu visita 50, Carlos! 🎉

- Al enviar, el contacto queda registrado: "Recordatorio enviado el 18/11/2026 por Recepción". Así no se repite.
- **Mensajes automáticos** (después de una acción, sin que nadie los envíe): diséñalos como opción en Configuración, con la etiqueta "Requiere WhatsApp Business". Al principio, el gimnasio envía todo con un clic.

### 5.3 Prospectos y calificación

- **Embudo:** Nuevo → Contactado → Clase de prueba → Inscrito, o Perdido (con motivo). Puede verse como tablero tipo kanban o como lista.
- **Alta de prospecto:** nombre, celular, interés (pesas, box, BJJ…) y **cómo conoció el gimnasio**:
  - Instagram, Facebook, TikTok;
  - Google o Google Maps;
  - pasaba por la calle;
  - referido (por quién);
  - convenio con empresa;
  - Wellhub o TotalPass;
  - volante o lona;
  - otro.
- **Calificación (0–100) y etiqueta:** Caliente, Tibio o Frío.
  - Se calcula con qué tan bien convierte su canal, si vino a la clase de prueba y si respondió.
  - Se muestra el porqué, como en el riesgo de baja.
- **Reporte de canales** (la pregunta es "¿qué canal me trae los mejores clientes?"):

  | Canal | Prospectos | Inscritos | Conversión | Valor promedio del cliente |
  |---|---|---|---|---|
  | Instagram | 100 | 22 | 22% | $9,400 |
  | Referidos | 40 | 24 | 60% | $16,800 |
  | Google Maps | 35 | 12 | 34% | $11,200 |
  | Pasaba por la calle | 28 | 9 | 32% | $8,700 |

  - Resalta automáticamente el canal con mejor conversión y el de mayor valor.

### 5.4 Clases

- **Vistas:**
  - **horario semanal** (calendario por sucursal y por disciplina);
  - **lista** con métricas;
  - **detalle de una clase**.
- **Cada clase muestra:** coach, horario, sala, capacidad, porcentaje de inscritos, porcentaje de asistencia (de los que reservaron, cuántos llegaron) e ingresos generados.

  | Clase | Coach | Capacidad | Inscritos | Asistencia |
  |---|---|---|---|---|
  | Spinning | Laura | 30 | 28 | 92% |
  | HIIT | Mateo | 20 | 19 | 88% |
  | Yoga | Sofía | 25 | 14 | 71% |

- **Indicadores destacados:**
  - clases populares;
  - clases con poco uso (menos del 40% de ocupación en 4 semanas);
  - clases más rentables;
  - horarios con más demanda (los que se llenan y tienen lista de espera).
- **Detalle de clase:**
  - lista de reservados con su check-in;
  - lista de espera;
  - pase de lista manual del coach;
  - historial de las últimas 8 sesiones.

### 5.5 Retención: tareas automáticas

La sección dice **qué hacer**, no solo qué pasa. El flujo:

```
El sistema detecta un comportamiento → genera una alerta → crea una tarea
→ el equipo contacta al miembro → se registra el resultado
```

- **Tarjetas de alerta:**
  - ⚠️ **8 miembros llevan más de 20 días sin venir** → [Crear tarea: Contactar miembros inactivos]
  - 🎉 **4 miembros cumplen un año este mes** → [Crear tarea: Enviar recompensa de aniversario]
  - 💳 **6 pagos fallidos esta semana** → [Crear tarea: Pedir actualizar tarjeta]
  - 📅 **11 membresías vencen en los próximos 3 días** → [Crear tarea: Recordatorio de renovación]
  - 🆕 **9 miembros nuevos no han venido en su segunda semana** → [Crear tarea: Seguimiento de bienvenida]
- **Bandeja de tareas:**
  - responsable (recepción, coach o gerente), fecha límite y prioridad;
  - miembros incluidos y la plantilla de WhatsApp sugerida;
  - botón para abrir cada chat.
- **Resultado de cada contacto:** "Regresa", "No contesta", "Lo pensará", "Se dio de baja" (con motivo).
- **Efectividad:** "Este mes recuperaste 14 de 31 miembros en riesgo (45%) · $12,586 al mes conservados".
- **Reglas configurables:** días sin venir, caída de asistencia, días antes del vencimiento y aniversarios.

### 5.6 Pagos y cobranza

- **Resumen:** cobrado este mes, por cobrar, vencido y fallido, cada uno con su monto y su número de miembros.
- **Pestañas:** Todos, Próximos cobros, Pagos fallidos, Vencidos, Reembolsos.
- **Estados de pago:** Pagado, Pendiente, Programado, Fallido, Vencido, Reembolsado, Cancelado. Cada uno con su color y su ícono.
- **Cobro recurrente:** se muestra en el perfil y en el portal así:

  ```
  Membresía Pro
  $899 / mes
  Próximo cobro: 15 nov 2026 · Tarjeta •••• 4242
  ```

- **Pago fallido:**
  - Debe verse rápido, con insignia roja en el menú.
  - Muestra el motivo ("fondos insuficientes", "tarjeta vencida") y los reintentos automáticos programados (días 1, 3 y 5).
  - Acciones: **notificar por WhatsApp con un enlace para actualizar la tarjeta**, cobrar en recepción, dar unos días de gracia.
  - **El objetivo es evitar bajas involuntarias.** Muestra cuánto dinero se recuperó con los reintentos.
- **Vencido** (para quien paga en recepción): lista de cobranza con el botón de WhatsApp y la marca "recordatorio enviado".
- **Recibos:**
  - Ticket para impresora térmica de 58 u 80 mm y versión digital para enviar por WhatsApp.
  - Botón "Solicitar factura".
- **Punto de venta** (pantalla aparte, para recepción):
  - Carrito con mensualidades, clases sueltas, entrenamiento personal y productos de la tienda (agua, vendas, guantes, suplementos, ropa con talla y color).
  - **Pago mixto:** por ejemplo, $500 en efectivo y $399 con tarjeta.
  - Cálculo del cambio y ticket.
- **Caja:** apertura con fondo, egresos y corte del turno con la diferencia contra lo esperado.

### 5.7 Check-in en recepción y tableta (kiosco)

- **Tableta en la entrada:**
  - Lee el **QR del portal** con su cámara.
  - Como alternativa, el miembro escribe su celular y, si el gimnasio lo pide o si hay varias personas con ese celular, un PIN de 4 dígitos.
- **El resultado ocupa toda la pantalla durante 3 segundos:**
  - 🟢 **¡Bienvenido, Carlos M.!** Al corriente · Pro · Vence el 15/12/2026
  - 🟡 **Hola, Ana R.** Tu membresía vence en 2 días
  - 🔴 **Membresía vencida** Pasa a recepción · o "Documentos pendientes"
- **Privacidad en la tableta:** muestra solo el primer nombre, la inicial del apellido y la foto.
- **Si llega Wellhub o TotalPass:** botón para validar el código del agregador.
- **Recepción:** búsqueda por celular o nombre, con la misma tarjeta de estado y un botón "Autorizar entrada" para vencidos, si el gimnasio lo permite.
- **Estilo:** fondo oscuro, textos y botones grandes para usar con el dedo, y el logo y color del gimnasio.

### 5.8 Portal del miembro (celular)

- **Marca blanca:** lleva el logo y el color del gimnasio. AeraFit aparece solo como "Con tecnología de AeraFit".
- **Navegación inferior:** Inicio · Clases · Mi QR · Pagos · Perfil.
- **Inicio:**
  - estado de la membresía, con días restantes y barra de vigencia;
  - próxima clase reservada;
  - racha de asistencia ("Llevas 3 semanas seguidas 🔥");
  - avisos del gimnasio.
- **Mi QR:**
  - QR grande con brillo alto, que **cambia cada 30 segundos** para que no se pueda compartir con una captura de pantalla;
  - nombre y foto;
  - el flujo: el miembro llega, abre su QR, lo escanea en la tableta y queda registrado.
- **Clases y reservas:**
  - Calendario por día y lista de clases con el cupo:
    - `Spinning · 7:00 p. m. · Laura · 24/30 lugares` → [Reservar]
    - `30/30 · Clase llena` → [Unirme a la lista de espera]
  - Mis reservas, con el botón cancelar y la política visible ("cancela hasta 2 h antes").
- **Mi membresía y pagos:**
  - plan, vigencia y próximo cobro;
  - pagar o renovar (tarjeta, OXXO, transferencia);
  - método de pago guardado y actualizar tarjeta;
  - congelar membresía, si el gimnasio lo permite;
  - recibos y solicitud de factura.
- **Mi progreso:** asistencia mensual, metas, peso y medidas (si dio su consentimiento) y clases favoritas.
- **Perfil:**
  - datos personales y contacto de emergencia;
  - **cambiar de perfil familiar** (las personas que comparten el celular);
  - "Mis datos y privacidad", con aviso de privacidad, derechos ARCO y la opción de pedir la baja de sus datos.
- **Registro nuevo (onboarding):**
  - El miembro llega por enlace o por el QR de la sucursal.
  - Captura nombre, celular (verificado con código), fecha de nacimiento, foto y cómo conoció el gimnasio.
  - Sube su INE.
  - Acepta el aviso de privacidad, el reglamento y la responsiva, y firma en pantalla.
  - **Si es menor de edad:** datos y firma de su tutor.

### 5.9 Configuración (solo dueño y gerente)

- **Gimnasio:** nombre, logo, color, RFC, contacto, redes, reglamento.
- **Sucursales:** dirección, horario, días festivos, aforo, WhatsApp.
- **Planes y precios:** mensual, semanal, por visita y paquete de clases. Cada plan puede tener inscripción, anualidad, precio por sucursal y acceso a una o a todas las sucursales.
- **Personal y roles.**
- **Plantillas de WhatsApp.**
- **Reglas:**
  - días para "por vencer";
  - qué pasa con un vencido en la puerta;
  - si se pide PIN;
  - política de reservas;
  - pesos del ranking de coaches;
  - reglas de retención.

## 6. Datos de ejemplo para las maquetas

- **Gimnasio:** "Fuerza Norte · Box & BJJ", con las sucursales **Cumbres** y **Centro** en Monterrey (`America/Monterrey`).
- **Planes:**
  - Básico $549/mes
  - Pro $899/mes
  - Elite $1,299/mes
  - Visita $120
  - Paquete de 10 clases $950
  - Entrenamiento personal, 8 sesiones: $2,800
  - Inscripción $300
- **Coaches:** Daniela Torres, Carlos Ruiz, Andrés López, Laura Garza, Mateo Treviño, Sofía Cantú.
- **Miembros:** Carlos Méndez, Ana Ríos, Luis Ortega, Jorge Salas, Mariana Elizondo, Fernanda Quiroga, Diego Villarreal, Paola Cavazos, Ricardo Salinas, Valeria Montemayor.
- **Celulares de ejemplo:** `81 0000 00xx` (ficticios).

## 7. Dirección visual

- **Carácter:** energía de gimnasio, pero profesional y confiable. Tiene que verse bien para un box de crossfit, una academia de jiu jitsu y un gimnasio de pesas, no solo para yoga o estudios boutique.
- **Marca del panel:** AeraFit. Propón logotipo, paleta y tipografía.
- **Marca del portal y la tableta:** la del gimnasio. Cada gimnasio pone su logo y su color principal, y el diseño debe verse bien con cualquier color (prueba con rojo, azul y negro).
- **Color con significado:**
  - verde: al corriente;
  - amarillo: por vencer;
  - rojo: vencido, fallido o riesgo alto;
  - gris: inactivo o estable.
  - **Nunca solo color:** siempre con texto o ícono, por accesibilidad.
- **Números grandes y legibles** en los indicadores, con cifras tabulares para que las columnas se alineen.
- **Modo claro y oscuro** en el panel. La tableta, oscura por omisión.
- **Gráficas:** de barras, líneas y mapa de calor, sin pasteles. Cada una con una frase arriba que diga la conclusión, por ejemplo: "Los miércoles son tu día más lleno".
- **Accesibilidad:** contraste AA, áreas de toque de 44 px o más y foco visible para usar con teclado en recepción.
- **Estados que hay que diseñar en cada pantalla:**
  - cargando;
  - vacío (gimnasio nuevo sin datos, con una invitación a empezar);
  - error;
  - sin conexión;
  - sin permiso.

## 8. Prioridad de diseño

Diseña todo, pero entrega en este orden, que es el orden en que se programa:

1. **Primero:**
   - tablero (indicadores, ingresos por categoría, actividad en vivo, mapa de calor, ocupación);
   - miembros (tabla, filtros y perfil lateral);
   - check-in en recepción;
   - punto de venta y caja;
   - clases y horario;
   - configuración de planes;
   - inventario.
2. **Segundo:** portal del miembro (registro, QR, reservas, pagos), documentos y firma, y la tableta de check-in.
3. **Tercero:**
   - pagos recurrentes y pagos fallidos;
   - cobranza;
   - radar de riesgo de baja y tareas de retención;
   - prospectos y calificación;
   - ranking de coaches y encuestas de satisfacción;
   - mensajes automáticos de WhatsApp.

## 9. Entregables que esperamos

- **Sistema de diseño:** colores, tipografía, espaciado, componentes, íconos e insignias de estado.
- **Componentes clave:**
  - tarjeta de indicador con tendencia;
  - tabla con filtros y vistas guardadas;
  - panel lateral;
  - insignia de riesgo con sus razones;
  - selector de plantilla de WhatsApp;
  - tarjeta de clase con cupo;
  - tarjeta de estado del check-in;
  - ticket.
- **Pantallas de la sección 5:** en computadora (1366×768 y 1440×900) y en celular (390 px). La tableta, en 1280×800 horizontal.
- **Flujos navegables:**
  1. Cobrar una mensualidad en recepción.
  2. Hacer check-in con QR.
  3. Encontrar a los miembros Elite con riesgo alto y enviarles un WhatsApp.
  4. Reservar una clase desde el portal.
  5. Resolver un pago fallido.
