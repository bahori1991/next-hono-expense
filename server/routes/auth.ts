import { Hono } from "hono";
import { cors } from "hono/cors";
import { env } from "@/lib/env";
import { auth } from "@/server/auth";
import { getUser } from "@/server/middlewares/getUser";

export const authRoutes = new Hono()
  .use(
    "*",
    cors({
      origin: env.NEXT_PUBLIC_APP_URL,
      allowHeaders: ["Content-Type", "Authorization"],
      allowMethods: ["GET", "POST", "PUT", "DELETE"],
      exposeHeaders: ["Content-Length"],
      maxAge: 600,
      credentials: true,
    }),
  )
  .on(["POST", "GET"], "/**", (c) => {
    return auth.handler(c.req.raw);
  })
  .get("/me", getUser, (c) => {
    return c.json(c.get("user"));
  });
