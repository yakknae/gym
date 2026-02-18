import type { APIRoute } from "astro";

export const POST: APIRoute = async ({ cookies }) => {
  // Eliminar la cookie de sesión
  cookies.delete("auth-token", {
    path: "/",
  });

  return new Response(JSON.stringify({ success: true }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
};
