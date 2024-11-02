import { ReactNode } from "react";
import { celebrateSvg } from "../assets";

type propsType = {
    children: ReactNode
}

// This is a wrapper component which is used in both FinalResults component and QuizQa component
// Because both component's base style looks the same.
const QuizPlayWrapper = ({children}:propsType) =>{

    return(
        <>
            <div className=" w-full h-full bg-[#ae9bf2] relative">
                <div className="">
                    <img className="w-full" src={celebrateSvg} alt="" />
                </div>
                <div className=" absolute bottom-0 bg-white w-full h-[80vh] rounded-t-3xl">
                    {
                        children
                    }
                </div>
                
            </div>
        </>
    )
}

export default QuizPlayWrapper;