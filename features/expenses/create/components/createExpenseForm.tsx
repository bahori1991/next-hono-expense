"use client";

import { useQueryClient } from "@tanstack/react-query";
import { redirect } from "next/navigation";
import { useActionState, useEffect } from "react";
import { toast } from "sonner";
import { Form } from "@/components/form/Form";
import { CalendarField } from "@/components/form/fields/CalendarField";
import { NumberField } from "@/components/form/fields/NumberField";
import { TextField } from "@/components/form/fields/TextField";
import { VStack } from "@/components/Stacks";
import { Button } from "@/components/ui/button";
import { createExpenseAction } from "@/features/expenses/create/actions/createExpenseAction";
import { createExpenseSchema } from "@/lib/db/schemas/expenses";
import { queryKeys } from "@/lib/queryKeys";

export function CreateExpenseForm() {
  const queryClient = useQueryClient();
  const [lastResult, action, isPending] = useActionState(
    createExpenseAction,
    undefined,
  );

  useEffect(() => {
    if (lastResult?.status === "success") {
      toast("A new expense has been created");
      queryClient.invalidateQueries({ queryKey: queryKeys.expenses.lists() });
      queryClient.invalidateQueries({ queryKey: queryKeys.expenses.total() });
      redirect(lastResult.redirectTo ?? "/expenses");
    } else if (lastResult?.status === "error") {
      toast("Error", {
        description: "Failed to create expense",
      });
    }
  }, [queryClient, lastResult]);

  return (
    <Form
      schema={createExpenseSchema}
      action={action}
      options={{ lastResult: lastResult?.submissionResult }}
      className="max-w-sm mt-4"
    >
      {({ fields }) => (
        <VStack className="gap-4">
          <TextField name={fields.title.name} label="Title" />
          <NumberField name={fields.amount.name} label="Amount" />
          <CalendarField
            name={fields.date.name}
            label="Date"
            className="mx-auto"
          />
          <Button type="submit" disabled={isPending}>
            {isPending ? "Creating..." : "Create"}
          </Button>
        </VStack>
      )}
    </Form>
  );
}
