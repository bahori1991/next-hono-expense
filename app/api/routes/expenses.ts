import { and, desc, eq, sum } from "drizzle-orm";
import { Hono } from "hono";
import { getUser } from "@/app/api/middlewares/getUser";
import { db } from "@/db";
import {
  expenses as expensesTable,
  insertExpenseSchema,
} from "@/lib/db/schemas/expenses";

export const expensesRoute = new Hono()
  .use("*", getUser)
  .get("/", async (c) => {
    const user = c.var.user;

    const expenses = await db
      .select()
      .from(expensesTable)
      .where(eq(expensesTable.userId, user.id))
      .orderBy(desc(expensesTable.createdAt))
      .limit(100);

    return c.json({ expenses });
  })
  .get("/:id{[0-9]+}", async (c) => {
    const user = c.var.user;
    const id = Number.parseInt(c.req.param("id"));

    const expense = await db
      .select()
      .from(expensesTable)
      .where(and(eq(expensesTable.userId, user.id), eq(expensesTable.id, id)))
      .limit(1)
      .then((res) => res[0]);

    if (!expense) {
      return c.notFound();
    }

    return c.json({ expense });
  })
  .get("/total-spent", async (c) => {
    const user = c.var.user;

    const total = await db
      .select({ total: sum(expensesTable.amount) })
      .from(expensesTable)
      .where(eq(expensesTable.userId, user.id))
      .then((res) => Number(res[0]?.total) ?? 0);

    return c.json({ total });
  })
  .post("/", async (c) => {
    const user = c.var.user;
    const body = await c.req.json();
    const parsedExpense = insertExpenseSchema.safeParse({
      ...body,
      userId: user.id,
    });

    if (!parsedExpense.success) {
      return c.json({ error: parsedExpense.error.message }, 400);
    }

    const result = await db
      .insert(expensesTable)
      .values(parsedExpense.data)
      .returning()
      .then((res) => res[0]);

    return c.json(result, 201);
  })
  .delete("/:id{[0-9]+}", async (c) => {
    const user = c.var.user;
    const id = Number.parseInt(c.req.param("id"));

    const expense = await db
      .delete(expensesTable)
      .where(and(eq(expensesTable.userId, user.id), eq(expensesTable.id, id)))
      .returning()
      .then((res) => res[0]);

    if (!expense) {
      return c.notFound();
    }

    return c.json({ expense }, 200);
  });
