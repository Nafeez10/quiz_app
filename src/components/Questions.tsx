import { useEffect, useState } from "react";
import { questionsType } from "../slices/questionsSlice";
import useTimer from "../hooks/useTimer";

type propsType = {
    questions: questionsType[];
    currentQaNo: number;
    setCurrentQaNo: React.Dispatch<React.SetStateAction<number>>;
}

type tempType = {
    id: number;
    option: string;
    checked: boolean;
}

const Questions = ({ questions, currentQaNo, setCurrentQaNo}:propsType) =>{
    const [ currentQuestion, setCurrentQuestion ] = useState<questionsType>(questions[currentQaNo - 1]);
    const [ qaOptions, setQaOptions ] = useState<tempType[]>([]);
    const [ selectedOptions, setSelectedOptions ] = useState<string[]>([]);

    // const timeTaken = useTimer(currentQaNo);
    // console.log(timeTaken)
    // const [ isAnswerCorrect, setIsAnswerCorrect ] = useState(false); 

    // console.log(currentQuestion)

    useEffect(()=>{
        const temp:tempType[] = currentQuestion.options.map((option, i) =>({
            id: i + 1,
            option,
            checked: false
        }));

        setQaOptions(temp);

        // console.log(temp)

    },[currentQuestion])

    useEffect(()=>{
        const tempSelected = qaOptions
            .filter( option => option.checked)
                .map( option => option.option);
                
        setSelectedOptions(tempSelected);
        // console.log(selectedOptions)
    },[qaOptions])

    // useEffect(()=>{
    //     const correctAnswerOptions = currentQuestion.correct_answer;
    //     // console.log(correctAnswerOptions.length)
    //     if(selectedOptions.length == correctAnswerOptions.length){
    //         const checkIsCorrectArray = selectedOptions.map( option =>{
    //             if(correctAnswerOptions.includes(option)){
    //                 return true
    //             }
    //             else{
    //                 return false
    //             }
    //         });

    //         const checkIsCorrect = checkIsCorrectArray.every( option => option == true);

    //         if(checkIsCorrect){
    //             setIsAnswerCorrect(true);
    //             console.log(true,"mmm")
    //         }else{
    //             setIsAnswerCorrect(false);
    //         }
    //     }else{
    //         setIsAnswerCorrect(false);
    //     }
    // },[qaOptions, selectedOptions])

    // console.log(selectedOptions)

    const checkIsAnswerCorrectHandeler = () =>{
        let isCorrect = false;
        const correctAnswerOptions = currentQuestion.correct_answer;
        // console.log(correctAnswerOptions.length)
        if(selectedOptions.length == correctAnswerOptions.length){
            const checkIsCorrectArray = selectedOptions.map( option =>{
                if(correctAnswerOptions.includes(option)){
                    return true
                }
                else{
                    return false
                }
            });

            const checkIsCorrect = checkIsCorrectArray.every( option => option == true);

            if(checkIsCorrect){
                // setIsAnswerCorrect(true);
                isCorrect = true;
                console.log(true,"mmm")
            }else{
                // setIsAnswerCorrect(false);
                isCorrect = false;
            }
        }else{
            // setIsAnswerCorrect(false);
            isCorrect = false
        }

        return isCorrect;
    }

    const checkHandeler = (id:number) =>{
        const temp = qaOptions.map( option => option.id == id ? {
            ...option,
            checked: !option.checked
        } : option );

        // checkIsAnswerCorrectHandeler();

        setQaOptions(temp);
    }

    const nextBtnHandeler = () =>{
        const isAnswerCorrect = checkIsAnswerCorrectHandeler();
        console.log(isAnswerCorrect)
    }

    // console.log(isAnswerCorrect, "is correct")

    return(
        <>
            <div className="pt-14 mx-auto px-5 flex flex-col h-full ">
                <h3 className=" text-black nunito-font text-xl">
                    { currentQuestion.question }
                </h3>
                <div className="mt-10 overflow-y-auto scroll-hidden flex flex-col gap-5 flex-grow">
                    {
                        qaOptions.map( option =>(
                            <div key={option.id} className=" option option-n-s ">
                                <input checked={option.checked} onChange={()=>checkHandeler(option.id)} className=" checkbox-success [--chkbg:#41da6a] [--chkfg:white] checkbox bord er-2 border-neutral-400 rounded-full" type="checkbox" />
                                <p>{option.option}</p>
                            </div>
                        ))
                    }
                </div>
                <div className="">
                    <button onClick={nextBtnHandeler} className="main-btn my-4 ">
                        Next
                    </button>
                </div>
            </div>
        </>
    )
}

export default Questions;