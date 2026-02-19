import type { APIRoute } from "astro";
import { socioService } from "../../../services/socioService";
import { db } from "../../../lib/db";
import { error } from "node:console";

export const GET: APIRoute = async ({ params }) => {
  const socio = await socioService.getById(Number(params.id));
  if (!socio) return new Response(null, { status: 404 });
  return new Response(JSON.stringify(socio), { status: 200 });
};

export const DELETE: APIRoute = async ({ params }) => {
  const idSocio = parseInt(params.id!);

  try {
    await db.$transaction(async (tx) => {
      // 1. Borramos asistencias
      await tx.asistencias.deleteMany({
        where: { socio_id: idSocio },
      });

      // 2. Borramos pagos (si tenés esta tabla, es muy probable que el error venga de acá)
      // Si la tabla se llama distinto, ajustá el nombre
      await tx.pagos.deleteMany({
        where: { id_socio: idSocio },
      });

      // 3. Finalmente borramos al socio
      await tx.socios.delete({
        where: { id_socio: idSocio },
      });
    });

    return new Response(JSON.stringify({ message: "Socio eliminado" }), { status: 200 });
  } catch (error) {
    console.error("Error en DELETE:", error);
    return new Response(JSON.stringify({ error: "No se pudo eliminar: existen registros vinculados" }), {
      status: 500,
    });
  }
};

export const PUT: APIRoute = async ({ params, request }) => {
  const data = await request.json();
  const actualizado = await socioService.update(Number(params.id), data, data.actualizarFechaPago || false);
  return new Response(JSON.stringify(actualizado), { status: 200 });
};
