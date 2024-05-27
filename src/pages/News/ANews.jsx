/*
Header Comment: 
Component: ANews
Description: This component displays a single news item based on the provided ID.
*/

import { useLoaderData, useParams } from "react-router-dom";

const ANews = () => {
    // Extracting the news ID from the URL params
    const id = useParams().id;
    // Fetching news data using useLoaderData
    const news = useLoaderData();
   
    // Filtering news data to find the specific news item with the matching ID
    const anews = news.filter(item => item.id === (id))[0];

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
                <div className="py-8">
                    {/* Displaying news title and publication date */}
                    <h1 className="text-3xl font-bold mb-2">{anews.title}</h1>
                    <p className="text-gray-500 text-sm">Published on {anews.date}</p>
                </div>
        
                {/* Displaying featured image */}
                <img src={anews.img} alt="Featured image" className="w-auto h-auto mb-8"/>
        
                {/* Displaying news description */}
                <div className="prose prose-sm sm:prose lg:prose-lg xl:prose-xl mx-auto text-justify">
                    <p>{anews.description}</p>
                </div>
            </div>
        </div>
    );
};

export default ANews;
