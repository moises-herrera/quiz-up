import { QuestionAnswer } from './question-answer.interface';

/**
 * Represents a question of a quiz.
 */
export interface Question {
  /** Unique identifier of the question. */
  id: string;

  /** The question itself. */
  question: string;

  /** List of possible answers. */
  options: QuestionAnswer[];

  /** Quiz's id to which the question belongs. */
  quizId: string;
}
