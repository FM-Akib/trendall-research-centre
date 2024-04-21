import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
const AdvancedSearch = () => {
    const searchItem = [
        { item: 'Vase Number' },
        { item: 'Fabric' },
        { item: 'Technique' },
        { item: 'Sub Technique' },
        { item: 'Shape Name' },
        { item: 'Provenance' },
        { item: 'Date Range' },
        { item: 'Inscription Type' },
        { item: 'Inscription' },
        { item: 'Artist Name' },
        { item: 'Scholar Name' },
        { item: 'Decoration Termword' },
        { item: 'Decorated Area' },
        { item: 'Collection Name' },
        { item: 'Number' },
        { item: 'Publication Name' },
        { item: 'Reference' },
        { item: 'Miscellaneous' }
    ];
    
    const [items ,setItems] = useState();
    useEffect(()=>{
        fetch('dummy.json')
        .then(response => response.json())
        .then(data =>setItems(data))
    },[])

    const [athenians ,setAthenians] = useState();
    useEffect(()=>{
        fetch('dummyFabric.json')
        .then(response => response.json())
        .then(data =>setAthenians(data))
    },[])

    

  const  handleIndevidualData =(data)=>{
    if(data==='ATHENIAN'){
   
    const list = document.getElementById("ATHENIAN").classList;
    list.remove("hidden");
   
    }

  } 
  const [tabIndex, setTabIndex] = useState(0);
    return (
        <div>

            <div className="grid grid-cols-12 ">
            <div className="col-span-4 bg-white py-10">
            {
                searchItem.map(item =><>

                <div className="px-4 py-2 max-w-lg mx-auto ">
                    <details className="mb-2">
                        <summary className="bg-gray-200 p-4 rounded-lg cursor-pointer shadow-md mb-4">
                            <span className="font-semibold">{item.item}</span>
                        </summary>

                        <ul className="ml-8 space-y-4 ">
                            <li>
                            <div className="relative max-w-full mx-auto ">
                                    <input className="w-full py-2 px-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" type="search" placeholder="Search"/>
                                    <button className="absolute inset-y-0 right-0 flex items-center px-4 text-gray-700 bg-gray-100 border border-gray-300 rounded-r-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                    <path  d="M14.795 13.408l5.204 5.204a1 1 0 01-1.414 1.414l-5.204-5.204a7.5 7.5 0 111.414-1.414zM8.5 14A5.5 5.5 0 103 8.5 5.506 5.506 0 008.5 14z" />
                                    </svg>
                                </button>
                                </div>
                            </li>
                         
                          {
                            items?.map(data=><li key = {data._id}>
                                <div className="bg-white px-4 py-2 rounded-md flex justify-between">
                                     <button onClick={()=>handleIndevidualData(data.name)} className="text-gray-800">{data.name}</button>
                                     <p>({data.result})</p>
                                </div>    
                              </li>)
                          }
                           
                        </ul>
                    </details>

                
                </div>

                </>)
            }
            </div>





            <div className="bg-[#F1F5F9] col-span-8 p-8 ">

            <section id ="ATHENIAN" className="hidden bg-[#F1F5F9]">

                {/* {
                    athenians?.map(data=><div key={data._id} className="bg-white p-2 border-b-2 hover:bg-slate-100">
                     <Link to={`/advancedsearch/${data._id}`}><button  className="text-gray-800  py-4 text-start ">{data.fabric}, {data?.CurrentCollection}, {data?.PreviousCollections} </button></Link>    
                    </div>)
                } */}
                 <Tabs selectedIndex={tabIndex} onSelect={(index) => setTabIndex(index)}>
                    <TabList>
                        <Tab>Text</Tab>
                        <Tab>img</Tab>
                        <Tab>All img</Tab>
                    </TabList>
                    <TabPanel>
                    {
                        athenians?.map(data=><div key={data._id} className="bg-white p-2 border-b-2 hover:bg-slate-100">
                        <Link to={`/advancedsearch/${data._id}`}><button  className="text-gray-800  py-4 text-start ">{data.fabric}, {data?.CurrentCollection}, {data?.PreviousCollections} </button></Link>    
                        </div>)
                    }
                    </TabPanel>
                    <TabPanel>
                    {
                        athenians?.map(data=><div key={data._id} className="bg-white p-2 px-10 border-b-2 hover:bg-slate-100">
                        <Link to={`/advancedsearch/${data._id}`}><button  className="text-gray-800  py-4 text-start flex "> <img src={data.img} className="mr-2" alt="" /> {data.fabric}, {data?.CurrentCollection}, {data?.PreviousCollections} </button></Link>    
                        </div>)
                    }
                    </TabPanel>
                    <TabPanel>
                    
                    <div className="grid grid-cols-4 gap-5 ">
                    {
                        athenians?.map(data=><div key={data._id} className="bg-white p-2 border-b-2 flex items-center justify-center hover:bg-slate-100">
                        <Link to={`/advancedsearch/${data._id}`}><button  className="text-gray-800  py-4  "> <img src={data.img} className="mr-2" alt="" /></button></Link>    
                        </div>)
                    }
                    </div>
                    </TabPanel>
                    </Tabs>

            </section>
           
                 
            </div>
            </div>


        </div>
    );
};

export default AdvancedSearch;