import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { questionsType } from "./questionsSlice";
import { RootState } from "../store/store";

type dataType = [
    {
        quiz_taken: number,
        quiz_Results: quizResultsType
    }
]

// Thus because i am using a free trial version for the mock api i can't have more than two endpoints 
// so i've kept the total quiz taken value and the quiz results array values in a the same endpoint

const quizTakenData = createAsyncThunk('quizResults/quizTakenData', async()=>{
    const response = await fetch('https://672306c22108960b9cc66f68.mockapi.io/quiz/results');
    const data:dataType = await response.json();
    const noQuizTaken = data[0].quiz_taken;
    return noQuizTaken;
})

type userAttededDetails = {
    is_correct: 'idle' | 'incorrect' | 'correct' ,
    correct_choice: string[],
    question_attended: boolean,
}

type questionResponseType = {
    question_no: number,
    quiz_question_data: questionsType,
    time_taken_seconds: number,
    choices_selected: string[],
    user_attended_details: userAttededDetails
}

type scoreType = {
    final_score_percent: number,
    isAttendedAll: boolean
}

type quizResultsType = {
    id:number,
    question_response: questionResponseType,
    quiz_final_score: scoreType
}

type initialStateType = {
    status: 'idle' | 'fulfilled' | 'rejected' | 'loading',
    isError: string,
    quiz_taken: number,
    quiz_results: quizResultsType[]
}

const initialState:initialStateType = {
    status: 'idle',
    isError: '',
    quiz_taken: NaN,
    quiz_results:[]
}

const quizResultsSlice = createSlice({
    name: "quizResults",
    initialState,
    reducers:{

    },
    extraReducers(builder) {
        builder
            .addCase(quizTakenData.fulfilled, (state, action)=>{
                state.isError = ''
                state.status = 'fulfilled'
                state.quiz_taken = action.payload
            })
            .addCase(quizTakenData.pending, (state, action)=>{
                state.isError = ''
                state.status = 'loading'
            })
            .addCase(quizTakenData.rejected, (state, action)=>{
                state.isError = 'Something went Wrong!'
                state.status = 'rejected'
            })
    },
})

export const getQuizResultsQuizTaken = (state:RootState) => state.quizResults.quiz_taken;
export const getQuizResultsStatus = (state:RootState) => state.quizResults.status;
export const getQuizResultsError = (state:RootState) => state.quizResults.isError;

export default quizResultsSlice.reducer;