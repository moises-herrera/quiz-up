import { FormSubmitHandler } from '.';

/**
 * Fields validation options.
 */
export type fieldsValidationOptions<T> = {
  formValues: T;
  currentField?: keyof T;
  onSubmit?: FormSubmitHandler<T>;
};
