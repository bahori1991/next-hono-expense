import { useForm } from "@conform-to/react";
import { getZodConstraint, parseWithZod } from "@conform-to/zod/v4";
import { useActionState } from "react";
import { createExpenseSchema } from "@/features/expenses/(shared)/schemas/expenseSchema";
import { createExpenseAction } from "@/features/expenses/create/actions/createExpenseAction";

export function useCreateExpenses() {
  const [lastResult, action, isPending] = useActionState(
    createExpenseAction,
    undefined,
  );
  const [form, fields] = useForm({
    lastResult,
    constraint: getZodConstraint(createExpenseSchema),
    shouldValidate: "onBlur",
    shouldRevalidate: "onInput",
    onValidate: ({ formData }) => {
      return parseWithZod(formData, { schema: createExpenseSchema });
    },
  });

  return {
    form,
    fields,
    action,
    isPending,
  };
}

export type UseCreateExpenseType = ReturnType<typeof useCreateExpenses>;
