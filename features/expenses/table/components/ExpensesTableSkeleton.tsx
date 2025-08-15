import { Skeleton } from "@/components/ui/skeleton";
import { TableCell, TableRow } from "@/components/ui/table";

export function ExpensesTableSkeleton() {
  return (
    <>
      {[0, 1, 2].map((i) => (
        <TableRow key={i}>
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
      ))}
    </>
  );
}
