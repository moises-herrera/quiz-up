import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Quiz } from '../../interfaces';

interface QuizState {
  quizzes: Quiz[];
  quizActive: Quiz | null;
  currentFormStep: number;
}

const initialState: QuizState = {
  quizzes: [],
  quizActive: null,
  currentFormStep: 0,
};

export const quizSlice = createSlice({
  name: 'quiz',
  initialState,
  reducers: {
    setQuizzes: (state, { payload }: PayloadAction<Quiz[]>) => {
      state.quizzes = payload;
    },
    addQuiz: (state, { payload }: PayloadAction<Quiz>) => {
      state.quizzes.push(payload);
    },
    removeQuiz: (state, { payload }: PayloadAction<string>) => {
      state.quizzes = state.quizzes.filter((quiz) => quiz.id !== payload);
    },
    setActiveQuiz: (
      state,
      {
        payload,
      }: PayloadAction<{ quiz: Partial<Quiz>; currentFormStep?: number }>
    ) => {
      state.quizActive = payload.quiz as Quiz;
      state.currentFormStep = payload.currentFormStep ?? 0;
    },
    clearNewQuiz: (state) => {
      state.quizActive = null;
      state.currentFormStep = 0;
    },
    setCurrentFormStep: (state, { payload }: PayloadAction<number>) => {
      state.currentFormStep = payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  addQuiz,
  setQuizzes,
  removeQuiz,
  setActiveQuiz,
  clearNewQuiz,
  setCurrentFormStep,
} = quizSlice.actions;
