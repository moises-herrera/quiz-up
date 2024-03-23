import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Quiz } from '../../interfaces';

interface QuizState {
  quizzes: Quiz[];
  newQuiz: Quiz | null;
  currentFormStep: number;
}

const initialState: QuizState = {
  quizzes: [],
  newQuiz: null,
  currentFormStep: 0,
};

export const quizSlice = createSlice({
  name: 'quiz',
  initialState,
  reducers: {
    addQuiz: (state, action) => {
      state.quizzes.push(action.payload);
    },
    setNewQuiz: (state, { payload }: PayloadAction<Partial<Quiz>>) => {
      state.newQuiz = payload as Quiz;
      state.currentFormStep += 1;
    },
    clearNewQuiz: (state) => {
      state.newQuiz = null;
      state.currentFormStep = 0;
    },
    setCurrentFormStep: (state, { payload }: PayloadAction<number>) => {
      state.currentFormStep = payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { addQuiz, setNewQuiz, clearNewQuiz, setCurrentFormStep } =
  quizSlice.actions;
