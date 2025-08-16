"use client";

import {
  type FormMetadata,
  FormProvider,
  FormStateInput,
  getFormProps,
  useForm,
} from "@conform-to/react";
import { getZodConstraint, parseWithZod } from "@conform-to/zod/v4";
import type { ComponentProps, JSX, ReactNode } from "react";
import { type ZodType, z } from "zod";

interface UseFormReturn<
  TInput extends Record<string, unknown>,
  TOutput extends Record<string, unknown>,
> extends ReturnType<typeof useForm<TInput, TOutput, string[]>> {}

interface FormMeta<
  TInput extends Record<string, unknown>,
  TOutput extends Record<string, unknown>,
> {
  form: FormMetadata<TInput, string[]>;
  fields: UseFormReturn<TInput, TOutput>[1];
}

function useCustomForm<
  TInput extends Record<string, unknown>,
  TOutput extends Record<string, unknown>,
>(
  schema: ZodType<TOutput, TInput>,
  options: Parameters<typeof useForm<TInput, TOutput, string[]>>[0] = {},
): FormMeta<TInput, TOutput> {
  const {
    shouldValidate = "onBlur",
    shouldRevalidate = "onInput",
    constraint = getZodConstraint(schema),
    onValidate = ({ formData }) => parseWithZod(formData, { schema }),
    ...rest
  } = options;

  const [form, fields] = useForm<TInput, TOutput, string[]>({
    shouldValidate,
    shouldRevalidate,
    constraint,
    onValidate,
    ...rest,
  });

  return { form, fields };
}

interface FormProps<
  TInput extends Record<string, unknown>,
  TOutput extends Record<string, unknown>,
> extends Omit<
    ComponentProps<"form">,
    | keyof ReturnType<typeof getFormProps>
    | "children"
    | "color"
    | "content"
    | "translate"
  > {
  schema?: ZodType<TInput>;
  options?: NoInfer<Parameters<typeof useForm<TInput>>[0]>;
  children?: ((props: FormMeta<TInput, TOutput>) => ReactNode) | ReactNode;
}

export function Form<
  TInput extends Record<string, unknown>,
  TOutput extends Record<string, unknown>,
>({
  schema,
  options,
  children,
  ...props
}: FormProps<TInput, TOutput>): JSX.Element {
  const { form, fields } = useCustomForm(
    // biome-ignore lint/suspicious/noExplicitAny: no schema provided
    schema ?? (z.object({}) as any),
    options,
  );

  return (
    <FormProvider context={form.context}>
      <form {...props} {...getFormProps(form)}>
        {typeof children === "function" ? children({ form, fields }) : children}
      </form>
      <div className="text-red-500">{form.errors?.join(", ")}</div>
      <FormStateInput />
    </FormProvider>
  );
}
