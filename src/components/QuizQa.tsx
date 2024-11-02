import { useSelector } from "react-redux";
import QaInfo from "./QaInfo";
import Questions from "./Questions";
import QuizPlayWrapper from "./QuizPlayWrapper";
import { getQuestionsData } from "../slices/questionsSlice";
import { useState } from "react";


const QuizQa = () =>{

    const questionsData = useSelector(getQuestionsData);

    const [ currentQaNo, setCurrentQaNo ] = useState<number>(1);

    return(
        <>
            <QuizPlayWrapper>
                <div className="h-full w-full bo rder-2 bor der-black relative">
                    <QaInfo
                        questionsLength={questionsData.length}
                        currentQaNo={currentQaNo}
                    />
                    <div className="h-full w-full">
                        <Questions
                            questions={questionsData}
                            currentQaNo={currentQaNo}
                            setCurrentQaNo={setCurrentQaNo}
                            questionLength={questionsData.length}
                        />
                    </div>
                </div>  
            </QuizPlayWrapper>
        </>
    )
}

export default QuizQa;