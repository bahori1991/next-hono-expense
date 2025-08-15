"use server";

import { parseWithZod } from "@conform-to/zod/v4";
import { redirect } from "next/navigation";
import { registerSchema } from "@/features/auth/register/schemas/registerSchema";
import { auth } from "@/lib/auth";

export async function registerAction(_: unknown, formData: FormData) {
  const submission = parseWithZod(formData, { schema: registerSchema });

  if (submission.status !== "success") {
    return submission.reply();
  }

  const { name, email, password } = submission.value;

  const res = await auth.api.signUpEmail({
    body: {
      name,
      email,
      password,
    },
    asResponse: true,
  });

  if (!res.ok) {
    return submission.reply({
      formErrors: ["Failed to register"],
    });
  }

  redirect("/");
}
