import { useEffect, useState } from "react";
import { Link } from "react-router-dom";


const NewsSection = () => {
    const [news,setNews] = useState([]);
    useEffect(() =>{
        fetch('news.json')
        .then(response=>response.json())
        .then(data=>setNews(data))
    },[])

    return (
        <div className="bg-gray-100 ">
    <div className="py-10 max-w-screen-lg mx-auto">
        <div className="text-center mb-16">
           
            <h3 className="text-3xl sm:text-4xl leading-normal font-extrabold tracking-tight text-gray-900">
                All<span className="text-indigo-600"> NEWS</span>
            </h3>
        </div>


        <div className="grid grid-cols-3 col-gap-10">

           {
            news.map(anews=> <Link key={anews.id} to="/news"><div  className=" flex flex-col justify-center text-center bg-white">
            <img className="w-100 h-64" src={anews.img}/>
            <div className="p-4">
                <div className="text-sm">
                <p className="hover:text-indigo-500 text-gray-900 font-semibold transition duration-500 ease-in-out">
  {anews.title ? anews.title.slice(0, 50) : anews.title} ...
</p>
                   
                </div>
               
            </div>

        </div></Link> )
           }
         

        </div>

    </div>
</div>
    );
};

export default NewsSection;