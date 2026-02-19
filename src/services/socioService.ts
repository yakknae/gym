import type { Prisma } from "@prisma/client";
import { db } from "../lib/db";

export const socioService = {
  // =================================================================
  // 1. get all
  // =================================================================
  async getAll() {
    return await db.socios.findMany({
      include: {
        planes: true,
        pagos: true,
        planes_sociales: true,
      },
      orderBy: { id_socio: "desc" },
    });
  },
  // =================================================================
  // 2. get by id
  // =================================================================
  async getById(id: number) {
    return await db.socios.findUnique({
      where: { id_socio: id },
      include: {
        planes: true,
        pagos: {
          orderBy: { fecha_programada: "asc" },
        },
        planes_sociales: true,
      },
    });
  },
  // =================================================================
  // 3. create
  // =================================================================
  async create(data: any) {
    return await db.$transaction(async (tx: Prisma.TransactionClient) => {
      // 1. Validar que el plan exista
      const plan = await tx.planes.findUnique({ where: { id_plan: parseInt(data.id_plan) } });
      if (!plan) throw new Error(`El plan con ID ${data.id_plan} no existe.`);

      const fechaIngreso = new Date(data.fecha_ingreso);

      // 2. Crear el socio
      const nuevoSocio = await tx.socios.create({
        data: {
          nombre: data.nombre,
          apellido: data.apellido,
          dni: parseInt(data.dni),
          fecha_nacimiento: new Date(data.fecha_nacimiento),
          fecha_ingreso: fechaIngreso,
          genero: data.genero,
          email: data.email || null,
          telefono: data.telefono || null,
          direccion: data.direccion || null,
          id_plan: parseInt(data.id_plan),
          id_plan_social: data.id_plan_social ? parseInt(data.id_plan_social) : null,
          estado: data.estado || "Activo",
        },
      });

      // CAMBIO: Usar el mes de la fecha de ingreso, no el mes actual
      const primerDiaMesIngreso = new Date(fechaIngreso.getFullYear(), fechaIngreso.getMonth(), 1);

      await tx.pagos.create({
        data: {
          id_socio: nuevoSocio.id_socio,
          id_plan: nuevoSocio.id_plan!,
          fecha_programada: primerDiaMesIngreso,
          mes_correspondiente: primerDiaMesIngreso,
          estado_pago: "Pendiente",
        },
      });

      return nuevoSocio;
    });
  },
  // =================================================================
  // 4. update
  // =================================================================
  async update(id: number, data: any) {
    return await db.socios.update({
      where: { id_socio: id },
      data: {
        nombre: data.nombre,
        apellido: data.apellido,
        dni: parseInt(data.dni),
        fecha_nacimiento: new Date(data.fecha_nacimiento),
        genero: data.genero,
        email: data.email || null,
        telefono: data.telefono || null,
        direccion: data.direccion || null,
        id_plan: parseInt(data.id_plan),
        id_plan_social: data.id_plan_social ? parseInt(data.id_plan_social) : null,
        estado: data.estado,
      },
    });
  },
  // =================================================================
  // 5. DELETE
  // =================================================================
  async delete(id: number) {
    return await db.$transaction(async (tx: Prisma.TransactionClient) => {
      await tx.pagos.deleteMany({
        where: { id_socio: id },
      });
      await tx.socios.delete({
        where: { id_socio: id },
      });
      return { status: "success" };
    });
  },
};
