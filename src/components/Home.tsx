import { logo } from "../assets";

const Home = () =>{

    const simp ='top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] absolute'

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
                    <button className="main-btn">
                        Start
                    </button>
                </div>
            </div>
        </>
    )
}

export default Home;