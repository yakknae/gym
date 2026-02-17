import { db } from "../lib/db";
import type { Prisma } from "@prisma/client";

export type obraSocialInput = {
  nombre_plan_social: string;
  categoria: string;
};

export const obraSocialService = {
  async getAll() {
    return await db.planes_sociales.findMany({
      orderBy: { nombre_plan_social: "asc" },
    });
  },

  async getById(id: number) {
    return await db.planes_sociales.findUnique({
      where: { id_plan_social: id },
    });
  },
  async create(data: obraSocialInput) {
    return await db.planes_sociales.create({
      data: {
        nombre_plan_social: data.nombre_plan_social,
        categoria: data.categoria,
      },
    });
  },
  async update(id: number, data: Partial<obraSocialInput>) {
    return await db.planes_sociales.update({
      where: { id_plan_social: id },
      data: { nombre_plan_social: data.nombre_plan_social, categoria: data.categoria },
    });
  },
  async delete(id: number) {
    try {
      await db.planes_sociales.delete({
        where: { id_plan_social: id },
      });
      return { success: true };
    } catch (error) {
      console.error("Error al eliminar obra social:", error);
      return { success: false, error: "No se pudo eliminar el plan. Verifique si tiene socios vinculados." };
    }
  },
};
