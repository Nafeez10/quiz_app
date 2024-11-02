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

    // This updates the App's UI based on the app's current state. 
    const displayAppUI = (
     appState == "idle" ? <Home />
        : appState == 'playing' ? <QuizQa />
            : <FinalResult />  
    );

    return (
        <>  
            {/* This is the toaster i used for this app which is react-hot-toast. */}
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
