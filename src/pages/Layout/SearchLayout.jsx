import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";



const SearchLayout = () => {
    const [openAnswers, setOpenAnswers] = useState({});
    const [activeFilters, setActiveFilters] = useState([]);

    // Function to toggle the visibility of the answer
    const toggleAnswer = (targetId) => {
        setOpenAnswers(prevState => ({
            ...prevState,
            [targetId]: !prevState[targetId] // Toggle the visibility of the target answer
        }));
    };

    const [artifacts, setArtifacts] = useState([]);
    useEffect(() => {
        fetch('/dummyDataSearch.json')
            .then(response => response.json())
            .then(data => setArtifacts(data))
    }, [activeFilters]); // Update artifacts when activeFilters change


   const {data: allArtefacts = [],isPending,error} = useQuery({
    queryKey:['all-artefacts'],
    queryFn: async () =>{
        const res =  await fetch('http://localhost:5000/artefacts-all')
        return res.json();
    }
   })
console.log(allArtefacts);

if (isPending) return <div className="flex justify-center items-center h-screen">
<div className="relative inline-flex">
    <div className="w-8 h-8 bg-blue-500 rounded-full"></div>
    <div className="w-8 h-8 bg-blue-500 rounded-full absolute top-0 left-0 animate-ping"></div>
    <div className="w-8 h-8 bg-blue-500 rounded-full absolute top-0 left-0 animate-pulse"></div>
</div>
</div>

if (error) return 'An error has occurred: ' + error.message










    let desired_artifact = (details) => {
        let unique_values = [
            ...new Set(details.map((element) => element.artefactType)),
        ];
        return unique_values;
    };
    const uniqueArtifactType = desired_artifact(artifacts);

    let desired_painter = (details) => {
        let unique_values = [
            ...new Set(details.map((element) => element.painter)),
        ];
        return unique_values;
    };
    const uniquePainter = desired_painter(artifacts);

    let desired_provenance = (details) => {
        let unique_values = [
            ...new Set(details.map((element) => element.provenance)),
        ];
        return unique_values;
    };
    const uniqueProvenance = desired_provenance(artifacts);

    let desired_dimensions = (details) => {
        let unique_values = [
            ...new Set(details.map((element) => element.physicalDimensions)),
        ];
        return unique_values;
    };
    const uniquePhysicalDimensions = desired_dimensions(artifacts);

    // Function to handle clicking on a filter
    const handleFilterClick = (filter) => {
        // Check if filter is already active, if not add it
        if (!activeFilters.includes(filter)) {
            setActiveFilters(prevFilters => [...prevFilters, filter]);
        } else {
            // If filter is already active, remove it
            setActiveFilters(prevFilters => prevFilters.filter(item => item !== filter));
        }
    };

    // Function to filter artifacts based on active filters
    const filterArtifacts = () => {
        let filteredArtifacts = [...artifacts];
        // Apply all active filters
        activeFilters.forEach(filter => {
            filteredArtifacts = filteredArtifacts.filter(artifact => {
                // Check if the artifact matches the current filter
                return artifact.artefactType === filter || artifact.painter === filter || artifact.provenance === filter || artifact.physicalDimensions === filter;
            });
        });
        return filteredArtifacts;
    };

    // Function to clear all active filters
    const clearFilters = () => {
        setActiveFilters([]);
    };
 

     const handleSearch=(e) => {
        e.preventDefault();
        const search = e.target.q.value;
        handleFilterClick(search)
        // console.log(search);
     }

    return (
        <>
            <Navbar />
            <div className="grid grid-cols-10 w-[80%] mx-auto">
                <div className="col-span-3 bg-white h-screen ">
                    <div className="bg-white pt-14 menu overflow-y-scroll max-h-screen">


                        {/* Active filters */}
                        <div className="mb-5 ml-5">
                            <h3 className="font-bold text-lg bg-[#E22232] text-white py-1 px-4 rounded">Active filters:</h3>
                            <ul className="mt-2 bg-slate-100 p-2">
                                {activeFilters.map((filter, index) => (
                                    <li key={index} className="text-sm text-gray-600">
                                        {filter}
                                        <button onClick={() => handleFilterClick(filter)} className="ml-1 text-red-500">x</button>
                                    </li>
                                ))}
                            </ul>
                            <button onClick={clearFilters} className="mt-2 text-sm text-gray-600 hover:text-red-500">Clear all</button>
                        </div>



                        <section className="max-w-5xl mx-auto ">
                            <div className="w-full px-7 md:px-10 xl:px-2 pt-4 bg-white">
                                <div className="mx-auto w-full max-w-5xl border border-slate-400/20 rounded-lg bg-white ">
                                    <div className="border-b border-[#0A071B]/10">
                                        <button
                                            className="question-btn flex w-full items-start gap-x-5 justify-between rounded-lg text-left text-lg font-bold text-slate-800 focus:outline-none p-5"
                                            onClick={() => toggleAnswer('answer-2')} >
                                            <span>Artefact Type</span>
                                            <svg className={`mt-1.5 md:mt-0 flex-shrink-0 transform h-5 w-5 text-[#5B5675] ${
                                                openAnswers['answer-2'] ? 'rotate-180' : '' // Rotate if this answer is open
                                            }`}
                                                viewBox="0 0 24 24"
                                                xmlns="http://www.w3.org/2000/svg">
                                                <path d="M16.293 9.293 12 13.586 7.707 9.293l-1.414 1.414L12 16.414l5.707-5.707z"></path>
                                            </svg>
                                        </button>


                                        {/* search bar in attributes */}

                                        <div className={`answer pt-2 pb-5 px-5 text-sm lg:text-base text-[#343E3A] font-medium ${
                                                    openAnswers['answer-2'] ? '' : 'hidden' }`}
                                                id="answer-2">
                                                   <form onSubmit={handleSearch} className="flex w-full justify-center items-center ">
                                                        <div className="flex relative rounded-md w-full">
                                                            <input type="text" name="q" id="query" placeholder="search"
                                                                className="w-full p-2 rounded-md border-1 border-r-white rounded-r-none bg-slate-100 border-gray-300 placeholder-gray-500 dark:placeholder-gray-300 dark:bg-gray-500dark:text-gray-300 dark:border-none " />
                                                            <button type='submit'
                                                            className="inline-flex items-center gap-1 bg-[#E22232] text-white text-lg font-semibold py-3 px-6 rounded-r-md">
                                                                
                                                                <span className="hidden md:block">
                                                                    <svg className="text-gray-200 h-5 w-5 p-0 fill-current" xmlns="http://www.w3.org/2000/svg"
                                                                        version="1.1" x="0px" y="0px"
                                                                        viewBox="0 0 56.966 56.966" 
                                                                        width="512px" height="512px">
                                                                        <path
                                                                            d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z" />
                                                                    </svg>
                                                                </span>
                                                            </button>
                                                        </div>
                                                    </form>
                                        </div>

                                        {/*End search bar in attributes */}

                                        {
                                            uniqueArtifactType.map(aArtifact => <div key={aArtifact}
                                                className={`answer pt-2 pb-5 px-5 text-sm lg:text-base text-[#343E3A] font-medium ${
                                                    openAnswers['answer-2'] ? '' : 'hidden' // Show if this answer is open
                                                    }`}
                                                id="answer-2"
                                            >

                                                <Link to="#" className="hover:text-red-500" onClick={() => handleFilterClick(aArtifact)}>{aArtifact}</Link>
                                            </div>)
                                        }
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
                                            onClick={() => toggleAnswer('answer-3')} >
                                            <span>Painter</span>
                                            <svg className={`mt-1.5 md:mt-0 flex-shrink-0 transform h-5 w-5 text-[#5B5675] ${
                                                openAnswers['answer-3'] ? 'rotate-180' : '' // Rotate if this answer is open
                                            }`}
                                                viewBox="0 0 24 24"
                                                xmlns="http://www.w3.org/2000/svg">
                                                <path d="M16.293 9.293 12 13.586 7.707 9.293l-1.414 1.414L12 16.414l5.707-5.707z"></path>
                                            </svg>
                                        </button>
                                       
                                       
                                        {/* search bar in attributes */}

                                        <div className={`answer pt-2 pb-5 px-5 text-sm lg:text-base text-[#343E3A] font-medium ${
                                                    openAnswers['answer-3'] ? '' : 'hidden' }`}
                                                id="answer-3">
                                                   <form onSubmit={handleSearch} className="flex w-full justify-center items-center ">
                                                        <div className="flex relative rounded-md w-full">
                                                            <input type="text" name="q" id="query" placeholder="search"
                                                                className="w-full p-2 rounded-md border-1 border-r-white rounded-r-none bg-slate-100 border-gray-300 placeholder-gray-500 dark:placeholder-gray-300 dark:bg-gray-500dark:text-gray-300 dark:border-none " />
                                                            <button type='submit'
                                                            className="inline-flex items-center gap-1 bg-[#E22232] text-white text-lg font-semibold py-3 px-6 rounded-r-md">
                                                                
                                                                <span className="hidden md:block">
                                                                    <svg className="text-gray-200 h-5 w-5 p-0 fill-current" xmlns="http://www.w3.org/2000/svg"
                                                                        version="1.1" x="0px" y="0px"
                                                                        viewBox="0 0 56.966 56.966" 
                                                                        width="512px" height="512px">
                                                                        <path
                                                                            d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z" />
                                                                    </svg>
                                                                </span>
                                                            </button>
                                                        </div>
                                                    </form>
                                        </div>

                                        {/*End search bar in attributes */}
                                       
                                        {
                                            uniquePainter.map(aArtifact => <div key={aArtifact}
                                                className={`answer pt-2 pb-5 px-5 text-sm lg:text-base text-[#343E3A] font-medium ${
                                                    openAnswers['answer-3'] ? '' : 'hidden' // Show if this answer is open
                                                    }`}
                                                id="answer-3"
                                            >
                                                <Link to="#" className="hover:text-red-500" onClick={() => handleFilterClick(aArtifact)}>{aArtifact}</Link>
                                            </div>)
                                        }
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
                                            onClick={() => toggleAnswer('answer-4')} >
                                            <span>Provenance</span>
                                            <svg className={`mt-1.5 md:mt-0 flex-shrink-0 transform h-5 w-5 text-[#5B5675] ${
                                                openAnswers['answer-4'] ? 'rotate-180' : '' // Rotate if this answer is open
                                            }`}
                                                viewBox="0 0 24 24"
                                                xmlns="http://www.w3.org/2000/svg">
                                                <path d="M16.293 9.293 12 13.586 7.707 9.293l-1.414 1.414L12 16.414l5.707-5.707z"></path>
                                            </svg>
                                        </button>
                                       
                                        {/* search bar in attributes */}

                                        <div className={`answer pt-2 pb-5 px-5 text-sm lg:text-base text-[#343E3A] font-medium ${
                                                    openAnswers['answer-4'] ? '' : 'hidden' }`}
                                                id="answer-4">
                                                   <form onSubmit={handleSearch} className="flex w-full justify-center items-center ">
                                                        <div className="flex relative rounded-md w-full">
                                                            <input type="text" name="q" id="query" placeholder="search"
                                                                className="w-full p-2 rounded-md border-1 border-r-white rounded-r-none bg-slate-100 border-gray-300 placeholder-gray-500 dark:placeholder-gray-300 dark:bg-gray-500dark:text-gray-300 dark:border-none " />
                                                            <button type='submit'
                                                            className="inline-flex items-center gap-1 bg-[#E22232] text-white text-lg font-semibold py-3 px-6 rounded-r-md">
                                                                
                                                                <span className="hidden md:block">
                                                                    <svg className="text-gray-200 h-5 w-5 p-0 fill-current" xmlns="http://www.w3.org/2000/svg"
                                                                        version="1.1" x="0px" y="0px"
                                                                        viewBox="0 0 56.966 56.966" 
                                                                        width="512px" height="512px">
                                                                        <path
                                                                            d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z" />
                                                                    </svg>
                                                                </span>
                                                            </button>
                                                        </div>
                                                    </form>
                                        </div>

                                        {/*End search bar in attributes */}
                                       
                                        {
                                            uniqueProvenance.map(aProvenance => <div key={aProvenance}
                                                className={`answer pt-2 pb-5 px-5 text-sm lg:text-base text-[#343E3A] font-medium ${
                                                    openAnswers['answer-4'] ? '' : 'hidden' // Show if this answer is open
                                                    }`}
                                                id="answer-4"
                                            >
                                                <Link to="#" className="hover:text-red-500" onClick={() => handleFilterClick(aProvenance)}>{aProvenance}</Link>
                                            </div>)
                                        }
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
                                            onClick={() => toggleAnswer('answer-5')} >
                                            <span>Physical Dimensions</span>
                                            <svg className={`mt-1.5 md:mt-0 flex-shrink-0 transform h-5 w-5 text-[#5B5675] ${
                                                openAnswers['answer-5'] ? 'rotate-180' : '' // Rotate if this answer is open
                                            }`}
                                                viewBox="0 0 24 24"
                                                xmlns="http://www.w3.org/2000/svg">
                                                <path d="M16.293 9.293 12 13.586 7.707 9.293l-1.414 1.414L12 16.414l5.707-5.707z"></path>
                                            </svg>
                                        </button>
                                       
                                        {/* search bar in attributes */}

                                        <div className={`answer pt-2 pb-5 px-5 text-sm lg:text-base text-[#343E3A] font-medium ${
                                                    openAnswers['answer-5'] ? '' : 'hidden' }`}
                                                id="answer-5">
                                                   <form onSubmit={handleSearch} className="flex w-full justify-center items-center ">
                                                        <div className="flex relative rounded-md w-full">
                                                            <input type="text" name="q" id="query" placeholder="search"
                                                                className="w-full p-2 rounded-md border-1 border-r-white rounded-r-none bg-slate-100 border-gray-300 placeholder-gray-500 dark:placeholder-gray-300 dark:bg-gray-500dark:text-gray-300 dark:border-none " />
                                                            <button type='submit'
                                                            className="inline-flex items-center gap-1 bg-[#E22232] text-white text-lg font-semibold py-3 px-6 rounded-r-md">
                                                                
                                                                <span className="hidden md:block">
                                                                    <svg className="text-gray-200 h-5 w-5 p-0 fill-current" xmlns="http://www.w3.org/2000/svg"
                                                                        version="1.1" x="0px" y="0px"
                                                                        viewBox="0 0 56.966 56.966" 
                                                                        width="512px" height="512px">
                                                                        <path
                                                                            d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z" />
                                                                    </svg>
                                                                </span>
                                                            </button>
                                                        </div>
                                                    </form>
                                        </div>

                                        {/*End search bar in attributes */}
                                       
                                        {
                                            uniquePhysicalDimensions.map(aDimensions => <div key={aDimensions}
                                                className={`answer pt-2 pb-5 px-5 text-sm lg:text-base text-[#343E3A] font-medium ${
                                                    openAnswers['answer-5'] ? '' : 'hidden' // Show if this answer is open
                                                    }`}
                                                id="answer-5"
                                            >
                                                <Link to="#" className="hover:text-red-500" onClick={() => handleFilterClick(aDimensions)}>{aDimensions}</Link>
                                            </div>)
                                        }
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Add more sections as needed */}
                    </div>
                </div>
                <div className="col-span-7 pt-14 pl-6">
                    {/* Display filtered artifacts */}
                    {filterArtifacts().map((artifact, index) => (
                        <div key={index} className="border-b border-gray-300 px-3 py-4">
                            <img className="h-28 rounded" src={artifact.URL} alt="" />
                            <h2 className="text-xl font-bold text-gray-800">{artifact.artefactType}</h2>
                            <h3 className="text-red-600">Painter: {artifact.painter} || Dimension: {artifact.physicalDimensions}</h3>

                            <p className="text-gray-600"><span className="font-semibold">Provenance:</span> {artifact.provenance}</p>
                            <p className="text-gray-600"><span className="font-semibold">Publications:</span> {artifact.publications}</p>
                            <p className="text-gray-600"><span className="font-semibold">Description:</span> {artifact.description}</p>
                            {/* Add more details as needed */}
                        </div>
                    ))}
                    {/* <Outlet /> */}
                </div>
            </div>
        </>
    );
};

