import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';
import { LoginSchemaType, SignUpSchemaType } from '../schemas/auth';
import { loginUser, registerUser } from './user.service';
import type { AuthInfo } from '../interfaces';

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
      invalidatesTags: ['User'],
    }),
    registerUser: builder.mutation<AuthInfo, SignUpSchemaType>({
      async queryFn(data) {
        return await registerUser(data);
      },
      invalidatesTags: ['User'],
    }),
  }),
});

export const { useLoginUserMutation, useRegisterUserMutation } = firestoreApi;
