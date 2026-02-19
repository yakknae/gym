import { db } from "../lib/db";
import type { Prisma } from "@prisma/client";

export const pagoService = {
  // =================================================================
  // 1. Obtener todos los pagos
  // =================================================================
  async getAll() {
    return await db.pagos.findMany({
      include: {
        socios: true,
        planes: true,
      },
      orderBy: [{ fecha_programada: "desc" }, { id_socio: "asc" }],
    });
  },

  // =================================================================
  // 2. Obtener pagos por estado
  // =================================================================
  async getByEstado(estado: string) {
    return await db.pagos.findMany({
      where: {
        estado_pago: estado,
      },
      include: {
        socios: true,
        planes: true,
      },
      orderBy: [{ fecha_programada: "desc" }, { id_socio: "asc" }],
    });
  },

  // =================================================================
  // 3. Obtener pagos pendientes (fecha programada <= hoy)
  // =================================================================
  async getPendientes() {
    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);

    return await db.pagos.findMany({
      where: {
        estado_pago: "Pendiente",
        fecha_programada: {
          gte: hoy,
        },
      },
      include: {
        socios: true,
        planes: true,
      },
      orderBy: [{ fecha_programada: "asc" }, { id_socio: "asc" }],
    });
  },

  // =================================================================
  // 4. Obtener pagos vencidos (pendientes con fecha pasada)
  // =================================================================
  async getVencidos() {
    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);

    return await db.pagos.findMany({
      where: {
        estado_pago: "Pendiente",
        fecha_programada: {
          lt: hoy,
        },
      },
      include: {
        socios: true,
        planes: true,
      },
      orderBy: [{ fecha_programada: "asc" }],
    });
  },

  // =================================================================
  // 5. Obtener historial (todos los pagos ordenados por fecha)
  // =================================================================
  async getHistorial() {
    return await db.pagos.findMany({
      include: {
        socios: true,
        planes: true,
      },
      orderBy: [{ fecha_programada: "desc" }, { fecha_pago: "desc" }],
    });
  },

  // =================================================================
  // 6. Obtener pagos por socio
  // =================================================================
  async getBySocio(idSocio: number) {
    return await db.pagos.findMany({
      where: {
        id_socio: idSocio,
      },
      include: {
        socios: true,
        planes: true,
      },
      orderBy: { fecha_programada: "desc" },
    });
  },

  // =================================================================
  // 7. Obtener pago por ID
  // =================================================================
  async getById(id: number) {
    return await db.pagos.findUnique({
      where: { id_pago: id },
      include: {
        socios: true,
        planes: true,
      },
    });
  },

  // =================================================================
  // 8. Marcar pago como pagado
  // =================================================================
  async marcarComoPagado(id: number) {
    return await db.pagos.update({
      where: { id_pago: id },
      data: {
        estado_pago: "Pagado",
        fecha_pago: new Date(),
      },
    });
  },

  // =================================================================
  // 9. Actualizar estado de pago
  // =================================================================
  async updateEstado(id: number, estado: string, fechaPago?: Date) {
    return await db.pagos.update({
      where: { id_pago: id },
      data: {
        estado_pago: estado,
        fecha_pago: fechaPago || (estado === "Pagado" ? new Date() : null),
      },
    });
  },

  // =================================================================
  // 10. Obtener estadísticas de pagos
  // =================================================================
  async getEstadisticas() {
    const total = await db.pagos.count();
    const pagados = await db.pagos.count({ where: { estado_pago: "Pagado" } });
    const pendientes = await db.pagos.count({ where: { estado_pago: "Pendiente" } });

    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);

    const vencidos = await db.pagos.count({
      where: {
        estado_pago: "Pendiente",
        fecha_programada: { lt: hoy },
      },
    });

    return {
      total,
      pagados,
      pendientes,
      vencidos,
    };
  },

  // =================================================================
  // 11. Filtrar pagos por fecha y estado
  // =================================================================
  async filtrar(filters: { estado?: string; fechaDesde?: Date; fechaHasta?: Date; idSocio?: number }) {
    const where: Prisma.pagosWhereInput = {};

    if (filters.estado) {
      where.estado_pago = filters.estado;
    }

    if (filters.fechaDesde || filters.fechaHasta) {
      where.fecha_programada = {};
      if (filters.fechaDesde) {
        where.fecha_programada.gte = filters.fechaDesde;
      }
      if (filters.fechaHasta) {
        where.fecha_programada.lte = filters.fechaHasta;
      }
    }

    if (filters.idSocio) {
      where.id_socio = filters.idSocio;
    }

    return await db.pagos.findMany({
      where,
      include: {
        socios: true,
        planes: true,
      },
      orderBy: { fecha_programada: "desc" },
    });
  },
  // Generar pago del mes actual para un socio
  async generarPagoMesActual(idSocio: number): Promise<boolean> {
    const socio = await db.socios.findUnique({
      where: { id_socio: idSocio },
    });

    if (!socio || socio.estado !== "Activo") return false;

    const hoy = new Date();
    const año = hoy.getFullYear();
    const mes = hoy.getMonth() + 1;

    const existe = await db.$queryRaw<Array<{ count: bigint }>>`
    SELECT COUNT(*) as count 
    FROM pagos 
    WHERE id_socio = ${idSocio} 
    AND YEAR(mes_correspondiente) = ${año}
    AND MONTH(mes_correspondiente) = ${mes}
  `;

    const count = Number(existe[0]?.count || 0);

    if (count === 0) {
      const primerDiaMes = new Date(año, mes - 1, 1);

      await db.pagos.create({
        data: {
          id_socio: idSocio,
          id_plan: socio.id_plan!,
          fecha_programada: primerDiaMes,
          mes_correspondiente: primerDiaMes,
          estado_pago: "Pendiente",
        },
      });

      return true; // ← Se creó
    }

    return false; // ← Ya existía
  },

  // Generar pagos del mes actual para TODOS los socios activos
  async generarPagosMesActualParaTodos() {
    const socios = await db.socios.findMany({
      where: { estado: "Activo" },
    });

    let generados = 0;

    for (const socio of socios) {
      const seCreo = await this.generarPagoMesActual(socio.id_socio);
      if (seCreo) generados++;
    }

    return {
      total: socios.length,
      generados,
      yaExistian: socios.length - generados,
    };
  },
};