export default SearchLayout;




















// import { useEffect, useState } from "react";
// import Navbar from "../../components/Navbar";
// import { Link, Outlet } from "react-router-dom";

// const SearchLayout = () => {
//     const [openAnswers, setOpenAnswers] = useState({});

//     // Function to toggle the visibility of the answer
//     const toggleAnswer = (targetId) => {
//         setOpenAnswers(prevState => ({
//             ...prevState,
//             [targetId]: !prevState[targetId] // Toggle the visibility of the target answer
//         }));
//     };

//     const [images,setImageId] = useState([])
//     useEffect(() =>{
//         fetch('/Images.json')
//         .then(response => response.json())
//         .then(data => setImageId(data))
//     },[])

//     const [artifact,setArtifact] = useState([])
//     useEffect(() =>{
//         fetch('/dummyDataSearch.json')
//         .then(response => response.json())
//         .then(data => setArtifact(data))
//     },[])
//     //  console.log(artifact)
//     let desired_artifact = (details) => {
//         let unique_values = [
//             ...new Set(details.map((element) => element.artefactType)),
//         ];
//         return unique_values;
//     };
     
//     const uniqueArtifactType = desired_artifact(artifact);
//     console.log(uniqueArtifactType)

//     return (
//         <>
//             <Navbar />
//             <div className="grid grid-cols-10 w-[80%] mx-auto">
//                 <div className="col-span-3 bg-white h-screen ">
//                     <div className="bg-white pt-14 menu overflow-y-scroll max-h-screen">


