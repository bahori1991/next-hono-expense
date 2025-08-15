"use client";

import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { LoginForm } from "@/features/auth/login/components/LoginForm";
import { useUserLogin } from "@/features/auth/login/hooks/useUserLogin";
import { queryKeys } from "@/lib/queryKeys";

export function LoginContainer() {
  const { form, fields, action, isPending } = useUserLogin();
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!isPending) {
      queryClient.invalidateQueries({ queryKey: queryKeys.auth.me() });
    }
  }, [isPending, queryClient]);

  return (
    <LoginForm
      form={form}
      fields={fields}
      action={action}
      isPending={isPending}
    />
  );
}
