import { useLoaderData, useParams } from "react-router-dom";


const IndividualCard = () => {
    const id = useParams().id;
    const data = useLoaderData();


   
    const Adata = data.filter(item => item._id === parseInt(id))
    // console.log(Adata);
   const {fabric,CurrentCollection,PreviousCollections,img,PublicationRecord,Decoration} = Adata[0];
    return (
        <div>
            <h1 className="text-center mt-10 mb-5">{fabric}</h1>
            <div className="grid grid-cols-10 p-32 bg-white rounded-lg border-2">
               <div className="col-span-3 flex justify-center items-center">
                  <img src={img} alt="" />
               </div>
               <div className="col-span-7 text-md">
                    <p className="py-1">Vase Number: 1</p>
                    <p className="py-1">Fabric: {fabric}</p>
                    <p className="py-1">Current Collection: {CurrentCollection}</p>
                    <p className="py-1">Previous Collections: {PreviousCollections}</p>
                    <p className="py-1">Publication Record: {PublicationRecord}</p>
                    <p className="py-1">Decoration: {Decoration}</p>
               </div>
            </div>
            
        </div>
    );
};

export default IndividualCard;