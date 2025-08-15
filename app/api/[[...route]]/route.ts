import { Hono } from "hono";
import { handle } from "hono/vercel";
import { authRoutes } from "@/app/api/routes/auth";
import { expensesRoute } from "@/app/api/routes/expenses";

const app = new Hono().basePath("/api");
const route = app.route("/auth", authRoutes).route("/expenses", expensesRoute);

export type AppType = typeof route;

export const GET = handle(app);
export const POST = handle(app);
export const PUT = handle(app);
export const DELETE = handle(app);
