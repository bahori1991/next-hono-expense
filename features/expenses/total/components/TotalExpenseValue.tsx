"use client";

import { useTotalExpense } from "@/features/expenses/total/hooks/useTotalExpense";

export function TotalExpenseValue() {
  const { total, isPending, isError, error } = useTotalExpense();

  if (isPending) return <div>Loading...</div>;
  if (isError) return <div>Error: {error?.message}</div>;

  return <p>{total}</p>;
}
