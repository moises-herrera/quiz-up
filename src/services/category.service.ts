import { collection, getDocs } from 'firebase/firestore';
import { APIStandardResponse, Category } from '../interfaces';
import { firebaseDatabase } from '../config/firebase';
import { handleError } from '../helpers';

/**
 * Get all categories.
 *
 * @returns A promise with the categories.
 */
export const getCategories = async (): Promise<
  APIStandardResponse<Category[]>
> => {
  try {
    const categories = await getDocs(
      collection(firebaseDatabase, 'categories')
    );
    const response: APIStandardResponse<Category[]> = {
      data: categories.docs.map(
        (doc) =>
          ({
            id: doc.id,
            ...doc.data(),
          } as Category)
      ),
    };

    return response;
  } catch (error) {
    const message = handleError(error, 'Error al obtener categorías');
    return { error: message };
  }
};
