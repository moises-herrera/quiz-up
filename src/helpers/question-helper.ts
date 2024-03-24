import { Question, QuestionAnswer } from '../interfaces';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';

/**
 * Gets a new question.
 *
 * @returns A new question.
 */
export const getNewQuestion = (): Question => {
  return {
    id: uuidv4(),
    question: '',
    options: [],
  };
};

/**
 * Gets a new answer.
 *
 * @returns A new answer.
 */
export const getAnswer = (): QuestionAnswer => {
  return { description: '', isCorrect: false };
};
