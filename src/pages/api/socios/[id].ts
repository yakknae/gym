import type { APIRoute } from "astro";
import { socioService } from "../../../services/socioService";

export const GET: APIRoute = async ({ params }) => {
  const socio = await socioService.getById(Number(params.id));
  if (!socio) return new Response(null, { status: 404 });
  return new Response(JSON.stringify(socio), { status: 200 });
};

export const DELETE: APIRoute = async ({ params }) => {
  await socioService.delete(Number(params.id));
  return new Response(JSON.stringify({ message: "borrado" }), { status: 200 });
};

export const PUT: APIRoute = async ({ params, request }) => {
  const data = await request.json();
  const actualizado = await socioService.update(Number(params.id), data, data.actualizarFechaPago || false);
  return new Response(JSON.stringify(actualizado), { status: 200 });
};
