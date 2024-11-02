import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store/store";

type initialStateType = {
    quizResults:boolean[],
    quizFinalScore:number
}

// In this slice the array of boolean which indicates the correctly attempted questions
// and incorrectly attemped questions data, and the final score of the current quiz is stored.
const initialState:initialStateType = {
    quizResults:[],
    quizFinalScore:0
}

const quizResultsSlice = createSlice({
    name:"quizReults",
    initialState,
    reducers:{
        // This reducer actioin adds the boolean value to the array of quizResults,
        // Indicating whether the attempted questions are correct or wrong.
        addResult(state, action){
            state.quizResults.push(action.payload);
        },
        // This reducer action is to reset all the data to begin the quiz from the start.
        clearAllResultsData(state){
            state.quizResults = []
        },
        // This stores the final Score of the current quiz.
        setQuizFinalScore(state, action){
            state.quizFinalScore = action.payload;
        }
    }
})

export const { addResult, clearAllResultsData, setQuizFinalScore } = quizResultsSlice.actions

export const getQuizResults = (state:RootState) => state.quizResults.quizResults;
export const getQuizFinalScorePercent = (state:RootState) => state.quizResults.quizFinalScore;

export default quizResultsSlice.reducer