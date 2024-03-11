import { FormSubmitHandler } from '.';

/**
 * Fields validation options.
 */
export type FieldsValidationOptions<T> = {
  formValues: T;
  currentField?: keyof T;
  onSubmit?: FormSubmitHandler<T>;
};
