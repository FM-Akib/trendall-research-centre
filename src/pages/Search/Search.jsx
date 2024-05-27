/*
Header Comment:
Component: Search
Description: This component renders a search section with options for basic and Beazley Archive Search .
*/

import basicSearch from '../../assets/BasicSearch.png';
import BrezlyArchive from '../../assets/AdvancedSearch.png';
import { Link } from 'react-router-dom';

const Search = () => {
    return (
        <div>
            {/* Search Section */}
            <div className="md:flex items-center justify-center mt-20 gap-10 ">
                
                {/* Artefact Search */}
                <div className="rounded-md shadow-md bg-white text-gray-800 mb-4">
                    <img src={basicSearch} alt="" className="object-cover object-center w-full rounded-t-md h-72 bg-gray-500" />
                    <div className="flex flex-col justify-between p-6 space-y-8">
                        <div className="space-y-2">
                            <h2 className="text-3xl font-semibold tracking-wide">Artefact Search</h2>
                            <p className="text-gray-800">For searching, click below.</p>
                        </div>
                        <Link to="/searchtec/all">
                            <button type="button" className="flex items-center justify-center w-full p-3 font-semibold tracking-wide rounded-md bg-[#E22232] hover:bg-[#f23343] text-gray-50">Artefact Search</button>
                        </Link>
                    </div>
                </div>
                
                {/* Beazley Archive Search */}
                <div className="rounded-md shadow-md bg-white text-gray-800 mb-4">
                    <img src={BrezlyArchive} alt="" className="object-cover object-center w-full rounded-t-md h-72 bg-gray-500" />
                    <div className="flex flex-col justify-between p-6 space-y-8">
                        <div className="space-y-2">
                            <h2 className="text-3xl font-semibold tracking-wide">Beazley Archive</h2>
                            <p className="text-gray-800">Beazley archive pottery database (BAPD).</p>
                        </div>
                        <Link to="https://www.carc.ox.ac.uk/carc/pottery" target="_blank">
                            <button type="button" className="flex items-center justify-center w-full p-3 font-semibold tracking-wide rounded-md bg-[#E22232] hover:bg-[#f23343] text-gray-50">Beazley Archive</button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Search;
