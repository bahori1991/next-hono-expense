import { Skeleton } from "@/components/ui/skeleton";
import { TableCell, TableRow } from "@/components/ui/table";
import { ExpensesTable } from "@/features/expenses/ui/expensesTable";
import { createHonoClient } from "@/lib/client";

async function ExpensesTableBody() {
  const client = await createHonoClient();
  const res = await client.api.expenses.$get();
  const { expenses } = await res.json();

  return expenses.map((expense) => (
    <TableRow key={expense.id}>
      <TableCell>{expense.id}</TableCell>
      <TableCell>{expense.title}</TableCell>
      <TableCell>{expense.amount}</TableCell>
    </TableRow>
  ));
}

async function ExpensesTableSkeleton() {
  return [0, 1, 2].map((val) => (
    <TableRow key={val}>
      <TableCell>
        <Skeleton className="h-4" />
      </TableCell>
      <TableCell>
        <Skeleton className="h-4" />
      </TableCell>
      <TableCell>
        <Skeleton className="h-4" />
      </TableCell>
    </TableRow>
  ));
}

export function ExpensesTableContainer() {
  return (
    <ExpensesTable
      ExpensesTableBody={<ExpensesTableBody />}
      ExpensesTableSkeleton={<ExpensesTableSkeleton />}
    />
  );
}
