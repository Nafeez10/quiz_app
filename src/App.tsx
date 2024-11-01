import { useState } from 'react'
import './App.css'
import Home from './components/Home'
import QuizQa from './components/QuizQa';
import FinalResult from './components/FinalResult';
import { getAppState } from './slices/appStateSlice';
import { useSelector } from 'react-redux';
import { Toaster } from 'react-hot-toast';

export type appStateType = 'idle' | 'playing' | 'finished'

function App() {
    const appState = useSelector(getAppState);

    // const hey = async () =>{
    //     const response = await fetch('https://672306c22108960b9cc66f68.mockapi.io/quiz/results');
    //     const data = await response.json();
    //     console.log(data[0].quiz_taken)
    // }

    // hey()

    const displayAppUI = (
     appState == "idle" ? <Home />
        : appState == 'playing' ? <QuizQa />
            : <FinalResult />  
    );

    return (
        <>  
            <Toaster />
            <main className='bg-app-gradient sm:rounded-lg w-[30%] lg:w-[35%] md:w-[50%] sm:w-[70%] max-sm:w-full sm:border-[3px] border-[#af9cf3] h-screen mx-auto overflow-hidden'>
                <section className='h-full w-full'>
                    {
                        displayAppUI   
                    }
                </section>
            </main>
        </>
    )
}

export default App
