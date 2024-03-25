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
  image?: Blob | string;

  /** Image uploaded of the quiz. */
  fileUploaded?: Blob | string;

  /** Category's id of the quiz. */
  category: string;

  /** Category label of the quiz. */
  categoryLabel: string;

  /** Questions of the quiz. */
  questions: Question[];

  /** User's name of the quiz creator. */
  user: string;
}
