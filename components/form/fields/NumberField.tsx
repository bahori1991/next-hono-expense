import { getInputProps, useField } from "@conform-to/react";
import type { ComponentProps } from "react";
import { CustomFormControl } from "@/components/form/controls/CustomFormControl";
import type { FieldProps } from "@/components/form/types";
import { getFieldErrorProps } from "@/components/form/utils";
import { Input } from "@/components/ui/input";

interface NumberFieldProps
  extends FieldProps<number>,
    Omit<ComponentProps<typeof Input>, "name"> {}

export function NumberField({
  name = "",
  label,
  helperMessage,
  ...props
}: NumberFieldProps) {
  const [fieldMeta] = useField(name);

  return (
    <CustomFormControl
      {...{ label, helperMessage }}
      {...getFieldErrorProps(fieldMeta)}
    >
      <Input
        {...props}
        {...getInputProps(fieldMeta, { type: "number" })}
        key={fieldMeta.key}
      />
    </CustomFormControl>
  );
}
