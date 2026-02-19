# Sistema de Gestión de gimnasio

> Una solución moderna, rápida y estética para la administración de gimnasios.

![Astro](https://img.shields.io/badge/Astro-0C0F14?style=for-the-badge&logo=astro&logoColor=FF5D01)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![MySql](https://img.shields.io/badge/mysql-007ACC?style=for-the-badge&logo=mysql&logoColor=white)

## Vista Previa

|              Planilla               |                Dashboard                 |
| :---------------------------------: | :--------------------------------------: |
| ![Login](/public/docs/planilla.png) | ![Dashboard](/public/docs/dashboard.png) |

### Demo en Funcionamiento

![Demo Gif](/public/docs/demo.gif)

## Características Principales

- **Dashboard de Control:** Panel centralizado con indicadores visuales clave y métricas en tiempo real para una visualizacion global del estado del gimnasio y la concurrencia.
- **Gestión Integral de Socios (ABM):** Control total de altas, bajas y modificaciones de socios.
- **Control de Cobros Mensuales:** Sistema para administrar el estado de pagos y vencimientos de cada socio de forma eficiente.
- **Planes y Obras Sociales:** Gestión de diferentes planes de entrenamiento y categorías de obras sociales.
- **Registro de Asistencias:** Interfaz para el alta de ingresos, vinculando automáticamente al socio con su horario de entrada.

## Instalación

```bash
# Clonar el proyecto
 git clone ...

# Instalar dependencias
 npm install

# Configurar base de datos
 npx prisma generate
 npx prisma db push

# Correr en local
 npm run dev
```

## Configuración del Entorno (.env)

Para que el proyecto se conecte correctamente a la base de datos es necesario crear un archivo .env en la raíz del proyecto.

```bash
DATABASE_URL="mysql://user:password@localhost:port/db_name"
```
