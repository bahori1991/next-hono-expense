import type { ComponentProps, ComponentPropsWithRef, ReactNode } from "react";
import { Label } from "@/components/ui/label";

interface CustomFormControlProps extends ComponentPropsWithRef<"div"> {
  label?: ReactNode;
  required?: boolean;
  errorMessage?: string;
  helperMessage?: string;
  labelProps?: ComponentProps<typeof Label>;
  errorMessageProps?: ComponentProps<"p">;
  withoutLabel?: boolean;
  requiredIcon?: boolean;
}

/**
 * Form Control Component that is linked to label and error message
 * @param props - Form Control Props
 */
export function CustomFormControl({
  children,
  label,
  required,
  helperMessage,
  errorMessage,
  labelProps,
  errorMessageProps,
  withoutLabel = false,
  requiredIcon = false,
  ...props
}: CustomFormControlProps) {
  return (
    <div className="flex flex-col" {...props}>
      {!withoutLabel && (
        <div className="flex items-center gap-2">
          <Label className="text-lg" {...labelProps}>
            {label}
            {required && requiredIcon && (
              <span className="text-red-500">*</span>
            )}
          </Label>
        </div>
      )}
      {children}
      {errorMessage ? (
        <p className="text-red-500" {...errorMessageProps}>
          {errorMessage}
        </p>
      ) : helperMessage ? (
        <p className="text-sm text-gray-500">{helperMessage}</p>
      ) : null}
    </div>
  );
}
