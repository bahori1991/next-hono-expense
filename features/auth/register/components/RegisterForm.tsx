"use client";

import { getFormProps, getInputProps, useForm } from "@conform-to/react";
import { getZodConstraint, parseWithZod } from "@conform-to/zod/v4";
import { useQueryClient } from "@tanstack/react-query";
import { useActionState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { registerAction } from "@/features/auth/register/actions/registerAction";
import { registerSchema } from "@/features/auth/register/schemas/registerSchema";
import { queryKeys } from "@/lib/queryKeys";

export function RegisterForm() {
  const queryClient = useQueryClient();
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
            Register
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form
            action={action}
            {...getFormProps(form)}
            className="flex flex-col gap-4"
          >
            <div className="flex flex-col gap-2">
              <Label htmlFor={fields.name.id}>Name</Label>
              <Input {...getInputProps(fields.name, { type: "text" })} />
              <p className="text-red-500">{fields.name.errors}</p>
            </div>
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
              {isPending ? "..." : "Register"}
            </Button>
            <p className="text-red-500">{form.errors?.join(", ")}</p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
