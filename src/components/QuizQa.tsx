import { useSelector } from "react-redux";
import { celebrateSvg } from "../assets";
import QaInfo from "./QaInfo";
import Questions from "./Questions";
import QuizPlayWrapper from "./QuizPlayWrapper";
import { getQuestionsData, getQuestionsStatus } from "../slices/questionsSlice";
import { useEffect, useState } from "react";
import { quizQuestionType } from "../slices/quizQaInfoPostSlice";

const QuizQa = () =>{

    const questionsData = useSelector(getQuestionsData);
    const questionsStatus = useSelector(getQuestionsStatus);

    const [ currentQaNo, setCurrentQaNo ] = useState<number>(1);
    const [ quizQaResponseData, setQuizQaResponseData ] = useState<boolean[]>([]);

    return(
        <>
            <QuizPlayWrapper>
                <div className="h-full w-full bo rder-2 bor der-black relative">
                    <QaInfo
                        currentQaNo={currentQaNo}
                        setCurrentQaNo={setCurrentQaNo}
                    />
                    <div className="h-full w-full">
                        <Questions
                            questions={questionsData}
                            currentQaNo={currentQaNo}
                            setCurrentQaNo={setCurrentQaNo}
                            quizQaResponseData={quizQaResponseData}
                            setQuizQaResponseData={setQuizQaResponseData}
                        />
                    </div>
                </div>  
            </QuizPlayWrapper>

            {/* <div className=" w-full h-full bg-[#ae9bf2] relative">
                <div className="">
                    <img className="w-full" src={celebrateSvg} alt="" />
                </div>
                <div className=" absolute bottom-0 bg-white w-full h-[80vh] rounded-t-3xl">
                    <div className="h-full w-full border-2 border-black relative">
                        <QaInfo />
                        <div className="h-full w-full">
                            <Questions />
                        </div>
                    </div>
                </div>
                
            </div> */}
        </>
    )
}

export default QuizQa;