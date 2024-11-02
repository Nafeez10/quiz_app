import { useDispatch, useSelector } from "react-redux"
import { guageSvg } from "../assets"
import QuizPlayWrapper from "./QuizPlayWrapper"
import { clearAllResultsData, getQuizFinalScorePercent, getQuizResults } from "../slices/quizResultsSlice"
import { DispatchType } from "../store/store"
import { clearAllQuestionData } from "../slices/questionsSlice"
import { clearAllQaInfoData } from "../slices/quizQaInfoPostSlice"
import { changeAppState } from "../slices/appStateSlice"

const FinalResult = () =>{

    const dispatch = useDispatch<DispatchType>();

    const finalResultArr = useSelector(getQuizResults);
    const quizFinalScorePercent = useSelector(getQuizFinalScorePercent);

    let correctAnswers = 0;
    
    let inCorrectAnswers = 0;

    finalResultArr.forEach( result =>{
        if(result){
            correctAnswers++;
           
        }else{
            inCorrectAnswers++;
        }
    })

    const inCorrectAnswersElement = (
        <div className=" bg-red-100 flex items-center gap-5 px-5 py-6 rounded-lg">
            <span className=" block bg-red-400 w-4 h-4 rounded-full"></span>
            <p>
                {inCorrectAnswers}
            </p>
            <p className=" text-slate-400">
                InCorrect
            </p>
        </div>
    )

    const correctAnswersElement = (
        <div className=" bg-green-100 flex items-center gap-5 px-5 py-6 rounded-lg">
            <span className=" block bg-green-400 w-4 h-4 rounded-full"></span>
            <p>
                {correctAnswers}
            </p>
            <p className=" text-slate-400">
                Correct
            </p>
        </div>
    )

    const startAgainHandeler = () =>{
        dispatch(clearAllQuestionData());
        dispatch(clearAllQaInfoData());
        dispatch(clearAllResultsData());
        dispatch(changeAppState('idle'));   
    }

    return(
        <>
            <QuizPlayWrapper>
                <div className="px-10 overflow-y-auto scroll-hidden nunito-font text-black flex flex-col justify-between h-full">
                    <div>
                        <h2 className="mt-10 text-2xl tracking-wide text-center">Your Result</h2>
                        <div className="">
                            <div className=" bor der-2 relative w-[200px] mx-auto">
                                <img className=" w-full" src={guageSvg} alt="" />
                                <div className=" flex justify-center items-center absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] rounded-full w-[65px] h-[65px] bg-white">
                                    <h3 className=" text-xl font-extrabold">
                                        {quizFinalScorePercent}%
                                    </h3>
                                </div>
                            </div>
                        </div>
                        <div className=" flex flex-col gap-5 scroll-hidden overflow-y-auto">
                            {
                                correctAnswers ? correctAnswersElement : <></>
                            }
                            {
                                inCorrectAnswers ? inCorrectAnswersElement : <></>
                            }
                        </div>
                    </div>
                    <div className="pb-5 mt-5">
                        <button onClick={startAgainHandeler} className=" main-btn">
                            Start Again
                        </button>
                    </div>
                </div>
            </QuizPlayWrapper>
        </>
    )
}

export default FinalResult