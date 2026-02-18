# Sistema de Gestión de gimnasio

> Una solución moderna, rápida y estética para la administración de gimnasios.

![Astro](https://img.shields.io/badge/Astro-0C0F14?style=for-the-badge&logo=astro&logoColor=FF5D01)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)

##  Vista Previa

| 🔐 Iniciar Sesión | 📋 Planilla de Asistencias |
| :---: | :---: |
| ![Login](https://private-user-images.githubusercontent.com/168212448/551813154-c8bee0ca-0d7b-4588-bfdb-62a8605cf99c.png?jwt=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3NzE0NTU2OTgsIm5iZiI6MTc3MTQ1NTM5OCwicGF0aCI6Ii8xNjgyMTI0NDgvNTUxODEzMTU0LWM4YmVlMGNhLTBkN2ItNDU4OC1iZmRiLTYyYTg2MDVjZjk5Yy5wbmc_WC1BbXotQWxnb3JpdGhtPUFXUzQtSE1BQy1TSEEyNTYmWC1BbXotQ3JlZGVudGlhbD1BS0lBVkNPRFlMU0E1M1BRSzRaQSUyRjIwMjYwMjE4JTJGdXMtZWFzdC0xJTJGczMlMkZhd3M0X3JlcXVlc3QmWC1BbXotRGF0ZT0yMDI2MDIxOFQyMjU2MzhaJlgtQW16LUV4cGlyZXM9MzAwJlgtQW16LVNpZ25hdHVyZT0yMmE4MDQ0YTc5NGRiOWQzZTU1ZDU1MzI4NWEyOWIxOTMxMTlkODQ0ZTQ4MzFjMTI1OGQwM2Y3ZGRkNzQ4ZGU4JlgtQW16LVNpZ25lZEhlYWRlcnM9aG9zdCJ9.Ejk9OHa9HKCm4SUnmy4UMyoACaOksUeTF54mPQQrJsk) | ![Planilla](https://private-user-images.githubusercontent.com/168212448/551813157-05a1fecd-c33f-40a1-94d9-28bddc51f9b2.png?jwt=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3NzE0NTU2OTgsIm5iZiI6MTc3MTQ1NTM5OCwicGF0aCI6Ii8xNjgyMTI0NDgvNTUxODEzMTU3LTA1YTFmZWNkLWMzM2YtNDBhMS05NGQ5LTI4YmRkYzUxZjliMi5wbmc_WC1BbXotQWxnb3JpdGhtPUFXUzQtSE1BQy1TSEEyNTYmWC1BbXotQ3JlZGVudGlhbD1BS0lBVkNPRFlMU0E1M1BRSzRaQSUyRjIwMjYwMjE4JTJGdXMtZWFzdC0xJTJGczMlMkZhd3M0X3JlcXVlc3QmWC1BbXotRGF0ZT0yMDI2MDIxOFQyMjU2MzhaJlgtQW16LUV4cGlyZXM9MzAwJlgtQW16LVNpZ25hdHVyZT04MzljYTg5ZTk1MGNiMmE4YmUyZDRkMzYzNjJlZmFkZTNmNWFmMWY4YjM3M2NmZjlmNjZiOWM0NzAzNTY2MWFmJlgtQW16LVNpZ25lZEhlYWRlcnM9aG9zdCJ9.boDlFd1MtzjnT_uVRZA_ZatRXza_6YGAzpsa0BuhMFo) |

### 📊 Dashboard de Control
![Dashboard](https://private-user-images.githubusercontent.com/168212448/551813156-adbe18b8-4285-4100-b195-0938d774a6ee.png?jwt=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3NzE0NTU2OTgsIm5iZiI6MTc3MTQ1NTM5OCwicGF0aCI6Ii8xNjgyMTI0NDgvNTUxODEzMTU2LWFkYmUxOGI4LTQyODUtNDEwMC1iMTk1LTA5MzhkNzc0YTZlZS5wbmc_WC1BbXotQWxnb3JpdGhtPUFXUzQtSE1BQy1TSEEyNTYmWC1BbXotQ3JlZGVudGlhbD1BS0lBVkNPRFlMU0E1M1BRSzRaQSUyRjIwMjYwMjE4JTJGdXMtZWFzdC0xJTJGczMlMkZhd3M0X3JlcXVlc3QmWC1BbXotRGF0ZT0yMDI2MDIxOFQyMjU2MzhaJlgtQW16LUV4cGlyZXM9MzAwJlgtQW16LVNpZ25hdHVyZT05ZGQ1ZTc0OTNkNDk1OGQwNzE3NmFiOTc3OGZlYmY4NDQ1MDQ0NDY2YWUxNGVmMmFjNGVmM2JmZmM5ZGNhZmEwJlgtQW16LVNpZ25lZEhlYWRlcnM9aG9zdCJ9.TwJdW5nDsLope1MRlYHfxcyEAZqZgEGY1cBaue3kZmQ)

### 🎥 Demo en Funcionamiento
![Demo Gif](https://private-user-images.githubusercontent.com/168212448/551813152-ce8d4e64-6fda-49bd-ab43-e6552509be40.gif?jwt=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3NzE0NTU2OTgsIm5iZiI6MTc3MTQ1NTM5OCwicGF0aCI6Ii8xNjgyMTI0NDgvNTUxODEzMTUyLWNlOGQ0ZTY0LTZmZGEtNDliZC1hYjQzLWU2NTUyNTA5YmU0MC5naWY_WC1BbXotQWxnb3JpdGhtPUFXUzQtSE1BQy1TSEEyNTYmWC1BbXotQ3JlZGVudGlhbD1BS0lBVkNPRFlMU0E1M1BRSzRaQSUyRjIwMjYwMjE4JTJGdXMtZWFzdC0xJTJGczMlMkZhd3M0X3JlcXVlc3QmWC1BbXotRGF0ZT0yMDI2MDIxOFQyMjU2MzhaJlgtQW16LUV4cGlyZXM9MzAwJlgtQW16LVNpZ25hdHVyZT1lMWJmZjRkZmJhMzY5NGRmZWRhMDMwNTdiNTQ3ZTU1YjRhZjcxMmY4ZGU5OTZmOTBjNGZjNTMyMThlMDdhN2FhJlgtQW16LVNpZ25lZEhlYWRlcnM9aG9zdCJ9.9A7EwpknXNcR2EQceuwERIaU7FIfWXuBD75ohrebg1k)

## Características Principales

- Registro Instantáneo: Marcación de asistencias con validación en tiempo real.

- Interfaz Premium: Diseño "Dark Mode" optimizado para reducir la fatiga visual.

- Gestión de Socios: Control total sobre planes, obras sociales y estados de cuotas.

- Precisión Horaria: Manejo inteligente de zonas horarias para registros exactos (UTC-3 Argentina).

## Stack Tecnológico

- Astro: Para lograr una carga instantánea y una excelente experiencia de desarrollador.

- Tailwind CSS: Diseño responsivo y estilizado sin sacrificar rendimiento.

- Prisma ORM: Modelado de datos robusto y consultas seguras a la base de datos.

- SQLite/PostgreSQL: Persistencia de datos confiable.


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
