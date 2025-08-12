import { Hono } from "hono";
import { auth } from "@/server/auth";

export const authRoutes = new Hono()
  .on(["POST", "GET"], "/**", (c) => {
    return auth.handler(c.req.raw);
  })
  .get("/me", async (c) => {
    const session = await auth.api.getSession({
      headers: c.req.raw.headers,
    });

    if (!session) {
      return c.json({ error: "Unauthorized" }, 401);
    }

    return c.json(session.user);
  });
