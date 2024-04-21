
const artifactCard = ({data}) => {

    return (
        <div className="max-w-2xl mx-auto mt-2">
    <div className="flex px-2 py-1 gap-3 bg-white border border-gray-300 rounded-xl overflow-hidden items-center justify-start">

        <div className="relative w-32 h-32 flex-shrink-0">
            <img className="absolute rounded left-0 top-0 w-full h-full object-cover object-center transition duration-50" src={data.imageID}/>
        </div>

        <div className="flex flex-col gap-2 py-2">
            <p ><span className="bg-blue-200 rounded py-1 px-2 text-sm">{data.artefactType}</span></p>

            <p className=" font-bold">{data.provenance}</p>

            <p className="text-gray-500">
                {data.description}
            </p>
            <p className="text-gray-500">
                {data.publications}
            </p>

            <span className="flex items-center justify-start text-gray-500">
            
                <p className="text-green-500">{data.painter} || {data.physicalDimensions}</p>
            </span>

        </div>

    </div>

    </div>
    );
};

export default artifactCard;