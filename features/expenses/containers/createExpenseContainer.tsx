"use client";

import { useCreateExpenses } from "@/features/expenses/hooks/useCreateExpense";
import { CreateExpenseForm } from "@/features/expenses/ui/createExpenseForm";

export function CreateExpenseContainer() {
  const { form, fields, action, isPending } = useCreateExpenses();

  return (
    <CreateExpenseForm
      form={form}
      fields={fields}
      action={action}
      isPending={isPending}
    />
  );
}
