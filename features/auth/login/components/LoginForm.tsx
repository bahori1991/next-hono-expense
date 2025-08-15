"use client";

import { getFormProps, getInputProps, useForm } from "@conform-to/react";
import { getZodConstraint, parseWithZod } from "@conform-to/zod/v4";
import { useQueryClient } from "@tanstack/react-query";
import { useActionState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { loginAction } from "@/features/auth/login/actions/loginAction";
import { loginSchema } from "@/features/auth/login/schemas/loginSchema";
import { queryKeys } from "@/lib/queryKeys";

export function LoginForm() {
  const queryClient = useQueryClient();
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

  useEffect(() => {
    if (!isPending) {
      queryClient.invalidateQueries({ queryKey: queryKeys.auth.me() });
    }
  }, [isPending, queryClient]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <Card className="max-w-md mx-auto mt-4 shadow-lg w-full">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            Login
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form
            action={action}
            {...getFormProps(form)}
            className="flex flex-col gap-4"
          >
            <div className="flex flex-col gap-2">
              <Label htmlFor={fields.email.id}>Email</Label>
              <Input {...getInputProps(fields.email, { type: "email" })} />
              <p className="text-red-500">{fields.email.errors}</p>
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor={fields.password.id}>Password</Label>
              <Input
                {...getInputProps(fields.password, { type: "password" })}
              />
              <p className="text-red-500">{fields.password.errors}</p>
            </div>
            <Button type="submit" disabled={isPending} className="mt-4">
              {isPending ? "..." : "Login"}
            </Button>
            <p className="text-red-500">{form.errors?.join(", ")}</p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
