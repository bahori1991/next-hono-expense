"use client";

import { getFormProps, getInputProps } from "@conform-to/react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { UseUserLoginType } from "@/features/auth/hooks/useUserLogin";

export function LoginUI({ form, fields, action, isPending }: UseUserLoginType) {
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
