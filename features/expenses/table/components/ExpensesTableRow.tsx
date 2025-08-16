import { TableCell, TableRow } from "@/components/ui/table";
import type { Expense } from "@/lib/db/schemas/expenses";

export function ExpensesTableRow({ expense }: { expense: Expense }) {
  return (
    <TableRow>
      <TableCell>{expense.id}</TableCell>
      <TableCell>{expense.date.toLocaleDateString()}</TableCell>
      <TableCell>{expense.title}</TableCell>
      <TableCell>{expense.amount}</TableCell>
    </TableRow>
  );
}
