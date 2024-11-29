import {useEffect, useState} from "react";
import PropTypes from "prop-types";
import {backendApi} from "../../utils/backend-api.jsx";

export default function AuthenticatedImage({imageId, alt, placeholder = "https://placehold.co/1920x1080", className = ""}) {
    const [imageSrc, setImageSrc] = useState(placeholder);

    useEffect(() => {
        const fetchImage = async () => {
            if (imageId) {
                try {
                    const response = await backendApi.get(`/assets/${imageId}/download`, {
                        responseType: 'blob'
                    });
                    const objectURL = URL.createObjectURL(response.data);
                    setImageSrc(objectURL);
                } catch (error) {
                    console.error("Error fetching image:", error);
                }
            }
        };

        fetchImage();
    }, [imageId]);

    return <img className={className} src={imageSrc} alt={alt} />;
}

AuthenticatedImage.propTypes = {
    imageId: PropTypes.string,
    placeholder: PropTypes.string,
    alt: PropTypes.string.isRequired,
    className: PropTypes.string
};
