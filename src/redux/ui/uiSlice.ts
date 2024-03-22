import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Toast } from '../../interfaces';

interface UiState {
  toastNotifications: Toast[];
}

const initialState: UiState = {
  toastNotifications: [],
};

export const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    displayToast: (state, { payload }: PayloadAction<Toast>) => {
      state.toastNotifications.push(payload);
    },
    closeToast: (state, { payload }: PayloadAction<number>) => {
      state.toastNotifications = state.toastNotifications.filter(
        (toast, index) => index !== payload
      );
    },
  },
});

// Action creators are generated for each case reducer function
export const { displayToast, closeToast } = uiSlice.actions;
