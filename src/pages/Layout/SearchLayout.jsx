
/**
 * SearchLayout Component
 * 
 * This component is designed to display a list of artifacts based on user search and filters.
 * It includes sections for filtering artifacts by different attributes such as Artefact Type, Painter,
 * Provenance, and Physical Dimensions. Each section contains a search bar to further refine the filters.
 * The component also handles pagination to navigate through the list of filtered artifacts.
 * 
 * Props:
 * - paginatedData: Array of artifacts to be displayed on the current page.
 * - activeFilters: String representing the current search filter applied.
 * - handleClick: Function to handle pagination clicks (previous, next, and page number).
 * - currentPage: Number representing the current page in pagination.
 * - totalPages: Number representing the total number of pages available.
 * - startIndex: Number indicating the start index of the pagination buttons.
 * - endIndex: Number indicating the end index of the pagination buttons.
 * - searching: Image URL to be displayed when no records are found.
 */

import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import searching from '../../assets/searchError.png';


const SearchLayout = () => {
    const [openAnswers, setOpenAnswers] = useState({});
    const [activeFilters, setActiveFilters] = useState([]);
    const [artifacts, setArtifacts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [visiblePages, setVisiblePages] = useState(10);
    const [startIndex, setStartIndex] = useState(0);
    const [endIndex, setEndIndex] = useState(visiblePages - 1);
    
    const [search, setSearch] = useState("");
    const [searchPainter, setSearchPainter] = useState("");
    const [searchProvenance, setSearchProvenance] = useState("");
    const [searchPhysicalDimensions, setSearchPhysicalDimensions] = useState("");


// Function to toggle the visibility of the answer
const toggleAnswer = (targetId) => {
    setOpenAnswers(prevState => ({
        ...prevState,
        [targetId]: !prevState[targetId] // Toggle the visibility of the target answer
    }));
};

// Fetching all data from server - MongoDB database using react-query
const { data: allArtefacts = [], isPending, error } = useQuery({
    queryKey: ['all-artefacts'],
    queryFn: async () => {
        // Make a GET request to fetch the artefacts data
        const res = await fetch('https://trendall-research-center-server.vercel.app/artefacts');
        return res.json();
    },
    // Fetch data only when activeFilters change
    enabled: !!activeFilters,
});

// Log all artefacts to the console for debugging purposes
console.log(allArtefacts);

// Local computer server: http://localhost:5000/artefacts-all

// useEffect hook to update the artifacts state when allArtefacts, isPending, or error changes
useEffect(() => {
    if (!isPending && !error) {
        setArtifacts(allArtefacts); // Update the artifacts state with the fetched data
    }
}, [allArtefacts, isPending, error]);

// Display a loading spinner while data is being fetched
if (isPending) {
    return (
        <div className='flex space-x-3 justify-center items-center bg-white h-screen '>
            <span className='sr-only'>Loading...</span>
            <div className='h-4 w-4 bg-red-600 rounded-full animate-bounce [animation-delay:-0.3s]'></div>
            <div className='h-4 w-4 bg-red-600 rounded-full animate-bounce [animation-delay:-0.15s]'></div>
            <div className='h-4 w-4 bg-red-600 rounded-full animate-bounce'></div>
        </div>
    );
}

// Display an error message if there is an error during data fetching
if (error) {
    return 'An error has occurred: ' + error.message;
}

    // console.log(artifacts)

//     const [artifacts, setArtifacts] = useState([]);
//     useEffect(() => {
//         fetch('/dummyDataSearch.json')
//             .then(response => response.json())
//             .then(data => setArtifacts(data))
//     }, [activeFilters]); // Update artifacts when activeFilters change



 // Function to extract unique artefact types from the details
let desired_artifact = (details) => {
    // Create a set of unique values from the "Artefact Type" field
    let unique_values = [
        ...new Set(details.map((element) => element["Artefact Type"])),
    ];
    return unique_values;
};
// Extract unique artefact types from the artifacts data
const uniqueArtifactType = desired_artifact(artifacts);

// Function to extract unique painters from the details
let desired_painter = (details) => {
    // Create a set of unique values from the "Painter" field
    let unique_values = [
        ...new Set(details.map((element) => element.Painter)),
    ];
    return unique_values;
};
// Extract unique painters from the artifacts data
const uniquePainter = desired_painter(artifacts);

// Function to extract unique provenance from the details
let desired_provenance = (details) => {
    // Create a set of unique values from the "Provenance" field
    let unique_values = [
        ...new Set(details.map((element) => element.Provenance)),
    ];
    return unique_values;
};
// Extract unique provenance from the artifacts data
const uniqueProvenance = desired_provenance(artifacts);

// Function to extract unique physical dimensions from the details
let desired_dimensions = (details) => {
    // Create a set of unique values from the "Physical Dimensions" field
    let unique_values = [
        ...new Set(details.map((element) => element["Physical Dimensions"])),
    ];
    return unique_values;
};
// Extract unique physical dimensions from the artifacts data
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
    // Start with all artifacts
    let filteredArtifacts = [...artifacts];
    // Apply all active filters
    activeFilters.forEach(filter => {
        filteredArtifacts = filteredArtifacts.filter(artifact => {
            // Check if the artifact matches the current filter
            return artifact["Artefact Type"] === filter || artifact.Painter === filter || artifact.Provenance === filter || artifact["Physical Dimensions"] === filter;
        });
    });
    return filteredArtifacts;
};

// Function to clear all active filters
const clearFilters = () => {
    setActiveFilters([]);
};

// Function to handle search form submission
const handleSearch = (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    const search = e.target.q.value; // Get the search query value
    handleFilterClick(search); // Apply the search filter
    // console.log(search); // Log the search query for debugging
}




// Number of items to display per page
const itemsPerPage = 30;

// Calculate the total number of pages needed based on the filtered artifacts
const totalPages = Math.ceil(filterArtifacts().length / itemsPerPage);

// Function to handle pagination button clicks
const handleClick = (type) => {
    if (type === "prev") {
        // Handle "Prev" button click
        setCurrentPage((prevPage) => prevPage - 1);
        if (currentPage - 1 < visiblePages - 1) {
            setVisiblePages((prevVisible) => prevVisible - 1);
            setStartIndex((prevStart) => prevStart - 1);
            setEndIndex((prevEnd) => prevEnd - 1);
        }
    } else if (type === "next") {
        // Handle "Next" button click
        setCurrentPage((prevPage) => prevPage + 1);
        if (currentPage + 1 > visiblePages) {
            setVisiblePages((prevVisible) => prevVisible + 1);
            setStartIndex((prevStart) => prevStart + 1);
            setEndIndex((prevEnd) => prevEnd + 1);
        }
    } else {
        // Handle specific page number button click
        setCurrentPage(type);
    }
};

// Get the data for the current page based on the active filters and pagination settings
const paginatedData = filterArtifacts().slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
);

     
return (
    <>
        {/* Render the Navbar component */}
        <Navbar />
        <div className="md:grid grid-cols-12 w-[90%] mx-auto">

            {/* Dynamic filter search sidebar (Artefact Search left bar) */}
            <div className="md:col-span-3 bg-white h-screen ">
                <div className="bg-white pt-14 menu overflow-y-scroll max-h-screen">

                    {/* Active filters */}
                    <div className="mb-5 ml-5">
                        <h3 className="font-bold text-lg bg-[#E22232] text-white py-1 px-4 rounded">Active filters:</h3>
                        <ul className="mt-2 bg-slate-100 p-4">
                            {/* Map through activeFilters to display them */}
                            {activeFilters.map((filter, index) => (
                                <li key={index} className="text-md text-gray-600">
                                    {filter}
                                    <button onClick={() => handleFilterClick(filter)} className="ml-1 text-red-500">x</button>
                                </li>
                            ))}
                        </ul>
                        <button onClick={clearFilters} className="mt-2 text-md font-semibold text-gray-600 hover:text-red-500">Clear all</button>
                    </div>

                    {/* Artefact Type Filter */}
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

                                    {/* Search bar for filtering Artefact Type */}
                                    <div className={`answer pt-2 pb-5 px-5 text-sm lg:text-base text-[#343E3A] font-medium ${
                                        openAnswers['answer-2'] ? '' : 'hidden' }`}
                                        id="answer-2">
                                        <form onSubmit={handleSearch} onChange={(e)=>{setSearch(e.target.value.toLowerCase())}} className="flex w-full justify-center items-center ">
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
                                    {/* End of Search bar for Artefact Type */}

                                    {/* Render uniqueArtifactType based on search */}
                                    {uniqueArtifactType.filter((item) => { return search.toLowerCase()===''? item : item.toLowerCase().includes(search)}).map(aArtifact => <div key={aArtifact}
                                        className={`answer pt-2 pb-5 px-5 text-sm lg:text-base text-[#343E3A] font-medium ${
                                            openAnswers['answer-2'] ? '' : 'hidden' // Show if this answer is open
                                        }`}
                                        id="answer-2"
                                    >
                                        <Link to="#" className="hover:text-red-500" onClick={() => handleFilterClick(aArtifact)}>{aArtifact}</Link>
                                    </div>)}
                                </div>
                            </div>
                        </div>
                    </section>
                    {/* End of Artefact Type Filter */}

                    <section className="max-w-5xl mx-auto ">
                        <div className="w-full px-7 md:px-10 xl:px-2 pt-4 bg-white">
                            <div className="mx-auto w-full max-w-5xl border border-slate-400/20 rounded-lg bg-white ">
                                <div className="border-b border-[#0A071B]/10">
                                    {/* Button to toggle visibility of the "Painter" filter */}
                                    <button
                                        className="question-btn flex w-full items-start gap-x-5 justify-between rounded-lg text-left text-lg font-bold text-slate-800 focus:outline-none p-5"
                                        onClick={() => toggleAnswer('answer-3')} >
                                        <span>Painter</span>
                                        {/* Icon to indicate whether the answer is open or closed */}
                                        <svg className={`mt-1.5 md:mt-0 flex-shrink-0 transform h-5 w-5 text-[#5B5675] ${
                                            openAnswers['answer-3'] ? 'rotate-180' : '' // Rotate if this answer is open
                                        }`}
                                            viewBox="0 0 24 24"
                                            xmlns="http://www.w3.org/2000/svg">
                                            <path d="M16.293 9.293 12 13.586 7.707 9.293l-1.414 1.414L12 16.414l5.707-5.707z"></path>
                                        </svg>
                                    </button>

                                    {/* Search bar for filtering by "Painter" */}
                                    <div className={`answer pt-2 pb-5 px-5 text-sm lg:text-base text-[#343E3A] font-medium ${
                                        openAnswers['answer-3'] ? '' : 'hidden' }`}
                                        id="answer-3">
                                        <form onSubmit={handleSearch} onChange={(e)=>{setSearchPainter(e.target.value)}} className="flex w-full justify-center items-center ">
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
                                    {/* End of Search bar for "Painter" */}

                                    {/* Render uniquePainter based on search input */}
                                    {uniquePainter.filter((item) => { return searchPainter.toLowerCase()===''? item : item?.toLowerCase().includes(searchPainter)}).map(aArtifact => <div key={aArtifact}
                                        className={`answer pt-2 pb-5 px-5 text-sm lg:text-base text-[#343E3A] font-medium ${
                                            openAnswers['answer-3'] ? '' : 'hidden' // Show if this answer is open
                                        }`}
                                        id="answer-3"
                                    >
                                        <Link to="#" className="hover:text-red-500" onClick={() => handleFilterClick(aArtifact)}>{aArtifact}</Link>
                                    </div>)}
                                </div>
                            </div>
                        </div>
                    </section>

                    <section className="max-w-5xl mx-auto ">
                        <div className="w-full px-7 md:px-10 xl:px-2 pt-4 bg-white">
                            <div className="mx-auto w-full max-w-5xl border border-slate-400/20 rounded-lg bg-white ">
                                <div className="border-b border-[#0A071B]/10">
                                    {/* Button to toggle visibility of the "Provenance" filter */}
                                    <button
                                        className="question-btn flex w-full items-start gap-x-5 justify-between rounded-lg text-left text-lg font-bold text-slate-800 focus:outline-none p-5"
                                        onClick={() => toggleAnswer('answer-4')} >
                                        <span>Provenance</span>
                                        {/* Icon to indicate whether the answer is open or closed */}
                                        <svg className={`mt-1.5 md:mt-0 flex-shrink-0 transform h-5 w-5 text-[#5B5675] ${
                                            openAnswers['answer-4'] ? 'rotate-180' : '' // Rotate if this answer is open
                                        }`}
                                            viewBox="0 0 24 24"
                                            xmlns="http://www.w3.org/2000/svg">
                                            <path d="M16.293 9.293 12 13.586 7.707 9.293l-1.414 1.414L12 16.414l5.707-5.707z"></path>
                                        </svg>
                                    </button>

                                    {/* Search bar for filtering by "Provenance" */}
                                    <div className={`answer pt-2 pb-5 px-5 text-sm lg:text-base text-[#343E3A] font-medium ${
                                        openAnswers['answer-4'] ? '' : 'hidden' }`}
                                        id="answer-4">
                                        <form onSubmit={handleSearch} onChange={(e)=>{setSearchProvenance(e.target.value)}} className="flex w-full justify-center items-center ">
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
                                    {/* End of Search bar for "Provenance" */}

                                    {/* Render uniqueProvenance based on search input */}
                                    {uniqueProvenance.filter((item) => { return searchProvenance.toLowerCase()===''? item : item?.toLowerCase().includes(searchProvenance)}).map(aProvenance => <div key={aProvenance}
                                        className={`answer pt-2 pb-5 px-5 text-sm lg:text-base text-[#343E3A] font-medium ${
                                            openAnswers['answer-4'] ? '' : 'hidden' // Show if this answer is open
                                        }`}
                                        id="answer-4"
                                    >
                                        <Link to="#" className="hover:text-red-500" onClick={() => handleFilterClick(aProvenance)}>{aProvenance}</Link>
                                    </div>)}
                                </div>
                            </div>
                        </div>
                    </section>


                    <section className="max-w-5xl mx-auto ">
                        <div className="w-full px-7 md:px-10 xl:px-2 pt-4 bg-white">
                            <div className="mx-auto w-full max-w-5xl border border-slate-400/20 rounded-lg bg-white ">
                                <div className="border-b border-[#0A071B]/10">
                                    {/* Button to toggle visibility of the "Physical Dimensions" filter */}
                                    <button
                                        className="question-btn flex w-full items-start gap-x-5 justify-between rounded-lg text-left text-lg font-bold text-slate-800 focus:outline-none p-5"
                                        onClick={() => toggleAnswer('answer-5')} >
                                        <span>Physical Dimensions</span>
                                        {/* Icon to indicate whether the answer is open or closed */}
                                        <svg className={`mt-1.5 md:mt-0 flex-shrink-0 transform h-5 w-5 text-[#5B5675] ${
                                            openAnswers['answer-5'] ? 'rotate-180' : '' // Rotate if this answer is open
                                        }`}
                                            viewBox="0 0 24 24"
                                            xmlns="http://www.w3.org/2000/svg">
                                            <path d="M16.293 9.293 12 13.586 7.707 9.293l-1.414 1.414L12 16.414l5.707-5.707z"></path>
                                        </svg>
                                    </button>

                                    {/* Search bar for filtering by "Physical Dimensions" */}
                                    <div className={`answer pt-2 pb-5 px-5 text-sm lg:text-base text-[#343E3A] font-medium ${
                                        openAnswers['answer-5'] ? '' : 'hidden' }`}
                                        id="answer-5">
                                        <form onSubmit={handleSearch} onChange={(e)=>{setSearchPhysicalDimensions(e.target.value)}} className="flex w-full justify-center items-center ">
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
                                    {/* End of Search bar for "Physical Dimensions" */}

                                    {/* Render uniquePhysicalDimensions based on search input */}
                                    {uniquePhysicalDimensions.filter((item) => { return searchPhysicalDimensions.toLowerCase()===''? item : item?.toLowerCase().includes(searchPhysicalDimensions)}).map(aDimensions => <div key={aDimensions}
                                        className={`answer pt-2 pb-5 px-5 text-sm lg:text-base text-[#343E3A] font-medium ${
                                            openAnswers['answer-5'] ? '' : 'hidden' // Show if this answer is open
                                        }`}
                                        id="answer-5"
                                    >
                                        <Link to="#" className="hover:text-red-500" onClick={() => handleFilterClick(aDimensions)}>{aDimensions}</Link>
                                    </div>)}
                                </div>
                            </div>
                        </div>
                    </section>

                        {/* Add more sections as needed */}
                    </div>
                </div>
                 
                 {/* Show Search Result Here */}
                <div className="md:col-span-9 ">
                <div className="pt-14 pl-6 overflow-y-scroll max-h-screen">
                {/* Display filtered artifacts */}
                {paginatedData.length > 0 ? (
                    paginatedData.map((artifact, index) => (
                        <div key={index} className="border-b border-gray-300 px-4 py-4">
                            <img className="h-28 rounded" src={artifact.PlateURL ? artifact.PlateURL : 'Not found'}  />
                            <h2 className="text-xl font-bold text-gray-800">{artifact["Artefact Type"]}</h2>
                            <h3 className="text-gray-600"><span className="font-semibold">Painter:  </span> {artifact.Painter}</h3>
                            <h3 className="text-gray-600"><span className="font-semibold">Dimension:</span> {artifact["Physical Dimensions"]}</h3>
                            <h3 className="text-gray-600"><span className="font-semibold">Artefact Number:</span> {artifact["Artefact Number"]}  </h3>
                            <p className="text-gray-600"><span className="font-semibold">Chapter:</span> {artifact.Chapter}</p>
                            <p className="text-gray-600"><span className="font-semibold">Plate:</span> {artifact.Plate}</p>
                            <p className="text-gray-600"><span className="font-semibold">PlateURL:</span> <Link to={artifact.PlateURL} target="_blank">{artifact.PlateURL}</Link> </p>
                            <p className="text-gray-600"><span className="font-semibold">Provenance:</span> {artifact.Provenance}</p>
                            <p className="text-gray-600"><span className="font-semibold">Publications:</span> {artifact.Publications}</p>
                            <p className="text-gray-600"><span className="font-semibold">Description:</span> {artifact.Description}</p>
                            {/* Add more details as needed */}
                        </div>
                    ))
                ) : (
                    <div className="flex flex-col justify-center items-center">
                        <img className="h-64 w-64" src={searching} alt="" />
                        <h1 className="text-center font-semibold text-2xl text-red-600">No records found</h1>
                        <p className="mt-2">There are no results matching your search &quot;{activeFilters}&quot;. <br />
                        <strong>Suggestions:</strong>
                        <li>Make sure that all words are spelled correctly.</li>
                        </p>
                    </div>
                )}
            </div>



{/* Pagination Section */}
{paginatedData.length > 0 ? ( // Render pagination buttons if there are filtered artifacts to display
    <div className="flex flex-col items-center justify-center">
        <div className="my-8">
            {/* Previous Page Button */}
            <button
              onClick={() => handleClick("prev")}
              disabled={currentPage === 1} // Disable button if current page is the first page
              className="px-4 py-2 mr-2 bg-red-600 text-white rounded">
              Prev
            </button>
            {/* Pagination Buttons */}
            {[...Array(totalPages).keys()]
              .slice(startIndex, endIndex + 1)
              .map((page) => (
                <button
                  key={page}
                  onClick={() => handleClick(page + 1)}
                  className={`px-4 py-2 mr-2 ${
                    currentPage === page + 1
                      ? "bg-red-600 text-white"
                      : "bg-gray-200"
                  } rounded`}
                >
                  {page + 1}
                </button>
              ))}
            {/* Next Page Button */}
            <button
              onClick={() => handleClick("next")}
              disabled={currentPage === totalPages} // Disable button if current page is the last page
              className="px-4 py-2 ml-2 bg-red-600 text-white rounded"
            >
              Next
            </button>
        </div>
    </div>
) : null}


           </div>
    </div>
</>
    );
};

export default SearchLayout;