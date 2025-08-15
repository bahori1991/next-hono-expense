import { TableCell, TableRow } from "@/components/ui/table";
import type { Expense } from "@/features/expenses/(shared)/schemas/expenseSchema";

export function ExpensesTableRow({ expense }: { expense: Expense }) {
  return (
    <TableRow>
      <TableCell>{expense.id}</TableCell>
      <TableCell>{expense.title}</TableCell>
      <TableCell>{expense.amount}</TableCell>
    </TableRow>
  );
}
