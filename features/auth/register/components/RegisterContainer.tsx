"use client";

import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { RegisterForm } from "@/features/auth/register/components/RegisterForm";
import { useUserRegister } from "@/features/auth/register/hooks/useUserRegister";
import { queryKeys } from "@/lib/queryKeys";

export function RegisterContainer() {
  const queryClient = useQueryClient();
  const { form, fields, action, isPending } = useUserRegister();

  useEffect(() => {
    if (!isPending) {
      queryClient.invalidateQueries({ queryKey: queryKeys.auth.me() });
    }
  }, [isPending, queryClient]);

  return (
    <RegisterForm
      form={form}
      fields={fields}
      action={action}
      isPending={isPending}
    />
  );
}
