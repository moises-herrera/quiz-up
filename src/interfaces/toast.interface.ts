import { ToastMessage } from '.';

/**
 * Toast notification interface.
 */
export interface Toast {
  /** Notification message. */
  message: string;

  /** Notification type. */
  type: ToastMessage;
}
