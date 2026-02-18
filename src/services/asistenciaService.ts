import { register } from "node:module";
import { db } from "../lib/db";

export const asistenciaService = {
  async register(socioId: number) {
    return await db.asistencias.create({
      data: {
        socio_id: socioId,
        fecha: new Date(),
        hora: new Date(),
      },
    });
  },
  async getAll() {
    return await db.asistencias.findMany({
      orderBy: { fecha: "desc" },
      include: {
        socios: true,
      },
    });
  },
  async getByDate(fechaStr: string) {
    const fechaBuscada = new Date(fechaStr);
    return await db.asistencias.findMany({
      where: { fecha: fechaBuscada },
      include: { socios: true },
    });
  },
  async getByName(termino: string) {
    return await db.asistencias.findMany({
      where: {
        socios: {
          OR: [{ nombre: { contains: termino } }, { apellido: { contains: termino } }],
        },
      },
      include: { socios: true },
    });
  },
};
