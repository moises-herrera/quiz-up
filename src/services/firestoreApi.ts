import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { firebaseAuth, firebaseDatabase } from '../config/firebase';
import { LoginSchemaType, SignUpSchemaType } from '../schemas/auth';
import type { User as UserInfo } from '../interfaces';

/**
 * Represents the firestore api.
 */
export const firestoreApi = createApi({
  reducerPath: 'firestoreApi',
  baseQuery: fakeBaseQuery(),
  tagTypes: ['User'],
  endpoints: (builder) => ({
    loginUser: builder.mutation<
      {
        user: UserInfo;
        token: string;
      },
      LoginSchemaType
    >({
      async queryFn(data) {
        try {
          const credentials = await signInWithEmailAndPassword(
            firebaseAuth,
            data.email,
            data.password
          );
          const userDocument = await getDoc(
            doc(firebaseDatabase, 'users', credentials.user.uid)
          );
          const user = {
            id: userDocument.id,
            ...userDocument.data(),
          } as UserInfo;

          const token = await credentials.user.getIdToken();
          return {
            data: {
              user,
              token,
            },
          };
        } catch (error) {
          console.error(error);
          return { error: 'Error al iniciar sesión' };
        }
      },
      invalidatesTags: ['User'],
    }),
    registerUser: builder.mutation<
      {
        user: UserInfo;
        token: string;
      },
      SignUpSchemaType
    >({
      async queryFn(data) {
        try {
          const credentials = await createUserWithEmailAndPassword(
            firebaseAuth,
            data.email,
            data.password
          );

          const { confirmPassword, password, ...userInfo } = data;

          await setDoc(
            doc(firebaseDatabase, 'users', credentials.user.uid),
            userInfo
          );
          const token = await credentials.user.getIdToken();
          const user = {
            id: credentials.user.uid,
            ...userInfo,
          } as UserInfo;

          return { data: { user, token } };
        } catch (error) {
          console.error(error);
          return { error: 'Error al registrar el usuario' };
        }
      },
      invalidatesTags: ['User'],
    }),
  }),
});

export const { useLoginUserMutation, useRegisterUserMutation } = firestoreApi;
