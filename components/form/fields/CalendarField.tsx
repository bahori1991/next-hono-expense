import { useField, useInputControl } from "@conform-to/react";
import type { ComponentProps, Ref } from "react";
import type { DayPicker } from "react-day-picker";
import { CustomFormControl } from "@/components/form/controls/CustomFormControl";
import type { FieldProps } from "@/components/form/types";
import { getFieldErrorProps } from "@/components/form/utils";
import { Calendar } from "@/components/ui/calendar";

interface CalendarFieldProps
  extends FieldProps<Date>,
    Omit<ComponentProps<typeof DayPicker>, "mode" | "selected" | "onSelect"> {
  ref?: Ref<HTMLInputElement>;
}

export function CalendarField({
  name = "",
  label,
  helperMessage,
  ...props
}: CalendarFieldProps) {
  const [fieldMeta] = useField(name);
  const control = useInputControl(fieldMeta);

  return (
    <CustomFormControl
      {...{ label, helperMessage }}
      {...getFieldErrorProps(fieldMeta)}
    >
      <Calendar
        {...props}
        mode="single"
        defaultMonth={fieldMeta.value ? new Date(fieldMeta.value) : undefined}
        selected={fieldMeta.value ? new Date(fieldMeta.value) : undefined}
        onSelect={(value) => control.change(value?.toISOString())}
      />
    </CustomFormControl>
  );
}
