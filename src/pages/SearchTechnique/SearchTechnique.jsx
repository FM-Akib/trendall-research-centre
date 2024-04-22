import { useEffect, useState } from "react";
import ArtifactCard from "./ArtifactCard";

const SearchTechnique = () => {
    const [allData,setAllData] = useState([])
    useEffect(() => {
        fetch('/dummyDataSearch.json') 
            .then(response => response.json())
            .then(data => setAllData(data))
            .catch(error => console.error('Error fetching data:', error)); 
    }, []);
    // console.log(allData);
    return (
        <div>
           {
            allData.map(data => <ArtifactCard key={data.artefactNumber} data={data}></ArtifactCard> )
           }   
        </div>
    );
};

export default SearchTechnique;