//                         <section className="max-w-5xl mx-auto">
//                             <div className="w-full px-7 md:px-10 xl:px-2 bg-white">
//                                 <div className="mx-auto w-full max-w-5xl border border-slate-400/20 rounded-lg bg-white ">
//                                     <div className="border-b border-[#0A071B]/10">
//                                         <button
//                                             className="question-btn flex w-full items-start gap-x-5 justify-between rounded-lg text-left text-lg font-bold text-slate-800 focus:outline-none p-5"
//                                             onClick={() => toggleAnswer('answer-1')} >
//                                             <span>ImageId</span>
//                                             <svg className={`mt-1.5 md:mt-0 flex-shrink-0 transform h-5 w-5 text-[#5B5675] ${
//                                                 openAnswers['answer-1'] ? 'rotate-180' : '' // Rotate if this answer is open
//                                             }`}
//                                                 viewBox="0 0 24 24"
//                                                 xmlns="http://www.w3.org/2000/svg">
//                                                 <path d="M16.293 9.293 12 13.586 7.707 9.293l-1.414 1.414L12 16.414l5.707-5.707z"></path>
//                                             </svg>
//                                         </button>
//                                         {
//                                             images.map(imgg=><div key={imgg.ImageID}
//                                                 className={`answer pt-2 pb-5 px-5 text-sm lg:text-base text-[#343E3A] font-medium flex justify-between ${
//                                                     openAnswers['answer-1'] ? '' : 'hidden' // Show if this answer is open
//                                                     }`}
//                                                 id="answer-1"
//                                             >
//                                                 <Link to={`/searchtec/showimg/${imgg.ImageID}`}  className="hover:text-red-500">{imgg.ImageID}</Link>
//                                                 <Link to="/searchtec/all" className=" ml-2 hover:text-red-500" >Cancel</Link>
//                                             </div> )
//                                         }                                        
//                                     </div>
//                                 </div>
//                             </div>
//                         </section>
                        
