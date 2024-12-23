import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { questionsType } from "./questionsSlice";
import axiosApi from "../axiosApi/axiosApi";
import { RootState } from "../store/store";

export type quizPostPayloadType = {
    quizQaNo: number;
    payloadData: quizQuestionsType;
    quizId?:string;
    questionLength:number
}

// This is the type of the an single quiz data attempted by an user in the api.
type quizQaPostPayloadData = quizQuestionsType & {
    id:string;
}

// This async thunk action is to make an request to the api to update the api with the
// question the user just attempted.
// This async thunk action consists of all the logic to make the request according to
// next button request and the submit button request.
export const quizQaPostData = createAsyncThunk("quizQaPost/quizQaPostData", async (payload:quizPostPayloadType)=>{
    const quizQaNo = payload.quizQaNo;
    const payloadData = payload.payloadData;
    const currentQuizId = payload.quizId;
    const questionsLength = payload.questionLength;

    if(quizQaNo == 1){
        const response = await axiosApi.post('/results',payloadData);
        const data = await response.data;
        return data;
    }
    else if(quizQaNo == questionsLength){
        const patchQuestionResponse = {
            question_response: payloadData.question_response,
            final_score: payloadData.final_score
        };
        
        const response = await axiosApi.patch(`/results/${currentQuizId}`,patchQuestionResponse);
        const data = await response.data;
        return data;
    }
    else{
        const patchQuestionResponse = {
            question_response: payloadData.question_response
        };
        
        const response = await axiosApi.patch(`/results/${currentQuizId}`,patchQuestionResponse);
        const data = await response.data;
        return data;
    }
})

export type scoreType = {
    final_score_percent: number,
    isAttendedAll: boolean
}

export type quizQuestionsType = {
    question_response: questionResponseType[],
    final_score: scoreType
}

type userAttededDetails = {
    is_correct: boolean ,
    correct_choice: string[],
}

export type questionResponseType = {
    question_no: number,
    quiz_question_data: questionsType,
    time_taken_seconds: number,
    choices_selected: string[],
    user_attended_details: userAttededDetails
}



type initialStateType = {
    status: 'idle' | 'fulfilled' | 'rejected' | 'loading',
    isError: string,
    quizId: string,
    quizResponseData: questionResponseType[]
}

const initialState:initialStateType = {
    status:'idle',
    isError:'',
    quizId:'',
    quizResponseData:[]
}

const quizQaInfoPostSlice = createSlice({
    name: "quizQaPost",
    initialState,
    reducers:{
        // This reducer action is to reset all the data to begin the quiz from the start.
        clearAllQaInfoData(state){
            state.isError = ''
            state.quizId = ''
            state.quizResponseData = []
            state.status = 'idle'
        }
    },
    extraReducers(builder) {
        builder
            .addCase(quizQaPostData.fulfilled, (state, action:PayloadAction<quizQaPostPayloadData>)=>{
                state.isError = '';
                state.status = 'fulfilled';

                const payload = action.payload;
                
                const currentQuizId = payload.id;
                state.quizId = currentQuizId;
            
                const responseData = payload.question_response;
                state.quizResponseData = responseData
               
            })
            .addCase(quizQaPostData.pending, (state)=>{
                state.isError = ''
                state.status = 'loading'
            })
            .addCase(quizQaPostData.rejected, (state)=>{
                state.isError = 'Something went wrong!'
                state.status = 'rejected'
            })
    },
});

export const { clearAllQaInfoData } = quizQaInfoPostSlice.actions;

export const getCurrentQuizId = (state:RootState) => state.quizQaPost.quizId; 
export const getPrevResponseData = (state:RootState) => state.quizQaPost.quizResponseData;  
export const getQaPostStatus = (state:RootState) => state.quizQaPost.status;

export default quizQaInfoPostSlice.reducer;