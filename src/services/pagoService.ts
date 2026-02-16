import { number } from "astro:schema";
import { db } from "../lib/db";
import type { Prisma } from "@prisma/client";

export const pagoService = {
  async getPagosPendientes(inicio: Date, fin: Date) {
    return await db.pagos.findMany({
      where: {
        estado_pago: "pendiente",
        fecha_programada: {
          gte: inicio,
          lte: fin,
        },
      },
      include: {
        socios: true,
        planes: true,
      },
      orderBy: { fecha_programada: "asc" },
    });
  },
};
