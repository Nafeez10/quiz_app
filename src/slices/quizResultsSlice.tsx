import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store/store";

type initialStateType = {
    quizResults:boolean[]
}

const initialState:initialStateType = {
    quizResults:[]
}

const quizResultsSlice = createSlice({
    name:"quizReults",
    initialState,
    reducers:{
        addResult(state, action){
            state.quizResults.push(action.payload);
        },
        clearAllResultsData(state){
            state.quizResults = []
        }
        
    }
})

export const { addResult, clearAllResultsData } = quizResultsSlice.actions

export const getQuizResults = (state:RootState) => state.quizResults.quizResults;

export default quizResultsSlice.reducer