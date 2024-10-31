import { configureStore } from "@reduxjs/toolkit";
import questionsSlice from '../slices/questionsSlice';

const store = configureStore({
    reducer:{
        qustions: questionsSlice
    }
})

export default store;

export type RootState = ReturnType<typeof store.getState>
export type DispatchType = typeof store.dispatch;