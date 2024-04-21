import { useLoaderData, useParams } from "react-router-dom";


const ANews = () => {
    const id = useParams().id;
    const news = useLoaderData();


   
    const anews = news.filter(item => item.id === (id))[0]
    //  console.log(anews);
    return (
       
<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="max-w-6xl mx-auto">
      
        <div className="py-8">
            <h1 className="text-3xl font-bold mb-2">{anews.title}</h1>
            <p className="text-gray-500 text-sm">Published on {anews.date}</p>
        </div>

        
        <img src={anews.img} alt="Featured image" className="w-auto h-auto mb-8"/>

        
        <div className="prose prose-sm sm:prose lg:prose-lg xl:prose-xl mx-auto text-justify">
            <p>{anews.description}</p>
        </div>
    </div>
</div>
    );
};

export default ANews;