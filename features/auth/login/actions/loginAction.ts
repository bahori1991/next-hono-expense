"use server";

import { parseWithZod } from "@conform-to/zod/v4";
import { redirect } from "next/navigation";
import { loginSchema } from "@/features/auth/login/schemas/loginSchema";
import { auth } from "@/server/auth";

export async function loginAction(_: unknown, formData: FormData) {
  const submission = parseWithZod(formData, { schema: loginSchema });

  if (submission.status !== "success") {
    return submission.reply();
  }

  const { email, password } = submission.value;

  const res = await auth.api.signInEmail({
    body: { email, password },
    asResponse: true,
  });

  if (!res.ok) {
    return submission.reply({
      formErrors: ["Invalid email or password"],
    });
  }

  redirect("/");
}
