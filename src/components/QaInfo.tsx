const QaInfo = () =>{

    return(
        <>
            <div className=" bg-white rounded-full p-2 absolute top-0 left-[50%] translate-y-[-50%] translate-x-[-50%]">
            {/* @ts-ignore */}
                <div className="radial-progress relative text-green-400" style={{ "--value": 20 }} role="progressbar">
                    <div className=" flex justify-center items-center absolute w-full h-full bg-white rounded-full -z-10 border-slate-100 border-8">
                        <h2 className=" nunito-font">
                            <span className=" font-[700] italic text-black text-3xl">
                                1
                            </span>
                            <span className="text-slate-400 italic">/</span>
                            <span className=" text-slate-400 italic">
                                5
                            </span>
                        </h2>
                    </div>
                </div>
            </div>
        </>
    )
}

export default QaInfo;