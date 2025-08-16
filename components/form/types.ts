import type { FieldName, SubmissionResult } from "@conform-to/react";
import type { ReactNode } from "react";

export type FormState = Readonly<
  | {
      status: "success";
      message: string;
      submissionResult?: SubmissionResult;
    }
  | {
      status: "error";
      submissionResult?: SubmissionResult;
    }
  | {
      status: "error";
      message: string;
      submissionResult?: SubmissionResult;
    }
  | {
      status: "undefined";
      submissionResult?: SubmissionResult;
    }
>;

/**
 * type of value that can be used as input value of an input element
 */
export type Inputtable =
  | string
  | string[]
  | number
  | boolean
  | Date
  | (Date | undefined)[]
  | (string | undefined)[]
  | undefined;

/**
 * properties of fields
 */
export interface FieldProps<T extends Inputtable = Inputtable> {
  /** name of field */
  name?: FieldName<T, Record<string, unknown>, string[]>;

  /**
   * helper message of field
   */
  helperMessage?: string;

  /** label of field */
  label?: ReactNode;
}
