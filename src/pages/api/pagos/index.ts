import type { APIRoute } from "astro";
import { pagoService } from "../../../services/pagoService";

export const POST: APIRoute = async () => {
  try {
    const resultado = await pagoService.generarPagosMesActualParaTodos();

    let mensaje = "";
    if (resultado.generados === 0) {
      mensaje = `No se generaron pagos nuevos. Los ${resultado.total} socios activos ya tienen su pago del mes actual.`;
    } else if (resultado.generados === resultado.total) {
      mensaje = `Se generaron ${resultado.generados} pagos nuevos exitosamente.`;
    } else {
      mensaje = `Se generaron ${resultado.generados} pagos nuevos. ${resultado.yaExistian} de los socios ya tenían su pago del mes.`;
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: mensaje,
        ...resultado,
      }),
      { status: 200 },
    );
  } catch (error: any) {
    console.error("Error en generar pagos:", error);
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
};