//                         <section className="max-w-5xl mx-auto ">
//                             <div className="w-full px-7 md:px-10 xl:px-2 pt-4 bg-white">
//                                 <div className="mx-auto w-full max-w-5xl border border-slate-400/20 rounded-lg bg-white ">
//                                     <div className="border-b border-[#0A071B]/10">
//                                         <button
//                                             className="question-btn flex w-full items-start gap-x-5 justify-between rounded-lg text-left text-lg font-bold text-slate-800 focus:outline-none p-5"
//                                             onClick={() => toggleAnswer('answer-2')} >
//                                             <span>Artefact Type</span>
//                                             <svg className={`mt-1.5 md:mt-0 flex-shrink-0 transform h-5 w-5 text-[#5B5675] ${
//                                                 openAnswers['answer-2'] ? 'rotate-180' : '' // Rotate if this answer is open
//                                             }`}
//                                                 viewBox="0 0 24 24"
//                                                 xmlns="http://www.w3.org/2000/svg">
//                                                 <path d="M16.293 9.293 12 13.586 7.707 9.293l-1.414 1.414L12 16.414l5.707-5.707z"></path>
//                                             </svg>
//                                         </button>
//                                        {
//                                         uniqueArtifactType.map(aArtifact=>  <div key={aArtifact}
//                                             className={`answer pt-2 pb-5 px-5 text-sm lg:text-base text-[#343E3A] font-medium ${
//                                                 openAnswers['answer-2'] ? '' : 'hidden' // Show if this answer is open
//                                                 }`}
//                                             id="answer-2"
//                                         >
//                                             <Link to="" className="hover:text-red-500">{aArtifact}</Link>
//                                         </div>)
//                                        }
//                                     </div>
//                                 </div>
//                             </div>
//                         </section>

