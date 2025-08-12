import * as z from "zod";

export const expenseSchema = z.object({
  id: z
    .number({
      error: "ID must be a number",
    })
    .int({
      error: "ID must be an integer",
    })
    .positive({
      error: "ID must be positive",
    }),
  title: z.string({
    error: "Title is required",
  }),
  amount: z.coerce
    .number({
      error: "Amount must be a number",
    })
    .min(0, {
      error: "Amount must be greater than 0",
    }),
});

export const createExpenseSchema = expenseSchema.omit({ id: true });

export type Expense = z.infer<typeof expenseSchema>;
