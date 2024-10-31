import { useDispatch, useSelector } from "react-redux";
import { appStateType } from "../App";
import { logo } from "../assets";
import { DispatchType } from "../store/store";
import { getQuestionsStatus, questionsData } from "../slices/questionsSlice";
import toast from "react-hot-toast";
import { changeAppState } from "../slices/appStateSlice";

const Home = () =>{

    const questionsIsLoading = useSelector(getQuestionsStatus);

    const dispatch = useDispatch<DispatchType>();

    const quizStartHandeler = async() =>{
        try{
            const response = await dispatch(questionsData()).unwrap();
            dispatch(changeAppState('playing'));
        }catch{
            toast(
                "Something went wrong!",
                {
                  duration: 2000,
                }
            );
        }
    }

    // const simp ='top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] absolute'

    return(
        <>
            <div className="w-full flex flex-col justify-between items-center h-full">
                <div className="h-12 mt-4">
                    <img className="h-full mx-auto" src={logo} alt="" />
                </div>
                <div className=" shadow-xl  w-72 h-72 bg-white flex justify-center items-center rounded-full">
                    <h2 className=" text-[#FF3B3F] text-4xl font-bold tracking-wide">Quiz</h2>
                </div>
                <div className="w-full px-10 mb-5">
                    <button onClick={quizStartHandeler} className="main-btn">
                        {
                            questionsIsLoading == "loading" ? "Loading..." : "Start"
                        }
                    </button>
                </div>
            </div>
        </>
    )
}

export default Home;