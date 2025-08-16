"use server";

import { parseWithZod } from "@conform-to/zod/v4";
import { redirect } from "next/navigation";
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

  redirect("/expenses");
}

// export async function createExpenseAction(_: unknown, formData: FormData) {
//   const client = await createHonoClient();
//   const submission = parseWithZod(formData, { schema: createExpenseSchema });

//   if (submission.status !== "success") {
//     return submission.reply();
//   }

//   const { title, amount } = submission.value;

//   const res = await client.api.expenses.$post({
//     json: {
//       title,
//       amount,
//     },
//   });

//   if (!res.ok) {
//     return submission.reply({
//       formErrors: ["Failed to create expense", res.statusText],
//     });
//   }

//   redirect("/expenses");
// }
