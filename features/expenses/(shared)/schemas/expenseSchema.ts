import * as z from "zod";

export const expenseSchema = z.object({
  id: z.number().int().positive(),
  title: z
    .string({
      error: "Title is required",
    })
    .min(3, {
      error: "Title must be at least 3 characters",
    }),
  amount: z.coerce
    .number({
      error: "Amount must be a number",
    })
    .gt(0, {
      error: "Amount must be greater than 0",
    }),
});

export const createExpenseSchema = expenseSchema.omit({ id: true });

export type Expense = z.infer<typeof expenseSchema>;
