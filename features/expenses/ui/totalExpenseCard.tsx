import { Suspense } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function TotalExpenseCard({ children }: { children: React.ReactNode }) {
  return (
    <Card className="w-[400px] mx-auto mt-4">
      <CardHeader>
        <CardTitle>Total Spent</CardTitle>
        <CardDescription>
          The total amount of money you have spent
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
      </CardContent>
    </Card>
  );
}
