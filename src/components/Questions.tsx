import { useEffect, useState } from "react";
import { questionsType } from "../slices/questionsSlice";
import useTimer from "../hooks/useTimer";
import { useDispatch, useSelector } from "react-redux";
// import { getQuizResultsStatus } from "../slices/quizResultsSlice";
import toast from "react-hot-toast";
import { getCurrentQuizId, getPrevResponseData, getQaPostStatus, questionResponseType, quizPostPayloadType, quizQaPostData, quizQuestionType, scoreType } from "../slices/quizQaInfoPostSlice";
import { DispatchType } from "../store/store";
import { changeAppState, getAppState } from "../slices/appStateSlice";
import { addResult, getQuizResults, setQuizFinalScore } from "../slices/quizResultsSlice";

type propsType = {
    questions: questionsType[];
    currentQaNo: number;
    setCurrentQaNo: React.Dispatch<React.SetStateAction<number>>;
    quizQaResponseData: boolean[];
    setQuizQaResponseData:React.Dispatch<React.SetStateAction<boolean[]>>;
    questionLength:number
}

type tempType = {
    id: number;
    option: string;
    checked: boolean;
}

const Questions = ({ questions, currentQaNo, setCurrentQaNo, questionLength,  quizQaResponseData, setQuizQaResponseData}:propsType) =>{

    const dispatch = useDispatch<DispatchType>();

    const allQaResults = useSelector(getQuizResults);

    const currentQuizId = useSelector(getCurrentQuizId);
    const prevQaResponse = useSelector(getPrevResponseData);
    const qaPostStatus = useSelector(getQaPostStatus);

    const [ currentQuestion, setCurrentQuestion ] = useState<questionsType>(questions[0]);
    const [ qaOptions, setQaOptions ] = useState<tempType[]>([]);
    const [ selectedOptions, setSelectedOptions ] = useState<string[]>([]);
    // const quizTaken = useSelector(getQuizResultsQuizTaken);
    // const quizTakenStatus = useSelector(getQuizResultsStatus);

    const timeTaken = useTimer(currentQaNo);

    useEffect(()=>{
        if(currentQaNo > 1){
            setCurrentQuestion(questions[currentQaNo - 1])
        }
        
    },[currentQaNo])

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

    const finalScoreHandeler = (isAnswerCorrect:boolean) =>{
        let finalScore = 0;
        if(currentQaNo == questionLength){
            const singleQaPercent = parseFloat(((1 / questionLength ) * 100).toFixed(2));
            console.log((1 / questionLength ) * 100,singleQaPercent,"heyy");

            allQaResults.forEach( result =>{
                if(result){
                    // const temp = Math.round((currentQaNo / questionLength ) * 100);
                    finalScore = finalScore + singleQaPercent;
                }
            })
            finalScore = isAnswerCorrect ? finalScore + singleQaPercent : finalScore;
        }
        
        return parseFloat(finalScore.toFixed(0));
    }

    const nextBtnHandeler = async () =>{
        if(!selectedOptions.length){
            toast(
                "Select atleast one option",
                {
                  duration: 2000,
                }
            );

            return;
        }

        const isAnswerCorrect = checkIsAnswerCorrectHandeler();
        console.log(isAnswerCorrect);
        
        const correctAnswerOptions = currentQuestion.correct_answer;

        const currentQaData:questionResponseType = {
            question_no: currentQaNo,
            quiz_question_data: currentQuestion,
            time_taken_seconds: timeTaken,
            choices_selected: selectedOptions,
            user_attended_details: {
                is_correct: isAnswerCorrect,
                correct_choice: correctAnswerOptions,
            }
        }

        const questionData: questionResponseType[] = [
            ...prevQaResponse, currentQaData
        ]

        const finalScore:scoreType = {
            isAttendedAll: currentQaNo == questionLength ? true : false ,
            final_score_percent: finalScoreHandeler(isAnswerCorrect)
        } 

        const payloadData:quizQuestionType = {
            // id: currentQaNo,
            question_response:questionData,
            final_score: finalScore
        }

        const payload:quizPostPayloadType = {
            quizQaNo: currentQaNo,
            quizId: currentQuizId,
            payloadData,
            questionLength:questionLength
        }

        try {
            const response = await dispatch(quizQaPostData(payload)).unwrap();
            // setQuizQaResponseData([
            //     ...quizQaResponseData, isAnswerCorrect
            // ])

            dispatch(addResult(isAnswerCorrect));

            if( currentQaNo < questionLength){
                setCurrentQaNo(currentQaNo + 1);
                console.log(payload);
                console.log(currentQaNo)
            }else{
                dispatch(changeAppState('finished'));

                const finalScore = finalScoreHandeler(isAnswerCorrect);

                dispatch(setQuizFinalScore(finalScore));
            }
            
        } catch {
            toast(
                "Somethind went wrong!",
                {
                    duration: 2000,
                }
            );
        }

    }

    // console.log(isAnswerCorrect, "is correct")

    const canHitNext = qaPostStatus == "loading" ? true : false;

    // const questionImageElement = (
    //     <img className="w-[50%] mx-auto mb-5 rounded-md" src={currentQuestion.imageUrl} alt="" />
    // )

    return(
        <>
            <div className="pt-14 mx-auto px-5 flex flex-col h-full ">
                <h3 className=" text-black nunito-font text-xl">
                    { currentQuestion.question }
                </h3>
                <div className=" mt-10 overflow-y-auto scroll-hidden">
                    {
                        currentQuestion.imageUrl ? 
                            <img className="w-[50%] mx-auto mb-5 rounded-md" src={currentQuestion.imageUrl} alt="" />
                            : 
                            <></>
                    }
                    <div className=" flex flex-col gap-5 flex-grow">
                        {
                            qaOptions.map( option =>(
                                <div key={option.id} className={` option ${option.checked ? "option-s" : "option-n-s"} `}>
                                    <input checked={option.checked} onChange={()=>checkHandeler(option.id)} className=" checkbox-success [--chkbg:#41da6a] [--chkfg:white] checkbox bord er-2 border-neutral-400 rounded-full" type="checkbox" />
                                    <p>{option.option}</p>
                                </div>
                            ))
                        }
                    </div>
                </div>
                
                <div className="">
                    <button disabled={canHitNext} onClick={nextBtnHandeler} className="main-btn my-4 disabled:brightness-75 ">
                        {
                            // currentQaNo == 5 ? "Submit" : "Next"
                            qaPostStatus == "loading" ? "Loading..." : currentQaNo == questionLength ? "Submit" : "Next"
                        }
                    </button>
                </div>
            </div>
        </>
    )
}

export default Questions;