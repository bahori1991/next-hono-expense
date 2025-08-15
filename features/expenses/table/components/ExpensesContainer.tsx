"use client";

import { ExpensesTable } from "@/features/expenses/table/components/ExpensesTable";
import { useExpenses } from "@/features/expenses/table/hooks/useExpenses";

export function ExpensesContainer() {
  const { expenses, isPending, isError, error } = useExpenses();

  if (isError) {
    return (
      <div>
        <h1>Error</h1>
        <p>An Error has occurred while fetching expenses</p>
        <p>{error?.message || "Failed to fetch expenses"}</p>
      </div>
    );
  }

  return <ExpensesTable isPending={isPending} expenses={expenses || []} />;
}
