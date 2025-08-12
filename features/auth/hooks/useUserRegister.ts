import { useForm } from "@conform-to/react";
import { getZodConstraint, parseWithZod } from "@conform-to/zod/v4";
import { useActionState } from "react";
import { registerAction } from "@/features/auth/actions/registerAction";
import { registerSchema } from "@/features/auth/types/registerType";

export function useUserRegister() {
  const [lastResult, action, isPending] = useActionState(
    registerAction,
    undefined,
  );

  const [form, fields] = useForm({
    lastResult,
    constraint: getZodConstraint(registerSchema),
    shouldValidate: "onBlur",
    shouldRevalidate: "onInput",
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: registerSchema });
    },
  });

  return {
    form,
    fields,
    action,
    isPending,
  };
}

export type UseUserRegisterType = ReturnType<typeof useUserRegister>;
