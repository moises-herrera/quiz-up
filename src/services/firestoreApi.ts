import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';
import { LoginSchemaType, SignUpSchemaType } from '../schemas/auth';
import { loginUser, registerUser } from './user.service';
import type { AuthInfo, Category, Quiz } from '../interfaces';
import { setAuthLoading } from '../redux/auth';
import { getCategories } from './category.service';
import { createQuiz, deleteQuiz, getQuizzes } from './quiz.service';

/**
 * Represents the firestore api.
 */
export const firestoreApi = createApi({
  reducerPath: 'firestoreApi',
  baseQuery: fakeBaseQuery(),
  tagTypes: ['User'],
  endpoints: (builder) => ({
    loginUser: builder.mutation<AuthInfo, LoginSchemaType>({
      async queryFn(data) {
        return await loginUser(data);
      },
      onQueryStarted: async (_arg, { dispatch }) => {
        dispatch(setAuthLoading());
      },
      invalidatesTags: ['User'],
    }),
    registerUser: builder.mutation<AuthInfo, SignUpSchemaType>({
      async queryFn(data) {
        return await registerUser(data);
      },
      onQueryStarted: async (_arg, { dispatch }) => {
        dispatch(setAuthLoading());
      },
      invalidatesTags: ['User'],
    }),
    getCategories: builder.query<Category[], void>({
      async queryFn() {
        return await getCategories();
      },
    }),
    getQuizzes: builder.query<Quiz[], void>({
      async queryFn() {
        return await getQuizzes();
      },
    }),
    saveQuiz: builder.mutation<Quiz, Quiz>({
      async queryFn(data) {
        return await createQuiz(data);
      },
    }),
    deleteQuiz: builder.mutation<string, string>({
      async queryFn(id) {
        return await deleteQuiz(id);
      },
    }),
  }),
});

export const {
  useLoginUserMutation,
  useRegisterUserMutation,
  useLazyGetCategoriesQuery,
  useSaveQuizMutation,
  useLazyGetQuizzesQuery,
  useDeleteQuizMutation,
} = firestoreApi;
