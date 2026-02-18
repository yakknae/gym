import type { APIRoute } from "astro";
import { asistenciaService } from "../../../services/asistenciaService";

export const GET: APIRoute = async ({ url }) => {
  try {
    const fecha = url.searchParams.get("fecha");
    const nombre = url.searchParams.get("nombre");

    let asistencias;

    if (fecha) {
      asistencias = await asistenciaService.getByDate(fecha);
    } else if (nombre) {
      asistencias = await asistenciaService.getByName(nombre);
    } else {
      asistencias = await asistenciaService.getAll();
    }

    return new Response(JSON.stringify(asistencias), { status: 200 });
  } catch (e: any) {
    return new Response(JSON.stringify({ error: e.message }), { status: 500 });
  }
};
