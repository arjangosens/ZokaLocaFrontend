import {Carousel} from "react-bootstrap";
import AuthenticatedImage from "./authenticated-image.jsx";
import PropTypes from "prop-types";
import {useEffect, useState} from "react";
import {backendApi} from "../../utils/backend-api.jsx";

export default function AuthenticatedImageCarousel({assetIds, placeholder = "/src/assets/thumbnail-placeholder.jpg"}) {
    const [assets, setAssets] = useState([]);

    const getAssets = async () => {
        try {
            const responses = await Promise.all(assetIds.map(assetId => backendApi.get(`/assets/${assetId}`)));
            setAssets(responses.map(response => response.data));
        } catch (error) {
            console.error("Failed to fetch assets: ", error);
        }
    };

    useEffect(() => {
        getAssets();
    }, [assetIds]);

    return (
        <Carousel>
            {assets.map((asset) => (
                <Carousel.Item key={asset.id}>
                    <AuthenticatedImage alt={asset.name} imageId={asset.id} placeholder={placeholder} className={"carousel-image"}/>
                </Carousel.Item>
            ))}
        </Carousel>
    );
}

AuthenticatedImageCarousel.propTypes = {
    assetIds: PropTypes.arrayOf(PropTypes.string).isRequired,
    placeholder: PropTypes.string
};