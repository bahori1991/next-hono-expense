import {
  Table,
  TableBody,
  TableCaption,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ExpensesTableRow } from "@/features/expenses/table/components/ExpensesTableRow";
import { ExpensesTableSkeleton } from "@/features/expenses/table/components/ExpensesTableSkeleton";
import type { Expense } from "@/lib/db/schemas/expenses";

export function ExpensesTable({
  expenses,
  isPending,
}: {
  expenses: Expense[];
  isPending: boolean;
}) {
  return (
    <Table className="max-w-lg mx-auto mt-4">
      <TableCaption>A list of all your expenses.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Id</TableHead>
          <TableHead className="w-[150px]">Date</TableHead>
          <TableHead>Title</TableHead>
          <TableHead className="w-[100px]">Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {isPending ? (
          <ExpensesTableSkeleton />
        ) : (
          expenses?.map((expense) => (
            <ExpensesTableRow key={expense.id} expense={expense} />
          ))
        )}
      </TableBody>
    </Table>
  );
}
