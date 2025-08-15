"use client";

import Link from "next/link";
import { useTotalExpense } from "@/features/expenses/total/hooks/useTotalExpense";

export function TotalExpenseValue() {
  const { total, isPending, isError, error } = useTotalExpense();

  if (isPending) return <div>Loading...</div>;
  if (isError) return <Link href="/login">Please login to view this page</Link>;

  return <p>{total}</p>;
}
