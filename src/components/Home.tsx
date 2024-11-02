import { useDispatch, useSelector } from "react-redux";
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
            // This makes the request to the api and fetches the questions for the quiz.
            await dispatch(questionsData()).unwrap();

            // This updates the app state to playing.
            dispatch(changeAppState('playing'));
        }catch{
            toast(
                "Something went wrong!, Don't Forget to run json-server to run the api on your local machine.",
                {
                  duration: 2000,
                }
            );
        }
    }

    const canStart = questionsIsLoading == 'loading' ? true : false;

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
                    <button disabled={canStart} onClick={quizStartHandeler} className="main-btn disabled:brightness-75">
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