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
    return await db.$transaction(async (tx) => {
      // 1. Validar que el plan exista
      const plan = await tx.planes.findUnique({ where: { id_plan: parseInt(data.id_plan) } });
      if (!plan) throw new Error(`El plan con ID ${data.id_plan} no existe.`);

      // 2. Preparar la fecha de ingreso como base para los pagos
      const fechaIngreso = new Date(data.fecha_ingreso);

      // Creamos una base para las cuotas: mismo mes de ingreso, pero día 1
      const baseCuotas = new Date(fechaIngreso);
      baseCuotas.setDate(0);
      baseCuotas.setHours(0, 0, 0, 0);

      // 3. Crear el socio usando fecha_ingreso
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
      // 4. Generar pagos (-12 a +12 meses)
      const promesasPagos = [];
      for (let i = -12; i < 12; i++) {
        const fechaCuota = new Date(baseCuotas);
        fechaCuota.setMonth(fechaCuota.getMonth() + i);
        promesasPagos.push(
          tx.pagos.create({
            data: {
              id_socio: nuevoSocio.id_socio,
              id_plan: nuevoSocio.id_plan!,
              fecha_programada: fechaCuota,
              mes_correspondiente: fechaCuota,
              estado_pago: "Pendiente",
            },
          }),
        );
      }
      await Promise.all(promesasPagos);
      return nuevoSocio;
    });
  },
  // =================================================================
  // 4. update
  // =================================================================
  async update(id: number, data: any, actualizarFechaPago: boolean) {
    return await db.$transaction(async (tx) => {
      // A. Actualización de datos básicos
      const socioUpdate = await tx.socios.update({
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
      // B. Lógica de "actualizar_fecha_pago"
      if (actualizarFechaPago && data.nueva_fecha_ingreso) {
        const nuevaFecha = new Date(data.nueva_fecha_ingreso);
        const primerPago = await tx.pagos.findFirst({
          where: { id_socio: id },
          orderBy: { fecha_programada: "asc" },
        });
        if (primerPago) {
          await tx.pagos.update({
            where: { id_pago: primerPago.id_pago },
            data: { fecha_programada: nuevaFecha },
          });
        }
      }
      return socioUpdate;
    });
  },
  // =================================================================
  // 5. DELETE
  // =================================================================
  async delete(id: number) {
    return await db.$transaction(async (tx) => {
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
