import { getFormProps, getInputProps } from "@conform-to/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { UseCreateExpenseType } from "@/features/expenses/hooks/useCreateExpense";

export function CreateExpenseForm({
  form,
  fields,
  action,
  isPending,
}: UseCreateExpenseType) {
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
