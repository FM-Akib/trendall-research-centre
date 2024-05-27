/*
for testing we do this .It;s a component of advanced search and we romove this
Header Comment:
Component: ShowImage
Description: This component fetches image data from a JSON file and displays the image details based on the image ID obtained from the URL parameters.
*/
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ShowImage = () => {
    const { imageId } = useParams();
    const [allImages, setAllImages] = useState([]);
    const [isLoading, setIsLoading] = useState(true); // Initialize loading state

    useEffect(() =>{
        fetch('/Images.json')
        .then(response => response.json())
        .then(data => {
            setAllImages(data);
            setIsLoading(false); 
        })
        .catch(error => {
            console.error('Error fetching images:', error);
            setIsLoading(false); // Set loading state to false in case of error
        });
    }, []);

    const filteredImage = allImages.filter(img => img.ImageID === imageId);

    return (
        <div className="">
           
            {isLoading ? (
                <span className="loading loading-ring loading-lg"></span>
            ) : (
                
                <>
                    {/* Displaying image details */}
                    {filteredImage.length > 0 ? (
                        <div className="w-2/4 mx-auto">
                            <h2 className="font-semibold mb-2"><span className="bg-red-100 px-3 py-1 rounded">Image ID: {filteredImage[0].ImageID}</span> </h2>
                            <img className="h-96 rounded shadow-xl" src={filteredImage[0].URL} alt="Image" />
                            
                        </div>
                    ) : (
                        <p>No image found with ID: {imageId}</p>
                    )}
                </>
            )}
        </div>
    );
};

export default ShowImage;
