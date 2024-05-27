/*
Header Comment: 
Component: Home
Description: This component serves as the main page of the application. It includes a cover section, a news section, and a search section.
*/

import Cover from "./Cover";
import NewsSection from "./NewsSection";
import SearchSection from "./SearchSection";

const Home = () => {
    return (
        <div>
            {/* Cover Section */}
            <Cover></Cover>
            {/* News Section */}
            <NewsSection></NewsSection>
            {/* Search Section */}
            <SearchSection></SearchSection>
        </div>
    );
};

export default Home;
