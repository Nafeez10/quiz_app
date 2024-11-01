import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store/store";
import axiosApi from "../axiosApi/axiosApi";

// type qaType = {
//     id: number;
//     category: string;
//     correct_answer: string[];
//     difficulty: string;
//     incorrect_answer: string[];
//     options: string[];
//     question: string;
//     type: string;
// }

export const questionsData = createAsyncThunk("questions/questionsData",async()=>{
    const respons = await axiosApi.get('/questions');
    const data:questionsType[] = await respons.data;
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
    options: string[],
    imageUrl: string;
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
        clearAllQuestionData(state){
            state.isError = ''
            state.questions = []
            state.status = 'idle'
        }
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

export const { clearAllQuestionData } = questionsSlice.actions;

export const getQuestionsData = (state:RootState) => state.qustions.questions;
export const getQuestionsStatus = (state:RootState) => state.qustions.status;
export const getQuestionError = (state:RootState) => state.qustions.isError;

export default questionsSlice.reducer;