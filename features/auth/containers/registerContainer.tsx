"use client";

import { useUserRegister } from "@/features/auth/hooks/useUserRegister";
import { RegisterUI } from "@/features/auth/ui/registerUI";

export function RegisterContainer() {
  const { form, fields, action, isPending } = useUserRegister();

  return (
    <RegisterUI
      form={form}
      fields={fields}
      action={action}
      isPending={isPending}
    />
  );
}
