import { useParams } from "react-router-dom";

const ShowImage = () => {
    const { imageId } = useParams();
    return (
        <div>
            {imageId}
        </div>
    );
};

export default ShowImage;