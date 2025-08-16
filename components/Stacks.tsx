import type { ComponentPropsWithRef, PropsWithChildren } from "react";

type DivProps = PropsWithChildren<ComponentPropsWithRef<"div">>;

export function HStack({ children, className, ...props }: DivProps) {
  return (
    <div {...props} className={`flex ${className}`}>
      {children}
    </div>
  );
}

export function VStack({ children, className, ...props }: DivProps) {
  return (
    <div {...props} className={`flex flex-col ${className}`}>
      {children}
    </div>
  );
}

export function Rest({ children, className, ...props }: DivProps) {
  return (
    <div {...props} className={`flex grow ${className}`}>
      {children}
    </div>
  );
}
