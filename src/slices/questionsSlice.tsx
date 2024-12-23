import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store/store";
import axiosApi from "../axiosApi/axiosApi";

// This async thunk action is to make the request to the api to fetch the data
// with the list of questions.
export const questionsData = createAsyncThunk("questions/questionsData",async()=>{
    const respons = await axiosApi.get('/questions');
    const data:questionsType[] = await respons.data;
    return data;
})

// This is the type of an single question.
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
        // This reducer action is to reset all the data to begin the quiz from the start.
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
            .addCase(questionsData.rejected, (state)=>{
                state.isError = 'Error Occured'
                state.status = 'rejected'
            })
            .addCase(questionsData.pending, (state)=>{
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