import { ZodError } from 'zod';

export const getErrorsFormatted = (
  errors: ZodError<{
    [x: string]: any;
  }>,
  currentField?: string
) => {
  const fieldErrors = errors.formErrors.fieldErrors;

  if (currentField) {
    const currentFieldError = fieldErrors[currentField];
    return {
      [currentField]: currentFieldError?.length ? currentFieldError[0] : '',
    };
  }

  const errorsFormatted = Object.entries(fieldErrors).reduce(
    (acc, [key, value]) => {
      return {
        ...acc,
        [key]: value?.length ? value[0] : '',
      };
    },
    {}
  );

  return errorsFormatted;
};
