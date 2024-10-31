import { ReactNode } from "react";
import { celebrateSvg } from "../assets";

type propsType = {
    children: ReactNode
}

const QuizPlayWrapper = ({children}:propsType) =>{

    return(
        <>
            <div className=" w-full h-full bg-[#ae9bf2] relative">
                <div className="">
                    <img className="w-full" src={celebrateSvg} alt="" />
                </div>
                <div className=" overflow-y-auto absolute bottom-0 bg-white w-full h-[80vh] rounded-t-3xl">
                    {
                        children
                    }
                </div>
                
            </div>
        </>
    )
}

export default QuizPlayWrapper;