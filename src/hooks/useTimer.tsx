import { useEffect, useState } from "react"


const useTimer = (dependent:any) =>{
    const [ timeTaken, setTimeTaken ] = useState(0); // the timeTaken is based on seconds

    useEffect(()=>{
        let timer = setInterval(()=>{
            setTimeTaken( prev => prev + 1);
        },1000)

        return ()=>{
            clearInterval(timer);
        }
    },[dependent])

    return timeTaken;
}

export default useTimer;