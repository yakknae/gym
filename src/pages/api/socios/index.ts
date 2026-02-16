import type { APIRoute } from "astro";
import { socioService } from "../../../services/socioService";

// GET: Listar todos los socios
export const GET: APIRoute = async () => {
  const socios = await socioService.getAll();
  return new Response(JSON.stringify(socios), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
};

export const POST: APIRoute = async ({ request }) => {
  try {
    const data = await request.json();
    const nuevoSocio = await socioService.create(data);
    return new Response(JSON.stringify(nuevoSocio), { status: 201 });
  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message }), { status: 400 });
  }
};
