import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TotalExpenseValue } from "@/features/expenses/total/components/TotalExpenseValue";

export function TotalExpenseContainer() {
  return (
    <Card className="w-[400px] mx-auto mt-4">
      <CardHeader>
        <CardTitle>Total Spent</CardTitle>
        <CardDescription>
          The total amount of money you have spent
        </CardDescription>
      </CardHeader>
      <CardContent>
        <TotalExpenseValue />
      </CardContent>
    </Card>
  );
}
