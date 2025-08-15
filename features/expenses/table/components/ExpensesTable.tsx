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
import type { ExpensesTableProps } from "@/features/expenses/table/types/expenseTableType";

export function ExpensesTable({ expenses, isPending }: ExpensesTableProps) {
  return (
    <Table className="max-w-md mx-auto mt-4">
      <TableCaption>A list of all your expenses.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Id</TableHead>
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
