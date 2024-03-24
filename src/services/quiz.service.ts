import { doc, setDoc } from 'firebase/firestore';
import { APIStandardResponse, Quiz } from '../interfaces';
import { firebaseDatabase } from '../config/firebase';
import { handleError } from '../helpers';
import { uploadFile } from './file.service';

/**
 * Creates a new quiz.
 *
 * @param quiz The quiz data.
 * @returns A promise with the quiz data.
 */
export const createQuiz = async (quiz: Quiz) => {
  try {
    const { id, questions, ...data } = quiz;

    const imageUrl = await uploadFile('quizzes', quiz.image as Blob);

    await setDoc(doc(firebaseDatabase, 'quizzes', id), {
      ...data,
      image: imageUrl,
    });
    const questionPromises = questions.map(({ id, ...question }) => {
      return setDoc(
        doc(firebaseDatabase, 'quizzes', id, 'questions', id),
        question
      );
    });
    await Promise.all(questionPromises);

    const response: APIStandardResponse<Quiz> = {
      data: quiz,
    };

    return response;
  } catch (error) {
    const message = handleError(error, 'Error al crear el quiz');
    return { error: message };
  }
};
