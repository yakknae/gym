import type { APIRoute } from "astro";
import { pagoService } from "../../../services/pagoService";

export const POST: APIRoute = async ({ params }) => {
  try {
    const id = Number(params.id);

    if (!id) {
      return new Response(JSON.stringify({ error: "ID inválido" }), { status: 400 });
    }

    await pagoService.marcarComoPagado(id);

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
};
