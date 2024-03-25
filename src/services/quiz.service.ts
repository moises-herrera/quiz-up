import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  setDoc,
  updateDoc,
} from 'firebase/firestore';
import { APIStandardResponse, Quiz } from '../interfaces';
import { firebaseDatabase } from '../config/firebase';
import { handleError } from '../helpers';
import { updateFile, uploadFile } from './file.service';

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
        const category = categories.docs
          .find(({ id }) => id === quizData.category)
          ?.data().label;

        return {
          id: doc.id,
          ...quizData,
          categoryLabel: category,
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

/**
 * Updates a quiz.
 *
 * @param id The quiz id.
 * @param quiz the quiz data.
 * @returns A promise with the quiz data.
 */
export const updateQuiz = async (
  id: string,
  quiz: Quiz
): Promise<APIStandardResponse<Quiz>> => {
  try {
    const { questions, ...data } = quiz;

    const imageUrl = !quiz.fileUploaded
      ? await uploadFile('quizzes', quiz.image as Blob)
      : await updateFile(
          'quizzes',
          quiz.image as Blob,
          quiz.fileUploaded as string
        );

    await updateDoc(doc(firebaseDatabase, 'quizzes', id), {
      ...data,
      image: imageUrl,
    });
    const questionPromises = questions.map(({ id, ...question }) => {
      return updateDoc(
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
    const message = handleError(error, 'Error al actualizar el quiz');
    return { error: message };
  }
};

/**
 * Deletes a quiz.
 *
 * @param id The quiz id.
 * @returns A promise with the error message.
 */
export const deleteQuiz = async (
  id: string
): Promise<APIStandardResponse<string>> => {
  try {
    const quizRef = doc(firebaseDatabase, 'quizzes', id);
    const questions = await getDocs(collection(quizRef, 'questions'));

    const questionsPromises = questions.docs.map((doc) => {
      deleteDoc(doc.ref);
    });
    await Promise.all(questionsPromises);
    await deleteDoc(quizRef);

    return { data: 'Quiz eliminado correctamente' };
  } catch (error) {
    const message = handleError(error, 'Error al eliminar el quiz');
    return { error: message };
  }
};
