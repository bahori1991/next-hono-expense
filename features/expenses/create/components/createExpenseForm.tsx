"use client";

import { useQueryClient } from "@tanstack/react-query";
import { useActionState, useEffect } from "react";
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
    if (!isPending) {
      queryClient.invalidateQueries({ queryKey: queryKeys.expenses.lists() });
      queryClient.invalidateQueries({ queryKey: queryKeys.expenses.total() });
    }
  }, [queryClient, isPending]);

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
