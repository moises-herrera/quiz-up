import {
  collection,
  doc,
  getDocs,
  setDoc,
} from 'firebase/firestore';
import { APIStandardResponse, Quiz } from '../interfaces';
import { firebaseDatabase } from '../config/firebase';
import { handleError } from '../helpers';
import { uploadFile } from './file.service';

/**
 * Gets all the quizzes.
 *
 * @returns A promise with the quizzes data.
 */
export const getQuizzes = async (): Promise<APIStandardResponse<Quiz[]>> => {
  try {
    const [quizzes, categories] = await Promise.all([
      getDocs(collection(firebaseDatabase, 'quizzes')),
      getDocs(collection(firebaseDatabase, 'categories')),
    ]);
    const response: APIStandardResponse<Quiz[]> = {
      data: quizzes.docs.map((doc) => {
        const quizData = doc.data();

        return {
          id: doc.id,
          ...quizData,
          category: categories.docs
            .find(({ id }) => id === quizData.category)
            ?.data().label,
        } as Quiz;
      }),
    };

    return response;
  } catch (error) {
    const message = handleError(error, 'Error al obtener la lista');
    return { error: message };
  }
};

/**
 * Creates a new quiz.
 *
 * @param quiz The quiz data.
 * @returns A promise with the quiz data.
 */
export const createQuiz = async (
  quiz: Quiz
): Promise<APIStandardResponse<Quiz>> => {
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
