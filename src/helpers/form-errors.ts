import { ZodError } from 'zod';

/**
 * Get errors formatted from ZodError.
 *
 * @param errors The errors object.
 * @param currentField The current field that is being validated.
 * @returns The formatted errors.
 */
export const getErrorsFormatted = <T>(
  errors: ZodError<{
    [x: string]: any;
  }>,
  currentField?: keyof T
): Record<keyof T, string> => {
  const fieldErrors = errors.formErrors.fieldErrors as Record<
    keyof T,
    string[]
  >;

  if (currentField) {
    const currentFieldError = fieldErrors[currentField];
    return {
      [currentField]: currentFieldError?.length ? currentFieldError[0] : '',
    } as Record<keyof T, string>;
  }

  const errorsFormatted = Object.entries<string[]>(fieldErrors).reduce(
    (acc, [key, value]) => {
      return {
        ...acc,
        [key]: value?.length ? value[0] : '',
      };
    },
    {} as Record<keyof T, string>
  );

  return errorsFormatted;
};
