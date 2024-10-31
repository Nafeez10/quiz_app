import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const quizQaPostData = createAsyncThunk("quizTaken", async(payload)=>{
    const payloadData = {
        
    }
})


type initialStateType = {
    status: 'idle' | 'fulfilled' | 'rejected' | 'loading',
    isError: string,
    // quiz_taken: number
}

const initialState:initialStateType = {
    status:'idle',
    isError:'',
    // quiz_taken: NaN
}

const quizQaInfoPostSlice = createSlice({
    name: "quizTaken",
    initialState,
    reducers:{

    },
    extraReducers(builder) {
        builder
            .addCase(quizQaPostData.fulfilled, (state)=>{
                state.isError = ''
                state.status = 'fulfilled'
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
})