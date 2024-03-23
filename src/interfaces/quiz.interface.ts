import { Question } from '.';

/**
 * Represents the structure of a quiz.
 */
export interface Quiz {
  /** Unique identifier of the quiz. */
  id: string;

  /** Title of the quiz. */
  title: string;

  /** Description of the quiz. */
  description?: string;

  /** Image URL of the quiz. */
  image?: string;

  /** Category of the quiz. */
  category: string;

  /** Questions of the quiz. */
  questions: Question[];

  /** User's id of the quiz creator. */
  userId: string;
}
