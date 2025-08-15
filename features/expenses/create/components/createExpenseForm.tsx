import { getFormProps, getInputProps, useForm } from "@conform-to/react";
import { getZodConstraint, parseWithZod } from "@conform-to/zod/v4";
import { useQueryClient } from "@tanstack/react-query";
import { useActionState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createExpenseAction } from "@/features/expenses/create/actions/createExpenseAction";
import { createExpenseSchema } from "@/lib/db/schemas/expenses";
import { queryKeys } from "@/lib/queryKeys";

export function CreateExpenseForm() {
  const queryClient = useQueryClient();
  const [lastResult, action, isPending] = useActionState(
    createExpenseAction,
    undefined,
  );

  const [form, fields] = useForm({
    lastResult,
    constraint: getZodConstraint(createExpenseSchema),
    shouldValidate: "onBlur",
    shouldRevalidate: "onInput",
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: createExpenseSchema });
    },
  });

  useEffect(() => {
    if (!isPending) {
      queryClient.invalidateQueries({ queryKey: queryKeys.expenses.lists() });
      queryClient.invalidateQueries({ queryKey: queryKeys.expenses.total() });
    }
  }, [queryClient, isPending]);

  return (
    <div className="max-w-sm mx-auto mt-4">
      <form
        action={action}
        {...getFormProps(form)}
        className="flex flex-col gap-4"
      >
        <div className="flex flex-col gap-2">
          <Label htmlFor={fields.title.id}>Title</Label>
          <Input {...getInputProps(fields.title, { type: "text" })} />
          <p className="text-red-500">{fields.title.errors}</p>
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor={fields.amount.id}>Amount</Label>
          <Input {...getInputProps(fields.amount, { type: "number" })} />
          <p className="text-red-500">{fields.amount.errors}</p>
        </div>
        <Button type="submit" disabled={isPending} className="mt-4">
          {isPending ? "Creating..." : "Create"}
        </Button>
        <p className="text-red-500">{form.errors?.join(", ")}</p>
      </form>
    </div>
  );
}
