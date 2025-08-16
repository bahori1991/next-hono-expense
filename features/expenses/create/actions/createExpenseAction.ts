"use server";

import { parseWithZod } from "@conform-to/zod/v4";
import { createExpenseSchema } from "@/lib/db/schemas/expenses";
import { createHonoClient } from "@/lib/honoClient";

export async function createExpenseAction(_: unknown, formData: FormData) {
  const submission = parseWithZod(formData, { schema: createExpenseSchema });

  if (submission.status !== "success") {
    return { status: "error", submissionResult: submission.reply() };
  }

  const { title, amount, date } = submission.value;

  const client = await createHonoClient();
  const res = await client.api.expenses.$post({
    json: { title, amount, date },
  });

  if (!res.ok) {
    return {
      status: "error",
      submissionResult: submission.reply({
        formErrors: ["Failed to create expense", res.statusText],
      }),
    };
  }

  return {
    status: "success",
    submissionResult: submission.reply(),
    redirectTo: "/expenses",
  };
}
