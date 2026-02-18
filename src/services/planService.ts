import { number } from "astro:schema";
import { db } from "../lib/db";
import type { Prisma } from "@prisma/client";

export type PlanInput = {
  nombre_plan: string;
  dias: string | number;
  descripcion?: string;
  precio: string | number;
};

export const planService = {
  // =================================================================
  // 1. get all
  // =================================================================
  async getAll() {
    return await db.planes.findMany({
      orderBy: { id_plan: "asc" },
    });
  },
  // =================================================================
  // 5. get by id
  // =================================================================
  async getById(id: number) {
    return await db.planes.findUnique({
      where: { id_plan: id },
    });
  },
  // =================================================================
  // 5. create
  // =================================================================
  async create(data: PlanInput) {
    return await db.planes.create({
      data: {
        nombre_plan: data.nombre_plan,
        dias: Number(data.dias),
        descripcion: data.descripcion,
        precio: Number(data.precio),
      },
    });
  },
  // =================================================================
  // 5. update
  // =================================================================
  async update(id: number, data: Partial<PlanInput>) {
    return await db.planes.update({
      where: { id_plan: id },
      data: {
        ...data,
        dias: data.dias ? Number(data.dias) : undefined,
        precio: data.precio ? Number(data.precio) : undefined,
      },
    });
  },
  // =================================================================
  // 5. delete
  // =================================================================
  async delete(id: number) {
    try {
      db.planes.delete({
        where: { id_plan: id },
      });
      return { success: true };
    } catch (error) {
      return { success: false, error: "plan no encontrado" };
    }
  },
};
