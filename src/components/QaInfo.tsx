type propsType = {
    questionsLength:number;
    currentQaNo:number;
}

const QaInfo = ({currentQaNo, questionsLength}:propsType) =>{

    // This calculates the percentage of the radial progress wrapping the no.of questions attempted.
    const qaAttemptedPercent = Math.round((currentQaNo / questionsLength ) * 100);

    return(
        <>
            <div className=" bg-white rounded-full p-2 absolute top-0 left-[50%] translate-y-[-50%] translate-x-[-50%]">
                {/* The below type error is from the Daisy-UI radial progress component to avoid that i used ts-ignore
                    because it has nothing to do with the app's type safety and logics */}
                {/* @ts-ignore */}
                <div className="radial-progress relative text-green-400 transition" style={{ "--value": qaAttemptedPercent }} role="progressbar">
                    <div className=" flex justify-center items-center absolute w-full h-full bg-white rounded-full -z-10 border-slate-100 border-8">
                        <h2 className=" nunito-font">
                            <span className=" font-[700] italic text-black text-3xl">
                                {currentQaNo}
                            </span>
                            <span className="text-slate-400 italic">/</span>
                            <span className=" text-slate-400 italic">
                                {questionsLength}
                            </span>
                        </h2>
                    </div>
                </div>
            </div>
        </>
    )
}

export default QaInfo;