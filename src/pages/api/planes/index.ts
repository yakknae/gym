import type { APIRoute } from "astro";
import { planService, type PlanInput } from "../../../services/planService";
import { error } from "node:console";

export const GET: APIRoute = async () => {
  try {
    const planes = await planService.getall();
    return new Response(JSON.stringify(planes), { status: 200, headers: { "Content-Type": "application/json" } });
  } catch (e: any) {
    return new Response(JSON.stringify({ error: e.message }), { status: 500 });
  }
};

export const POST: APIRoute = async ({ request }) => {
  try {
    const data: PlanInput = await request.json();
    // Validamos que vengan los datos básicos que tenías en Python: nombre, días y precio
    if (!data.nombre_plan || !data.dias || !data.precio) {
      return new Response(JSON.stringify({ error: "Faltan datos obligatorios (nombre, dias, precio)" }), {
        status: 400,
      });
    }
    const nuevoPlan = await planService.create(data);
    return new Response(JSON.stringify(nuevoPlan), { status: 201 });
  } catch (e: any) {
    return new Response(JSON.stringify({ error: e.message }), { status: 500 });
  }
};
