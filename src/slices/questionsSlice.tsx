import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store/store";

type qaType = {
    id: number;
    category: string;
    correct_answer: string[];
    difficulty: string;
    incorrect_answer: string[];
    options: string[];
    question: string;
    type: string;
}

export const questionsData = createAsyncThunk("questions/questionsData",async()=>{
    const respons = await fetch('https://672306c22108960b9cc66f68.mockapi.io/quiz/questions')
    const data:questionsType[] = await respons.json();
    return data;
})

export type questionsType = {
    id: number,
    type: string,
    difficulty: string,
    category: string,
    question: string,
    correct_answer: string[],
    incorrect_answers: string[],
    options: string[]
}

type initialStateType = {
    status: 'idle' | 'fulfilled' | 'rejected' | 'loading',
    isError: string,
    questions:questionsType[]
}

const initialState:initialStateType = {
    questions:[],
    status: 'idle',
    isError:''
}

const questionsSlice = createSlice({
    name:"questions",
    initialState,
    reducers:{

    },
    extraReducers(builder) {
        builder
            .addCase(questionsData.fulfilled, (state, action:PayloadAction<questionsType[]>)=>{
                state.isError = ''
                state.status = 'fulfilled'
                state.questions = action.payload
            })
            .addCase(questionsData.rejected, (state, action)=>{
                state.isError = 'Error Occured'
                state.status = 'rejected'
            })
            .addCase(questionsData.pending, (state, action)=>{
                state.isError = ''
                state.status = 'loading'
            })
    },
})

export const getQuestionsData = (state:RootState) => state.qustions.questions;
export const getQuestionsStatus = (state:RootState) => state.qustions.status;
export const getQuestionError = (state:RootState) => state.qustions.isError;

export default questionsSlice.reducer