//                         {/* Third Section */}
//                         <section className="max-w-5xl mx-auto ">
//                             <div className="w-full px-7 md:px-10 xl:px-2 pt-4 bg-white">
//                                 <div className="mx-auto w-full max-w-5xl border border-slate-400/20 rounded-lg bg-white ">
//                                     <div className="border-b border-[#0A071B]/10">
//                                         <button
//                                             className="question-btn flex w-full items-start gap-x-5 justify-between rounded-lg text-left text-lg font-bold text-slate-800 focus:outline-none p-5"
//                                             onClick={() => toggleAnswer('answer-3')} >
//                                             <span>Dates</span>
//                                             <svg className={`mt-1.5 md:mt-0 flex-shrink-0 transform h-5 w-5 text-[#5B5675] ${
//                                                 openAnswers['answer-3'] ? 'rotate-180' : '' // Rotate if this answer is open
//                                             }`}
//                                                 viewBox="0 0 24 24"
//                                                 xmlns="http://www.w3.org/2000/svg">
//                                                 <path d="M16.293 9.293 12 13.586 7.707 9.293l-1.414 1.414L12 16.414l5.707-5.707z"></path>
//                                             </svg>
//                                         </button>
//                                         <div
//                                             className={`answer pt-2 pb-5 px-5 text-sm lg:text-base text-[#343E3A] font-medium ${
//                                                 openAnswers['answer-3'] ? '' : 'hidden' // Show if this answer is open
//                                                 }`}
//                                             id="answer-3"
//                                         >
//                                             <Link to="" className="hover:text-red-500">5 September 2015</Link>
//                                         </div>
//                                         <div
//                                             className={`answer pt-2 pb-5 px-5 text-sm lg:text-base text-[#343E3A] font-medium ${
//                                                 openAnswers['answer-3'] ? '' : 'hidden' // Show if this answer is open
//                                                 }`}
//                                             id="answer-3"
//                                         >
//                                             <Link to="" className="hover:text-red-500">7 September 2017</Link>
//                                         </div>
//                                         {/* Add more answers as needed */}
//                                     </div>
//                                 </div>
//                             </div>
//                         </section>

