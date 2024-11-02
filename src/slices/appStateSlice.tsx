import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store/store";

// This is the type of app state.
type appStateType = 'idle' | 'playing' | 'finished'

type initialStateType = {
    appState: 'idle' | 'playing' | 'finished'
}

const initialState:initialStateType = {
    appState: 'idle'
}

const appStateSlice = createSlice({
    name: 'appState',
    initialState,
    reducers:{
        // This reducer action is to change the state of the app.
        changeAppState(state, action:PayloadAction<appStateType>){
            state.appState = action.payload;
        }
    }
})

export const {  changeAppState } = appStateSlice.actions 

export const getAppState = (state:RootState) => state.appState.appState;

export default appStateSlice.reducer;