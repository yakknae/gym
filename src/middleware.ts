import { defineMiddleware } from "astro:middleware";

export const onRequest = defineMiddleware(async (context, next) => {
  const { url, cookies, redirect } = context;

  // Rutas públicas que no requieren autenticación
  const publicRoutes = ["/login", "/api/auth/login"];

  // Si es una ruta pública, continuar sin verificar
  if (publicRoutes.some((route) => url.pathname.startsWith(route))) {
    return next();
  }

  // Verificar si hay token de autenticación
  const token = cookies.get("auth-token");

  if (!token) {
    return redirect("/login");
  }

  // Si hay token, permitir acceso
  return next();
});
