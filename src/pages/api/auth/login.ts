import type { APIRoute } from "astro";
import { db } from "../../../lib/db";

export const POST: APIRoute = async ({ request, cookies }) => {
  try {
    const { username, password } = await request.json();

    const user = await db.login.findUnique({
      where: { name: username },
    });

    if (user && user.password === password) {
      // Crear token simple
      const token = Buffer.from(`${username}:${Date.now()}`).toString("base64");

      // Guardar cookie de sesión
      cookies.set("auth-token", token, {
        path: "/",
        httpOnly: true,
        secure: false, // cambiá a true en producción con HTTPS
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 7, // 7 días
      });

      // NUEVO: Guardar también el nombre de usuario
      cookies.set("username", username, {
        path: "/",
        httpOnly: false, // false para poder leerlo en el cliente
        secure: false,
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 7,
      });

      return new Response(JSON.stringify({ success: true }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    } else {
      return new Response(JSON.stringify({ error: "Usuario o contraseña incorrectos" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
    }
  } catch (error) {
    return new Response(JSON.stringify({ error: "Error en el servidor" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};
