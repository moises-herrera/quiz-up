import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';
import { LoginSchemaType, SignUpSchemaType } from '../schemas/auth';
import { loginUser, registerUser } from './user.service';
import type { AuthInfo, Category } from '../interfaces';
import { setAuthLoading } from '../redux/auth';
import { getCategories } from './category.service';

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
  }),
});

export const {
  useLoginUserMutation,
  useRegisterUserMutation,
  useLazyGetCategoriesQuery,
} = firestoreApi;
