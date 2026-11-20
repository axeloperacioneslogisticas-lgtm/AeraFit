// Página de inicio provisional. El panel del gimnasio (/panel), el kiosco
// (/kiosco/[sucursal]) y la app del cliente (/g/[gimnasio]) llegan en los
// siguientes pasos de la Fase 1.

const modulos = [
  { titulo: "Membresías", texto: "Planes mensuales, semanales, por visita y paquetes de clases." },
  { titulo: "Punto de venta", texto: "Cobra mensualidades y productos en efectivo, tarjeta o transferencia." },
  { titulo: "Caja", texto: "Apertura, egresos y corte por turno o por día en cada sucursal." },
  { titulo: "Inventario", texto: "Existencias por sucursal, con mínimos, entradas y ajustes." },
  { titulo: "Llegadas", texto: "El cliente se registra con su celular y ves quién entrena hoy." },
  { titulo: "Tablero", texto: "Ingresos del día y del mes, activos, por vencer y vencidos." },
];

export default function Inicio() {
  return (
    <main className="mx-auto flex w-full max-w-4xl flex-1 flex-col gap-10 px-4 py-12 sm:px-8 sm:py-20">
      <header className="flex flex-col gap-4">
        <p className="text-sm font-medium uppercase tracking-widest text-marca">Pase</p>
        <h1 className="text-3xl font-semibold leading-tight sm:text-5xl">
          El sistema para tu gimnasio, box o academia
        </h1>
        <p className="max-w-2xl text-lg text-tenue">
          Administra sucursales, clientes, mensualidades, ventas y accesos desde la recepción o
          desde tu celular.
        </p>
      </header>

      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {modulos.map((m) => (
          <li key={m.titulo} className="rounded-xl border border-borde p-5">
            <h2 className="font-semibold">{m.titulo}</h2>
            <p className="mt-1 text-sm text-tenue">{m.texto}</p>
          </li>
        ))}
      </ul>

      <p className="text-sm text-tenue">En construcción · Fase 1</p>
    </main>
  );
}
