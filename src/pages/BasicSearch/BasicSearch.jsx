import { Link } from "react-router-dom";

const BasicSearch = () => {
    return (
        <div className="pt-5">
           <h1 className="text-2xl font-semibold mb-1">CLASSICAL ART RESEARCH CENTRE POTTERY SEARCH</h1>
           <p>How would you like to search the databases?</p>
           <div className="my-5 flex flex-col w-1/2">
        
           <div className=" justify-between items-center grid grid-cols-8 gap-2 mb-2">
           <button type="button" className="col-span-4  px-8 py-3 font-semibold rounded bg-[#E22232] text-gray-100">Shape</button>
           <div className="relative h-[48px] col-span-4 ">
                <input className="w-full h-[48px] py-2 px-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" type="search" placeholder="Search"/>
               <Link to="/searchtec/all"><button className="absolute inset-y-0 right-0 flex items-center px-4 text-gray-700 bg-gray-100 border border-gray-300 rounded-r-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path  d="M14.795 13.408l5.204 5.204a1 1 0 01-1.414 1.414l-5.204-5.204a7.5 7.5 0 111.414-1.414zM8.5 14A5.5 5.5 0 103 8.5 5.506 5.506 0 008.5 14z" />
                </svg>
            </button></Link> 
            </div>
           </div>

           <div className=" justify-between items-center grid grid-cols-8 gap-2 mb-2">
           <button type="button" className="col-span-4  px-8 py-3 font-semibold rounded bg-[#E22232] text-gray-100">Technique</button>
           <div className="relative h-[48px] col-span-4 ">
                <input className="w-full h-[48px] py-2 px-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" type="search" placeholder="Search"/>
                <Link to="/searchtec/all">  <button className="absolute inset-y-0 right-0 flex items-center px-4 text-gray-700 bg-gray-100 border border-gray-300 rounded-r-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path  d="M14.795 13.408l5.204 5.204a1 1 0 01-1.414 1.414l-5.204-5.204a7.5 7.5 0 111.414-1.414zM8.5 14A5.5 5.5 0 103 8.5 5.506 5.506 0 008.5 14z" />
                </svg>
            </button></Link>
            </div>
           </div>

           <div className=" justify-between items-center grid grid-cols-8 gap-2 mb-2">
           <button type="button" className="col-span-4  px-8 py-3 font-semibold rounded bg-[#E22232] text-gray-100">Sub Technique</button>
           <div className="relative h-[48px] col-span-4 ">
                <input className="w-full h-[48px] py-2 px-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" type="search" placeholder="Search"/>
                <Link to="/searchtec/all">   <button className="absolute inset-y-0 right-0 flex items-center px-4 text-gray-700 bg-gray-100 border border-gray-300 rounded-r-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path  d="M14.795 13.408l5.204 5.204a1 1 0 01-1.414 1.414l-5.204-5.204a7.5 7.5 0 111.414-1.414zM8.5 14A5.5 5.5 0 103 8.5 5.506 5.506 0 008.5 14z" />
                </svg>
            </button></Link>
            </div>
           </div>

           <div className=" justify-between items-center grid grid-cols-8 gap-2 mb-2">
           <button type="button" className="col-span-4  px-8 py-3 font-semibold rounded bg-[#E22232] text-gray-100">Painter or Potter</button>
           <div className="relative h-[48px] col-span-4 ">
                <input className="w-full h-[48px] py-2 px-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" type="search" placeholder="Search"/>
                <Link to="/searchtec/all">  <button className="absolute inset-y-0 right-0 flex items-center px-4 text-gray-700 bg-gray-100 border border-gray-300 rounded-r-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path  d="M14.795 13.408l5.204 5.204a1 1 0 01-1.414 1.414l-5.204-5.204a7.5 7.5 0 111.414-1.414zM8.5 14A5.5 5.5 0 103 8.5 5.506 5.506 0 008.5 14z" />
                </svg>
            </button></Link>
            </div>
           </div>

           <div className=" justify-between items-center grid grid-cols-8 gap-2 mb-2">
           <button type="button" className="col-span-4  px-8 py-3 font-semibold rounded bg-[#E22232] text-gray-100">Inscription</button>
           <div className="relative h-[48px] col-span-4 ">
                <input className="w-full h-[48px] py-2 px-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" type="search" placeholder="Search"/>
                <Link to="/searchtec/all">   <button className="absolute inset-y-0 right-0 flex items-center px-4 text-gray-700 bg-gray-100 border border-gray-300 rounded-r-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path  d="M14.795 13.408l5.204 5.204a1 1 0 01-1.414 1.414l-5.204-5.204a7.5 7.5 0 111.414-1.414zM8.5 14A5.5 5.5 0 103 8.5 5.506 5.506 0 008.5 14z" />
                </svg>
            </button> </Link>
            </div>
           </div>

           <div className=" justify-between items-center grid grid-cols-8 gap-2 mb-2">
           <button type="button" className="col-span-4  px-8 py-3 font-semibold rounded bg-[#E22232] text-gray-100">Subject</button>
           <div className="relative h-[48px] col-span-4 ">
                <input className="w-full h-[48px] py-2 px-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" type="search" placeholder="Search"/>
                <Link to="/searchtec/all">    <button className="absolute inset-y-0 right-0 flex items-center px-4 text-gray-700 bg-gray-100 border border-gray-300 rounded-r-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path  d="M14.795 13.408l5.204 5.204a1 1 0 01-1.414 1.414l-5.204-5.204a7.5 7.5 0 111.414-1.414zM8.5 14A5.5 5.5 0 103 8.5 5.506 5.506 0 008.5 14z" />
                </svg>
            </button></Link>
            </div>
           </div>

           <div className=" justify-between items-center grid grid-cols-8 gap-2 mb-2">
           <button type="button" className="col-span-4  px-8 py-3 font-semibold rounded bg-[#E22232] text-gray-100">Date</button>
           <div className="relative h-[48px] col-span-4 ">
                <input className="w-full h-[48px] py-2 px-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" type="search" placeholder="Search"/>
                <Link to="/searchtec/all">   <button className="absolute inset-y-0 right-0 flex items-center px-4 text-gray-700 bg-gray-100 border border-gray-300 rounded-r-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path  d="M14.795 13.408l5.204 5.204a1 1 0 01-1.414 1.414l-5.204-5.204a7.5 7.5 0 111.414-1.414zM8.5 14A5.5 5.5 0 103 8.5 5.506 5.506 0 008.5 14z" />
                </svg>
            </button></Link>
            </div>
           </div>

           <div className=" justify-between items-center grid grid-cols-8 gap-2 mb-2">
           <button type="button" className="col-span-4  px-8 py-3 font-semibold rounded bg-[#E22232] text-gray-100">Collection</button>
           <div className="relative h-[48px] col-span-4 ">
                <input className="w-full h-[48px] py-2 px-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" type="search" placeholder="Search"/>
                <Link to="/searchtec/all">   <button className="absolute inset-y-0 right-0 flex items-center px-4 text-gray-700 bg-gray-100 border border-gray-300 rounded-r-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path  d="M14.795 13.408l5.204 5.204a1 1 0 01-1.414 1.414l-5.204-5.204a7.5 7.5 0 111.414-1.414zM8.5 14A5.5 5.5 0 103 8.5 5.506 5.506 0 008.5 14z" />
                </svg>
            </button></Link>     
            </div>
           </div>

           </div>
        </div>
    );
};

export default BasicSearch;