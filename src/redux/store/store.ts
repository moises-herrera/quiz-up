import { configureStore } from '@reduxjs/toolkit';
import { firestoreApi } from '../../services';
import { authSlice } from '../auth';
import { uiSlice } from '../ui';

/** Redux store. */
export const store = configureStore({
  reducer: {
    [firestoreApi.reducerPath]: firestoreApi.reducer,
    auth: authSlice.reducer,
    ui: uiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(firestoreApi.middleware),
});

/** App state type. */
export type RootState = ReturnType<typeof store.getState>;

/** App dispatch type. */
export type AppDispatch = typeof store.dispatch;
