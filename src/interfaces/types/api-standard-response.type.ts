/**
 * Represents the information returned by the API.
 */
export type APIStandardResponse<T> =
  | {
      /** Data returned by the API. */
      data: T;
    }
  | {
      /** Error returned by the API. */
      error: string;
    };
