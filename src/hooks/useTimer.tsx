import { useEffect, useState } from "react"

// This is a custom hook, i created this to track the no. of seconds the user takes
// to attempt a single question, i set the dependent prop can be any because
// to make this custom hook reusable with any type of state.
const useTimer = (dependent:any) =>{

    // This state keeps track of the seconds the user takes.
    const [ timeTaken, setTimeTaken ] = useState(0);

    useEffect(()=>{
        let timer = setInterval(()=>{
            setTimeTaken( prev => prev + 1);
        },1000)

        return ()=>{
            // This clears the interval when the dependency changes
            clearInterval(timer);

            // This reset the timer back to 0 when the dependecy changes.
            setTimeTaken(0);
        }
    },[dependent])

    // This returns the time taken.
    return timeTaken;
}

export default useTimer;