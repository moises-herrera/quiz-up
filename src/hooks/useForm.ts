import { useState } from 'react';
import { ZodObject } from 'zod';
import { getErrorsFormatted } from '../helpers';

export const useForm = <T>(initialForm: T, schema: ZodObject<any>) => {
  const [formState, setFormState] = useState<T>(initialForm);
  const [errors, setErrors] = useState<{
    [key: string]: string;
  } | null>(null);

  const onInputChange = (name: string, value: string) => {
    setFormState((prev) => <T>{ ...prev, [name]: value });
    const result = schema.safeParse(formState);
    if (!result.success) {
      const errorsFormatted = getErrorsFormatted(result.error, name);
      setErrors({
        ...errors,
        ...errorsFormatted,
      });
    } else {
      setErrors(null);
    }
  };

  const handleSubmit = (onSubmit: (values: T) => void) => {
    const result = schema.safeParse(formState);
    if (!result.success) {
      const errorsFormatted = getErrorsFormatted(result.error);
      setErrors(errorsFormatted);
    } else {
      setErrors(null);
      onSubmit(formState);
    }
  };

  const onResetForm = (): void => {
    setFormState(initialForm);
  };

  return {
    formState,
    errors,
    onInputChange,
    handleSubmit,
    onResetForm,
  };
};
