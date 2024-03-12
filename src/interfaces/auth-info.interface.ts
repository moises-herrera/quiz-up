import { User } from '.';

/**
 * Represents the auth response when a user is authenticated.
 */
export interface AuthInfo {
  /** User data. */
  user: User;

  /** User token. */
  token: string;
}
