"use client";

import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { CreateExpenseForm } from "@/features/expenses/create/components/createExpenseForm";
import { useCreateExpenses } from "@/features/expenses/create/hooks/useCreateExpense";
import { queryKeys } from "@/lib/queryKeys";

export function CreateExpenseContainer() {
  const queryClient = useQueryClient();
  const { form, fields, action, isPending } = useCreateExpenses();

  useEffect(() => {
    if (!isPending) {
      queryClient.invalidateQueries({ queryKey: queryKeys.expenses.lists() });
      queryClient.invalidateQueries({ queryKey: queryKeys.expenses.total() });
    }
  }, [queryClient, isPending]);

  return (
    <CreateExpenseForm
      form={form}
      fields={fields}
      action={action}
      isPending={isPending}
    />
  );
}