//                         {/* Fourth Section */}
//                         <section className="max-w-5xl mx-auto ">
//                             <div className="w-full px-7 md:px-10 xl:px-2 pt-4 bg-white">
//                                 <div className="mx-auto w-full max-w-5xl border border-slate-400/20 rounded-lg bg-white ">
//                                     <div className="border-b border-[#0A071B]/10">
//                                         <button
//                                             className="question-btn flex w-full items-start gap-x-5 justify-between rounded-lg text-left text-lg font-bold text-slate-800 focus:outline-none p-5"
//                                             onClick={() => toggleAnswer('answer-4')} >
//                                             <span>Location</span>
//                                             <svg className={`mt-1.5 md:mt-0 flex-shrink-0 transform h-5 w-5 text-[#5B5675] ${
//                                                 openAnswers['answer-4'] ? 'rotate-180' : '' // Rotate if this answer is open
//                                             }`}
//                                                 viewBox="0 0 24 24"
//                                                 xmlns="http://www.w3.org/2000/svg">
//                                                 <path d="M16.293 9.293 12 13.586 7.707 9.293l-1.414 1.414L12 16.414l5.707-5.707z"></path>
//                                             </svg>
//                                         </button>
//                                         {/* Add more answers as needed */}
//                                         <div
//                                             className={`answer pt-2 pb-5 px-5 text-sm lg:text-base text-[#343E3A] font-medium ${
//                                                 openAnswers['answer-4'] ? '' : 'hidden' // Show if this answer is open
//                                                 }`}
//                                             id="answer-4"
//                                         >
//                                             <Link to="" className="hover:text-red-500">Australia</Link>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                         </section>

