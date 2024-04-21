import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const News = () => {
    const [news,setNews] = useState([]);
    useEffect(() =>{
        fetch('news.json')
        .then(response=>response.json())
        .then(data=>setNews(data))
    },[])

    return (
        <div>
            <div className="mt-8">
                {
                    news.map(anews=> <div key={anews.id} className="px-4 py-4 mb-4 mx-5 font-normal bg-blue-100 rounded-lg">
                    <div className="flex flex-col items-center justify-between md:flex-row">
                    <div className="flex items-center mb-2 space-x-2">                          
                            <p className="px-2 text-gray-800 bg-teal-400 rounded">  {anews.date}</p>
                        </div>
                        <h3 className="mb-2 text-lg font-semibold leading-snug">
                            {anews.title}
                        </h3>
                      
                        <Link to={`/news/${anews.id}`} className="flex items-center text-indigo-700 border border-indigo-600 py-2 px-6 gap-2 rounded ">
    <span>
        View More
    </span>
    <svg className="w-4" fill="none" stroke="currentColor" 
        viewBox="0 0 24 24" >
        <path d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
    </svg>
</Link>
                    </div>
                   
                </div>)
                }
            </div>
        </div>
    );
};

export default News;