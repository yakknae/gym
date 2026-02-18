import type { APIRoute } from "astro";
import { obraSocialService } from "../../../services/obraSocialService";

export const GET: APIRoute = async ({ params }) => {
  const socio = await obraSocialService.getById(Number(params.id));
  if (!socio) return new Response(null, { status: 404 });
  return new Response(JSON.stringify(socio), { status: 200 });
};

export const DELETE: APIRoute = async ({ params }) => {
  await obraSocialService.delete(Number(params.id));
  return new Response(JSON.stringify({ message: "borrado" }), { status: 200 });
};

export const PUT: APIRoute = async ({ params, request }) => {
  const data = await request.json();
  const actualizado = await obraSocialService.update(Number(params.id), data);
  return new Response(JSON.stringify(actualizado), { status: 200 });
};
