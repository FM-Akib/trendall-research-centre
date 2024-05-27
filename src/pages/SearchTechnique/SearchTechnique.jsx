/*
for testing we do this
Header Comment:
Component: SearchTechnique
Description: This component fetches data from a JSON file and renders ArtifactCard components for each item in the data.
*/

import { useEffect, useState } from "react";
import ArtifactCard from "./ArtifactCard";

const SearchTechnique = () => {
    // State to hold the fetched data
    const [allData, setAllData] = useState([]);

    // Fetch data from JSON file when the component mounts
    useEffect(() => {
        fetch('/dummyDataSearch.json') 
            .then(response => response.json())
            .then(data => setAllData(data))
            .catch(error => console.error('Error fetching data:', error)); 
    }, []);

    return (
        <div>
            {/* Render ArtifactCard components for each item in the fetched data */}
            {allData.map(data => <ArtifactCard key={data.artefactNumber} data={data}></ArtifactCard>)}
        </div>
    );
};

export default SearchTechnique;
