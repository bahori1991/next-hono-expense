import { Hono } from "hono";
import {
  createExpenseSchema,
  type Expense,
} from "@/features/expenses/types/expenses";

export const fakeExpenses: Expense[] = [
  { id: 1, title: "Expense 1", amount: 100 },
  { id: 2, title: "Expense 2", amount: 200 },
  { id: 3, title: "Expense 3", amount: 300 },
];

export const expensesRoute = new Hono()
  .get("/", (c) => c.json({ expenses: fakeExpenses }))
  .get("/:id{[0-9]+}", (c) => {
    const id = Number.parseInt(c.req.param("id"));
    const expense = fakeExpenses.find((expense) => expense.id === id);

    if (!expense) {
      return c.notFound();
    }

    return c.json(expense);
  })
  .get("/total-spent", (c) => {
    const total = fakeExpenses.reduce(
      (acc, expense) => acc + expense.amount,
      0,
    );
    return c.json({ total });
  })
  .post("/", async (c) => {
    const body = await c.req.json();
    const parsedExpense = createExpenseSchema.safeParse(body);

    if (!parsedExpense.success) {
      return c.json({ error: parsedExpense.error.message }, 400);
    }

    const { data: expense } = parsedExpense;

    fakeExpenses.push({ ...expense, id: fakeExpenses.length + 1 });
    return c.json(expense, 201);
  })
  .delete("/:id{[0-9]+}", (c) => {
    const id = Number.parseInt(c.req.param("id"));
    const index = fakeExpenses.findIndex((expense) => expense.id === id);

    if (index === -1) {
      return c.notFound();
    }

    const deletedExpense = fakeExpenses.splice(index, 1)[0];
    return c.json({ expense: deletedExpense }, 200);
  });
