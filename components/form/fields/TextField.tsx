"use client";

import { getInputProps, useField } from "@conform-to/react";
import type { ComponentProps, Ref } from "react";
import { CustomFormControl } from "@/components/form/controls/CustomFormControl";
import type { FieldProps } from "@/components/form/types";
import { getFieldErrorProps } from "@/components/form/utils";
import { Input } from "@/components/ui/input";

interface TextFieldProps
  extends FieldProps<string>,
    Omit<ComponentProps<typeof Input>, "name"> {
  ref?: Ref<HTMLInputElement>;
}

/**
 * Text Field Component
 * @param props - properties of the input element
 */
export function TextField({
  name = "",
  label,
  helperMessage,
  ...props
}: TextFieldProps) {
  const [fieldMeta] = useField(name);

  return (
    <CustomFormControl
      {...{ label, helperMessage }}
      {...getFieldErrorProps(fieldMeta)}
    >
      <Input
        {...props}
        {...getInputProps(fieldMeta, { type: "text" })}
        key={fieldMeta.key}
      />
    </CustomFormControl>
  );
}
