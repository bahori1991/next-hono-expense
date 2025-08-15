import type { Expense } from "@/features/expenses/(shared)/schemas/expenseSchema";

export type ExpensesTableProps = {
  expenses: Expense[];
  isPending: boolean;
};
