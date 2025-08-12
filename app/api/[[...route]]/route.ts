import { Hono } from "hono";
import { handle } from "hono/vercel";
import { authRoutes } from "@/server/routes/auth";
import { expensesRoute } from "@/server/routes/expenses";

const app = new Hono().basePath("/api");
const route = app.route("/auth", authRoutes).route("/expenses", expensesRoute);

export type AppType = typeof route;

export const GET = handle(app);
export const POST = handle(app);
export const PUT = handle(app);
export const DELETE = handle(app);
