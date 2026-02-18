import type { APIRoute } from "astro";
import { asistenciaService } from "../../../services/asistenciaService";

export const POST: APIRoute = async ({ request }) => {
  try {
    const { id_socio } = await request.json();
    if (!id_socio) {
      return new Response(JSON.stringify({ error: "ID de socio requerido" }), { status: 400 });
    }
    const asistencias = await asistenciaService.register(Number(id_socio));
    return new Response(JSON.stringify(asistencias), { status: 201 });
  } catch (e: any) {
    return new Response(JSON.stringify({ error: e.message }), { status: 500 });
  }
};

export const GET: APIRoute = async () => {
  try {
    const asistencias = await asistenciaService.getAll();
    return new Response(JSON.stringify(asistencias), { status: 200 });
  } catch (e: any) {
    return new Response(JSON.stringify({ error: e.message }), { status: 500 });
  }
};
