"use client";

import { useUserLogin } from "@/features/auth/hooks/useUserLogin";
import { LoginUI } from "@/features/auth/ui/loginUI";

export function LoginContainer() {
  const { form, fields, action, isPending } = useUserLogin();

  return (
    <LoginUI
      form={form}
      fields={fields}
      action={action}
      isPending={isPending}
    />
  );
}
