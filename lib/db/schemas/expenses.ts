import {
  index,
  integer,
  numeric,
  sqliteTable,
  text,
} from "drizzle-orm/sqlite-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import z from "zod";

export const expenses = sqliteTable(
  "expenses",
  {
    id: integer("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
    userId: text("user_id").notNull(),
    title: text("title").notNull(),
    amount: numeric("amount", { mode: "number" }).notNull(),
    date: integer("date", { mode: "timestamp" }).notNull(),
    createdAt: integer("created_at", { mode: "timestamp" })
      .$defaultFn(() => new Date())
      .notNull(),
    updatedAt: integer("updated_at", { mode: "timestamp" })
      .$onUpdate(() => new Date())
      .notNull(),
  },
  (expenses) => [index("user_id_index").on(expenses.userId)],
);

export const insertExpenseSchema = createInsertSchema(expenses, {
  title: z.string({ error: "Title is required" }).min(3, {
    error: "Title must be at least 3 characters",
  }),
  amount: z.coerce.number({ error: "Amount must be a number" }).gt(0, {
    error: "Amount must be greater than 0",
  }),
  date: z.coerce.date({ error: "Please select a date from the calendar" }),
});

export const createExpenseSchema = insertExpenseSchema.omit({
  id: true,
  userId: true,
  createdAt: true,
  updatedAt: true,
});

export const selectExpenseSchema = createSelectSchema(expenses);

const expenseSchema = selectExpenseSchema.omit({
  createdAt: true,
  updatedAt: true,
});

export type Expense = z.infer<typeof expenseSchema>;
