"use server";

import { parseWithZod } from "@conform-to/zod/v4";
import { redirect } from "next/navigation";
import { createExpenseSchema } from "@/features/expenses/(shared)/schemas/expenseSchema";
import { createHonoClient } from "@/lib/honoClient";

export async function createExpenseAction(_: unknown, formData: FormData) {
  const client = await createHonoClient();
  const submission = parseWithZod(formData, { schema: createExpenseSchema });

  if (submission.status !== "success") {
    return submission.reply();
  }

  const { title, amount } = submission.value;

  const res = await client.api.expenses.$post({
    json: {
      title,
      amount,
    },
  });

  if (!res.ok) {
    return submission.reply({
      formErrors: ["Failed to create expense", res.statusText],
    });
  }

  redirect("/expenses");
}
