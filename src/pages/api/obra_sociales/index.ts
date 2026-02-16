import type { APIRoute } from "astro";
import { obraSocialService } from "../../../services/obraSocialService";
import { stat } from "node:fs";

export const GET: APIRoute = async () => {
  const obras = await obraSocialService.getAll();
  return new Response(JSON.stringify(obras), { status: 200 });
};

export const POST: APIRoute = async ({ request }) => {
  const data = await request.json();
  const nueva = obraSocialService.create(data);
  return new Response(JSON.stringify(nueva), { status: 201 });
};
