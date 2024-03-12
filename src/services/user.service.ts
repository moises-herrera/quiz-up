import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { setDoc, doc, getDoc } from 'firebase/firestore';
import { firebaseAuth, firebaseDatabase } from '../config/firebase';
import { LoginSchemaType, SignUpSchemaType } from '../schemas/auth';
import type { APIStandardResponse, AuthInfo, User } from '../interfaces';
import { handleError } from '../helpers';

/**
 * Creates a new username.
 *
 * @param username The username.
 * @param userId The user id.
 */
export const createUsername = async (
  username: string,
  userId: string
): Promise<void> => {
  try {
    const alreadyExists = await getDoc(
      doc(firebaseDatabase, 'usernames', username)
    );

    if (alreadyExists.exists()) {
      throw new Error('El nombre de usuario ya está en uso');
    }

    await setDoc(doc(firebaseDatabase, 'usernames', username), {
      [username]: userId,
    });
  } catch (error) {
    if (error instanceof Error) throw error;
    throw new Error('Error al crear el nombre de usuario');
  }
};

/**
 * Creates a new user.
 *
 * @param userInfo The user data.
 */
export const createUser = async (userInfo: User) => {
  try {
    const { id, ...userToSave } = userInfo;
    await createUsername(userInfo.username, userInfo.id);
    await setDoc(doc(firebaseDatabase, 'users', userInfo.id), userToSave);
  } catch (error) {
    if (error instanceof Error) throw error;
    throw new Error('Error al crear el usuario');
  }
};

/**
 * Gets a user by its id.
 *
 * @param id The user id.
 * @returns A promise with the user data.
 */
export const getUserById = async (id: string): Promise<User> => {
  try {
    const userDocument = await getDoc(doc(firebaseDatabase, 'users', id));
    const user = {
      id: userDocument.id,
      ...userDocument.data(),
    } as User;
    return user;
  } catch (error) {
    throw new Error('Error al obtener el usuario');
  }
};

/**
 * Registers a new user.
 *
 * @param data The user data.
 * @returns A promise with the API standard response.
 */
export const registerUser = async (
  data: SignUpSchemaType
): Promise<APIStandardResponse<AuthInfo>> => {
  try {
    const credentials = await createUserWithEmailAndPassword(
      firebaseAuth,
      data.email,
      data.password
    );
    const { confirmPassword, password, ...userInfo } = data;
    const user: User = { ...userInfo, id: credentials.user.uid };

    await createUser(user);
    const token = await credentials.user.getIdToken();

    const response: APIStandardResponse<AuthInfo> = {
      data: {
        user,
        token,
      },
    };

    return response;
  } catch (error: unknown) {
    if (firebaseAuth.currentUser?.uid) {
      await firebaseAuth.currentUser?.delete();
    }
    const message = handleError(error, 'Error al registrar el usuario');
    return { error: message };
  }
};

/**
 * Authenticates a user.
 *
 * @param data The user data.
 * @returns A promise with the API standard response.
 */
export const loginUser = async (
  data: LoginSchemaType
): Promise<APIStandardResponse<AuthInfo>> => {
  try {
    const credentials = await signInWithEmailAndPassword(
      firebaseAuth,
      data.email,
      data.password
    );
    const user = await getUserById(credentials.user.uid);
    const token = await credentials.user.getIdToken();

    const response: APIStandardResponse<AuthInfo> = {
      data: {
        user,
        token,
      },
    };

    return response;
  } catch (error) {
    const message = handleError(error, 'Error al iniciar sesión');
    return { error: message };
  }
};
