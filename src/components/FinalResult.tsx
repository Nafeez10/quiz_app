import { guageSvg } from "../assets"
import QuizPlayWrapper from "./QuizPlayWrapper"

const FinalResult = () =>{

    return(
        <>
            <QuizPlayWrapper>
                <div className="px-10 nunito-font text-black flex flex-col justify-between border-2 h-full">
                    <div>
                        <h2 className="mt-10 text-2xl tracking-wide text-center">Your Result</h2>
                        <div className="">
                            <div className=" bor der-2 relative w-[200px] mx-auto">
                                <img className=" w-full" src={guageSvg} alt="" />
                                <div className=" flex justify-center items-center absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] rounded-full w-[65px] h-[65px] bg-white">
                                    <h3 className=" text-xl font-extrabold">
                                        60%
                                    </h3>
                                </div>
                            </div>
                        </div>
                        <div className=" flex flex-col gap-5">
                            <div className=" bg-green-100 flex items-center gap-5 px-5 py-6 rounded-lg">
                                <span className=" block bg-green-400 w-4 h-4 rounded-full"></span>
                                <p>
                                    3
                                </p>
                                <p className=" text-slate-400">
                                    Correct
                                </p>
                            </div>
                            <div className=" bg-red-100 flex items-center gap-5 px-5 py-6 rounded-lg">
                                <span className=" block bg-red-400 w-4 h-4 rounded-full"></span>
                                <p>
                                    2
                                </p>
                                <p className=" text-slate-400">
                                    Correct
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className=" mb-10">
                        <button className=" main-btn">
                            Start Again
                        </button>
                    </div>
                </div>
            </QuizPlayWrapper>
        </>
    )
}

export default FinalResult