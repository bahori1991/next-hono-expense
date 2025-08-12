import { Suspense } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export function ExpensesTable({
  ExpensesTableBody,
  ExpensesTableSkeleton,
}: {
  ExpensesTableBody: React.ReactNode;
  ExpensesTableSkeleton: React.ReactNode;
}) {
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
        <Suspense fallback={ExpensesTableSkeleton}>
          {ExpensesTableBody}
        </Suspense>
      </TableBody>
    </Table>
  );
}
