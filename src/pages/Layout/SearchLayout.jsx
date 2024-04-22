import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import { Link, Outlet } from "react-router-dom";

const SearchLayout = () => {
    const [openAnswers, setOpenAnswers] = useState({});

    // Function to toggle the visibility of the answer
    const toggleAnswer = (targetId) => {
        setOpenAnswers(prevState => ({
            ...prevState,
            [targetId]: !prevState[targetId] // Toggle the visibility of the target answer
        }));
    };

    const [images,setImageId] = useState([])
    useEffect(() =>{
        fetch('/Images.json')
        .then(response => response.json())
        .then(data => setImageId(data))
    },[])

    console.log(images)

    return (
        <>
            <Navbar />
            <div className="grid grid-cols-10 w-[80%] mx-auto">
                <div className="col-span-3 bg-white h-screen ">
                    <div className="bg-white pt-14 menu">


                        <section className="max-w-5xl mx-auto">
                            <div className="w-full px-7 md:px-10 xl:px-2 bg-white">
                                <div className="mx-auto w-full max-w-5xl border border-slate-400/20 rounded-lg bg-white ">
                                    <div className="border-b border-[#0A071B]/10">
                                        <button
                                            className="question-btn flex w-full items-start gap-x-5 justify-between rounded-lg text-left text-lg font-bold text-slate-800 focus:outline-none p-5"
                                            onClick={() => toggleAnswer('answer-1')} >
                                            <span>ImageId</span>
                                            <svg className={`mt-1.5 md:mt-0 flex-shrink-0 transform h-5 w-5 text-[#5B5675] ${
                                                openAnswers['answer-1'] ? 'rotate-180' : '' // Rotate if this answer is open
                                            }`}
                                                viewBox="0 0 24 24"
                                                xmlns="http://www.w3.org/2000/svg">
                                                <path d="M16.293 9.293 12 13.586 7.707 9.293l-1.414 1.414L12 16.414l5.707-5.707z"></path>
                                            </svg>
                                        </button>

                                        {
                                            images.map(imgg=><div key={imgg.ImageID}
                                                className={`answer pt-2 pb-5 px-5 text-sm lg:text-base text-[#343E3A] font-medium ${
                                                    openAnswers['answer-1'] ? '' : 'hidden' // Show if this answer is open
                                                    }`}
                                                id="answer-1"
                                            >
                                                <Link to={`/searchtec/showimg/${imgg.ImageID}`}  className="hover:text-red-500">{imgg.ImageID}</Link>
                                            </div> )
                                        }

                                        {/* <div
                                            className={`answer pt-2 pb-5 px-5 text-sm lg:text-base text-[#343E3A] font-medium ${
                                                openAnswers['answer-1'] ? '' : 'hidden' // Show if this answer is open
                                                }`}
                                            id="answer-1"
                                        >
                                            <Link to="" className="hover:text-red-500">Peer-reviewed (1222)</Link>
                                        </div> */}
                                        
                                    </div>
                                </div>
                            </div>
                        </section>
                        
                        <section className="max-w-5xl mx-auto ">
                            <div className="w-full px-7 md:px-10 xl:px-2 pt-4 bg-white">
                                <div className="mx-auto w-full max-w-5xl border border-slate-400/20 rounded-lg bg-white ">
                                    <div className="border-b border-[#0A071B]/10">
                                        <button
                                            className="question-btn flex w-full items-start gap-x-5 justify-between rounded-lg text-left text-lg font-bold text-slate-800 focus:outline-none p-5"
                                            onClick={() => toggleAnswer('answer-2')} >
                                            <span>Resource Types</span>
                                            <svg className={`mt-1.5 md:mt-0 flex-shrink-0 transform h-5 w-5 text-[#5B5675] ${
                                                openAnswers['answer-2'] ? 'rotate-180' : '' // Rotate if this answer is open
                                            }`}
                                                viewBox="0 0 24 24"
                                                xmlns="http://www.w3.org/2000/svg">
                                                <path d="M16.293 9.293 12 13.586 7.707 9.293l-1.414 1.414L12 16.414l5.707-5.707z"></path>
                                            </svg>
                                        </button>
                                        <div
                                            className={`answer pt-2 pb-5 px-5 text-sm lg:text-base text-[#343E3A] font-medium ${
                                                openAnswers['answer-2'] ? '' : 'hidden' // Show if this answer is open
                                                }`}
                                            id="answer-2"
                                        >
                                            <Link to="" className="hover:text-red-500">Articles (1222)</Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Third Section */}
                        <section className="max-w-5xl mx-auto ">
                            <div className="w-full px-7 md:px-10 xl:px-2 pt-4 bg-white">
                                <div className="mx-auto w-full max-w-5xl border border-slate-400/20 rounded-lg bg-white ">
                                    <div className="border-b border-[#0A071B]/10">
                                        <button
                                            className="question-btn flex w-full items-start gap-x-5 justify-between rounded-lg text-left text-lg font-bold text-slate-800 focus:outline-none p-5"
                                            onClick={() => toggleAnswer('answer-3')} >
                                            <span>Dates</span>
                                            <svg className={`mt-1.5 md:mt-0 flex-shrink-0 transform h-5 w-5 text-[#5B5675] ${
                                                openAnswers['answer-3'] ? 'rotate-180' : '' // Rotate if this answer is open
                                            }`}
                                                viewBox="0 0 24 24"
                                                xmlns="http://www.w3.org/2000/svg">
                                                <path d="M16.293 9.293 12 13.586 7.707 9.293l-1.414 1.414L12 16.414l5.707-5.707z"></path>
                                            </svg>
                                        </button>
                                        <div
                                            className={`answer pt-2 pb-5 px-5 text-sm lg:text-base text-[#343E3A] font-medium ${
                                                openAnswers['answer-3'] ? '' : 'hidden' // Show if this answer is open
                                                }`}
                                            id="answer-3"
                                        >
                                            <Link to="" className="hover:text-red-500">5 September 2015</Link>
                                        </div>
                                        <div
                                            className={`answer pt-2 pb-5 px-5 text-sm lg:text-base text-[#343E3A] font-medium ${
                                                openAnswers['answer-3'] ? '' : 'hidden' // Show if this answer is open
                                                }`}
                                            id="answer-3"
                                        >
                                            <Link to="" className="hover:text-red-500">7 September 2017</Link>
                                        </div>
                                        {/* Add more answers as needed */}
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Fourth Section */}
                        <section className="max-w-5xl mx-auto ">
                            <div className="w-full px-7 md:px-10 xl:px-2 pt-4 bg-white">
                                <div className="mx-auto w-full max-w-5xl border border-slate-400/20 rounded-lg bg-white ">
                                    <div className="border-b border-[#0A071B]/10">
                                        <button
                                            className="question-btn flex w-full items-start gap-x-5 justify-between rounded-lg text-left text-lg font-bold text-slate-800 focus:outline-none p-5"
                                            onClick={() => toggleAnswer('answer-4')} >
                                            <span>Location</span>
                                            <svg className={`mt-1.5 md:mt-0 flex-shrink-0 transform h-5 w-5 text-[#5B5675] ${
                                                openAnswers['answer-4'] ? 'rotate-180' : '' // Rotate if this answer is open
                                            }`}
                                                viewBox="0 0 24 24"
                                                xmlns="http://www.w3.org/2000/svg">
                                                <path d="M16.293 9.293 12 13.586 7.707 9.293l-1.414 1.414L12 16.414l5.707-5.707z"></path>
                                            </svg>
                                        </button>
                                        {/* Add more answers as needed */}
                                        <div
                                            className={`answer pt-2 pb-5 px-5 text-sm lg:text-base text-[#343E3A] font-medium ${
                                                openAnswers['answer-4'] ? '' : 'hidden' // Show if this answer is open
                                                }`}
                                            id="answer-4"
                                        >
                                            <Link to="" className="hover:text-red-500">Australia</Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Fifth Section */}
                        <section className="max-w-5xl mx-auto ">
                            <div className="w-full px-7 md:px-10 xl:px-2 pt-4 bg-white">
                                <div className="mx-auto w-full max-w-5xl border border-slate-400/20 rounded-lg bg-white ">
                                    <div className="border-b border-[#0A071B]/10">
                                        <button
                                            className="question-btn flex w-full items-start gap-x-5 justify-between rounded-lg text-left text-lg font-bold text-slate-800 focus:outline-none p-5"
                                            onClick={() => toggleAnswer('answer-5')} >
                                            <span>Subjects</span>
                                            <svg className={`mt-1.5 md:mt-0 flex-shrink-0 transform h-5 w-5 text-[#5B5675] ${
                                                openAnswers['answer-5'] ? 'rotate-180' : '' // Rotate if this answer is open
                                            }`}
                                                viewBox="0 0 24 24"
                                                xmlns="http://www.w3.org/2000/svg">
                                                <path d="M16.293 9.293 12 13.586 7.707 9.293l-1.414 1.414L12 16.414l5.707-5.707z"></path>
                                            </svg>
                                        </button>
                                        {/* Add more answers as needed */}
                                        <div
                                            className={`answer pt-2 pb-5 px-5 text-sm lg:text-base text-[#343E3A] font-medium ${
                                                openAnswers['answer-5'] ? '' : 'hidden' // Show if this answer is open
                                                }`}
                                            id="answer-5"
                                        >
                                            <Link to="" className="hover:text-red-500">Science</Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Add more sections as needed */}
                    </div>
                </div>
                <div className="col-span-7 pt-14 pl-6">
                    <Outlet />
                </div>
            </div>
        </>
    );
};

export default SearchLayout;
