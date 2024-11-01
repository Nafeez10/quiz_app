import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store/store";

type initialStateType = {
    quizResults:boolean[],
    quizFinalScore:number
}

const initialState:initialStateType = {
    quizResults:[],
    quizFinalScore:0
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
        },
        setQuizFinalScore(state, action){
            state.quizFinalScore = action.payload;
        }
    }
})

export const { addResult, clearAllResultsData, setQuizFinalScore } = quizResultsSlice.actions

export const getQuizResults = (state:RootState) => state.quizResults.quizResults;
export const getQuizFinalScorePercent = (state:RootState) => state.quizResults.quizFinalScore;

export default quizResultsSlice.reducer