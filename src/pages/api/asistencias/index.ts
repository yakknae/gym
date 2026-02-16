import type { APIRoute } from "astro";
import { asistenciaService } from "../../../services/asistenciaService";
import type { any } from "astro:schema";
import { error } from "node:console";
import { stat } from "node:fs";

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
