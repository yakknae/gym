import type { APIRoute } from "astro";
import { planService } from "../../../services/planService";

export const GET: APIRoute = async ({ params }) => {
  const plan = planService.getById(Number(params.id));
  if (!plan) return new Response(null, { status: 404 });
  return new Response(JSON.stringify(plan), { status: 200 });
};

export const PUT: APIRoute = async ({ params, request }) => {
  try {
    const data = await request.json();
    const actualizado = await planService.update(Number(params.id), data);
    return new Response(JSON.stringify(actualizado), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: "error al actualizar" }), { status: 400 });
  }
};

export const DELETE: APIRoute = async ({ params }) => {
  await planService.delete(Number(params.id));
  return new Response(JSON.stringify({ message: "borrado" }), { status: 200 });
};
