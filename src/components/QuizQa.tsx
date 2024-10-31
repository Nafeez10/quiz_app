import { celebrateSvg } from "../assets";
import QaInfo from "./QaInfo";
import Questions from "./Questions";
import QuizPlayWrapper from "./QuizPlayWrapper";

const QuizQa = () =>{

    return(
        <>
            <QuizPlayWrapper>
                <div className="h-full w-full bo rder-2 bor der-black relative">
                    <QaInfo />
                    <div className="h-full w-full">
                        <Questions />
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