//                         {/* Fifth Section */}
//                         <section className="max-w-5xl mx-auto ">
//                             <div className="w-full px-7 md:px-10 xl:px-2 pt-4 bg-white">
//                                 <div className="mx-auto w-full max-w-5xl border border-slate-400/20 rounded-lg bg-white ">
//                                     <div className="border-b border-[#0A071B]/10">
//                                         <button
//                                             className="question-btn flex w-full items-start gap-x-5 justify-between rounded-lg text-left text-lg font-bold text-slate-800 focus:outline-none p-5"
//                                             onClick={() => toggleAnswer('answer-5')} >
//                                             <span>Subjects</span>
//                                             <svg className={`mt-1.5 md:mt-0 flex-shrink-0 transform h-5 w-5 text-[#5B5675] ${
//                                                 openAnswers['answer-5'] ? 'rotate-180' : '' // Rotate if this answer is open
//                                             }`}
//                                                 viewBox="0 0 24 24"
//                                                 xmlns="http://www.w3.org/2000/svg">
//                                                 <path d="M16.293 9.293 12 13.586 7.707 9.293l-1.414 1.414L12 16.414l5.707-5.707z"></path>
//                                             </svg>
//                                         </button>
//                                         {/* Add more answers as needed */}
//                                         <div
//                                             className={`answer pt-2 pb-5 px-5 text-sm lg:text-base text-[#343E3A] font-medium ${
//                                                 openAnswers['answer-5'] ? '' : 'hidden' // Show if this answer is open
//                                                 }`}
//                                             id="answer-5"
//                                         >
//                                             <Link to="" className="hover:text-red-500">Science</Link>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                         </section>

//                         {/* Add more sections as needed */}
//                     </div>
//                 </div>
//                 <div className="col-span-7 pt-14 pl-6">
//                     <Outlet />
//                 </div>
//             </div>
//         </>
//     );
// };

// export default SearchLayout;

