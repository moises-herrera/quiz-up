/**
 * Handle error.
 *
 * @param error The error.
 * @param defaultMessage The default message.
 * @returns The error message.
 */
export const handleError = (
  error: unknown,
  defaultMessage = 'Ha ocurrido un error'
): string => {
  console.error(error);

  if (error instanceof Error) {
    return error.message;
  }
  return defaultMessage;
};
