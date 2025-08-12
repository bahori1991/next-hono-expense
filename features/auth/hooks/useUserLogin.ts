import { useForm } from "@conform-to/react";
import { getZodConstraint, parseWithZod } from "@conform-to/zod/v4";
import { useActionState } from "react";
import { loginAction } from "@/features/auth/actions/loginAction";
import { loginSchema } from "@/features/auth/types/loginType";

export function useUserLogin() {
  const [lastResult, action, isPending] = useActionState(
    loginAction,
    undefined,
  );
  const [form, fields] = useForm({
    lastResult,
    constraint: getZodConstraint(loginSchema),
    shouldValidate: "onBlur",
    shouldRevalidate: "onInput",
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: loginSchema });
    },
  });

  return {
    form,
    fields,
    action,
    isPending,
  };
}

export type UseUserLoginType = ReturnType<typeof useUserLogin>;
