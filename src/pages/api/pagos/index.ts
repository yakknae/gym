import type { APIRoute } from "astro";
import { pagoService } from "../../../services/pagoService";

export const GET: APIRoute = async ({ url }) => {
  const inicioParam = url.searchParams.get("inicio");
  const finParam = url.searchParams.get("fin");

  // 1. Validación de presencia
  if (!inicioParam || !finParam) {
    return new Response(JSON.stringify({ error: "Faltan las fechas de inicio y fin" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  // 2. Validación de formato de fecha
  const inicio = new Date(inicioParam);
  const fin = new Date(finParam);

  if (isNaN(inicio.getTime()) || isNaN(fin.getTime())) {
    return new Response(JSON.stringify({ error: "Formato de fecha inválido. Usar YYYY-MM-DD" }), {
      status: 400,
    });
  }

  try {
    const pendientes = await pagoService.getPagosPendientes(inicio, fin);
    return new Response(JSON.stringify(pendientes), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (e: any) {
    return new Response(JSON.stringify({ error: e.message }), { status: 500 });
  }
};
