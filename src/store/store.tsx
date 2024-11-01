import { configureStore } from "@reduxjs/toolkit";
import questionsSlice from '../slices/questionsSlice';
import quizResultsSlice from '../slices/quizResultsSlice';
import appStateSlice from '../slices/appStateSlice';
import quizQaInfoPostSlice from '../slices/quizQaInfoPostSlice';

const store = configureStore({
    reducer:{
        appState: appStateSlice,
        qustions: questionsSlice,
        quizQaPost: quizQaInfoPostSlice,
        quizResults: quizResultsSlice
    }
})

export default store;

export type RootState = ReturnType<typeof store.getState>
export type DispatchType = typeof store.dispatch;