import { useEffect, useState } from "react";
import { questionsType } from "../slices/questionsSlice";
import useTimer from "../hooks/useTimer";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { getCurrentQuizId, getPrevResponseData, getQaPostStatus, questionResponseType, quizPostPayloadType, quizQaPostData, quizQuestionsType, scoreType } from "../slices/quizQaInfoPostSlice";
import { DispatchType } from "../store/store";
import { changeAppState } from "../slices/appStateSlice";
import { addResult, getQuizResults, setQuizFinalScore } from "../slices/quizResultsSlice";

type propsType = {
    questions: questionsType[];
    currentQaNo: number;
    setCurrentQaNo: React.Dispatch<React.SetStateAction<number>>;
    questionLength:number
}

type currentOptionsType = {
    id: number;
    option: string;
    checked: boolean;
}

const Questions = ({ questions, currentQaNo, setCurrentQaNo, questionLength }:propsType) =>{

    const dispatch = useDispatch<DispatchType>();

    const allQaResults = useSelector(getQuizResults);

    const currentQuizId = useSelector(getCurrentQuizId);
    const prevQaResponse = useSelector(getPrevResponseData);
    const qaPostStatus = useSelector(getQaPostStatus);

    const [ currentQuestion, setCurrentQuestion ] = useState<questionsType>(questions[0]);
    const [ qaOptions, setQaOptions ] = useState<currentOptionsType[]>([]);
    const [ selectedOptions, setSelectedOptions ] = useState<string[]>([]);

    // This is a custom hook to get the time taken for singles question when
    // the question changes the timer also reset and begin from 0.
    const timeTaken = useTimer(currentQaNo);

    // This will change the question when the user clicks next.
    useEffect(()=>{
        if(currentQaNo > 1){
            setCurrentQuestion(questions[currentQaNo - 1])
        }
        
    },[currentQaNo])

    // This useEffect is to get the options of the current question and to change the 
    // options of string[] to currentOptionsType[] by converting the string array to
    // an array of objects which will have id, option -name of the option, and checked - whether the option
    // is checked or not to keep track of the state. 
    useEffect(()=>{
        const temp:currentOptionsType[] = currentQuestion.options.map((option, i) =>({
            id: i + 1,
            option,
            checked: false
        }));

        setQaOptions(temp);

    },[currentQuestion])

    // This useEffect will keep track of the selected options whenever the qaOptions state changes
    useEffect(()=>{
        const tempSelected = qaOptions
            .filter( option => option.checked)
                .map( option => option.option);
                
        setSelectedOptions(tempSelected);
    },[qaOptions])

    // This function is to check whether the selected options are correct
    // or not for the current question to keep the data in the payload to send to the api
    const checkIsAnswerCorrectHandeler = () =>{
        let isCorrect = false;
        const correctAnswerOptions = currentQuestion.correct_answer;

        // This will check the selected options array length and the correct answer
        // array length if the length is not matched it will return false if it matches 
        // then this will enter the if condition to check whether the selected options
        // are correct or wrong.
        if(selectedOptions.length == correctAnswerOptions.length){

            // This will return an array of boolean where it will return true if the option
            // is present and return false if the option is not present.
            const checkIsCorrectArray = selectedOptions.map( option =>{
                if(correctAnswerOptions.includes(option)){
                    return true
                }
                else{
                    return false
                }
            });

            // This will check that is every option the user selected is correct or not.
            const checkIsCorrect = checkIsCorrectArray.every( option => option == true);

            // Then, here the isCorrect is set to true if and only if every options are correct
            if(checkIsCorrect){
                
                isCorrect = true;

            }else{
                
                isCorrect = false;
            }
        }else{
            
            isCorrect = false
        }

        // Finally returns whether the selected option by the user is correct or wrong.
        return isCorrect;
    }

    // This is the onChange handeler of the checkbox input.
    const checkHandeler = (id:number) =>{
        const temp = qaOptions.map( option => option.id == id ? {
            ...option,
            checked: !option.checked
        } : option );

        setQaOptions(temp);
    }

    // This function calculates the final score of the quiz, only if the user
    // attended all the question this will be calculated or it will return 0.
    const finalScoreHandeler = (isAnswerCorrect:boolean) =>{
        let finalScore = 0;

        //  Here it checks the question is the final question or not, if it
        // is the final question it enters the if statement.
        if(currentQaNo == questionLength){
            // Here it calculates the percent for the single correct question.
            const singleQaPercent = parseFloat(((1 / questionLength ) * 100).toFixed(2));

            // Here it will increment the score by the singleQaPercent if a question is 
            // answered correctly.
            allQaResults.forEach( result =>{
                if(result){
                    
                    finalScore = finalScore + singleQaPercent;
                }
            })

            // This is becuase the correct answers boolean array will only be dispatched
            // if the api makes an successfull request so the final question value will not be in
            // the array of this particular time, so to update the score for the final question, this is done here.
            finalScore = isAnswerCorrect ? finalScore + singleQaPercent : finalScore;
        }
        
        return parseFloat(finalScore.toFixed(0));
    }

    // This is the Next button handeler.
    const nextBtnHandeler = async () =>{
        // This toast will be shown if the user have'nt selected a single option.
        if(!selectedOptions.length){
            toast(
                "Select atleast one option",
                {
                  duration: 2000,
                }
            );

            return;
        }

        // This will check the answer is correct for the current question.
        const isAnswerCorrect = checkIsAnswerCorrectHandeler();
        
        const correctAnswerOptions = currentQuestion.correct_answer;

        // This is the object of a single question's data in the question_response property 
        // to be updated to the api for an single quiz
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

        const payloadData:quizQuestionsType = {
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
            // This will make the request to the api to update the api with the
            // data of question the user currently attended. 
            await dispatch(quizQaPostData(payload)).unwrap();

            dispatch(addResult(isAnswerCorrect));

            if( currentQaNo < questionLength){
                setCurrentQaNo(currentQaNo + 1);
                
            }

            // This else statement is to show the submit button if the User reached the final question in the quiz. 
            else{
                
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

    // This is to disable the button if the current question's data send request is in pending.
    const canHitNext = qaPostStatus == "loading" ? true : false;

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
                            qaPostStatus == "loading" ? "Loading..." : currentQaNo == questionLength ? "Submit" : "Next"
                        }
                    </button>
                </div>
            </div>
        </>
    )
}

export default Questions;