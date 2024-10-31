import { configureStore } from "@reduxjs/toolkit";
import questionsSlice from '../slices/questionsSlice';
import quizResultsSlice from '../slices/quizResultsSlice';

const store = configureStore({
    reducer:{
        qustions: questionsSlice,
        quizResults: quizResultsSlice
    }
})

export default store;

export type RootState = ReturnType<typeof store.getState>
export type DispatchType = typeof store.dispatch;