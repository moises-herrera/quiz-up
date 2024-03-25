import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { User } from '../../interfaces';

interface AuthState {
  user: User | null;
  token: string | null;
  status: 'authenticated' | 'unauthenticated' | 'loading';
}

const initialState: AuthState = {
  user: null,
  token: null,
  status: 'authenticated',
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthLoading: (state) => {
      state.status = 'loading';
    },
    setCredentials: (
      state,
      { payload: { user, token } }: PayloadAction<{ user: User; token: string }>
    ) => {
      state.user = user;
      state.token = token;
      state.status = 'authenticated';
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.status = 'unauthenticated';
    },
  },
});

// Action creators are generated for each case reducer function
export const { setAuthLoading, setCredentials, logout } = authSlice.actions;
