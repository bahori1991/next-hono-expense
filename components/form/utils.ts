import type { FieldMetadata } from "@conform-to/react";

/**
 * get information about error of Field from Conform Metadata
 * @param fieldMeta - Conform Field Metadata
 */
export function getFieldErrorProps<Schema>(
  metadata: FieldMetadata<Schema, Record<string, unknown>, string[]>,
) {
  const { errors, required } = metadata;
  const [errorMessage] = errors ?? [];

  return {
    errorMessage,
    invalid: String(!!errors),
    required,
  };
}
