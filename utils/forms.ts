import { ZodIssue } from "zod";

export function errorsToString(errors: ZodIssue[]) {
  return errors
    .map(({ message, path }) => `${path}: ${message}`)
    .join("\n");
}
