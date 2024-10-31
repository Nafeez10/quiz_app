const Questions = () =>{

    return(
        <>
            <div className="pt-14 mx-auto px-5 flex flex-col h-full ">
                <h3 className=" text-black nunito-font text-xl">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt voluptatum quasi at fugiat facere eius quisquam voluptatibus commodi officia. Cupiditate!?
                </h3>
                <div className="mt-10 overflow-y-auto scroll-hidden flex flex-col gap-5 flex-grow">
                    <div className=" option option-s ">
                        <input className=" checkbox-success [--chkbg:#41da6a] [--chkfg:white] checkbox bord er-2 border-neutral-400" type="checkbox" />
                        <p>Data Analysis</p>
                    </div>
                </div>
                <div className="">
                    <button className="main-btn my-4 ">
                        Next
                    </button>
                </div>
            </div>
        </>
    )
}

export default Questions;