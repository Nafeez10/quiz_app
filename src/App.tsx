import { useState } from 'react'
import './App.css'
import Home from './components/Home'

type appStateType = 'idle' | 'playing' | 'finished'

function App() {
    const [ appState, setAppState ] = useState<appStateType>('idle');

    return (
        <>
            <main className=' w-[30%] lg:w-[35%] md:w-[50%] sm:w-[70%] max-sm:w-full border-2 h-screen mx-auto'>
                <section className='h-full w-full'>
                    <Home />
                </section>
            </main>
        </>
    )
}

export default App
