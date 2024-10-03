import PropTypes from "prop-types";

export default function CampsiteIcon({campsiteType}) {

    function getCampsiteIconClass(campsiteType) {
        switch (campsiteType) {
            case "FIELD":
                return "fa-solid fa-campground";
            case "BUILDING":
                return "fa-solid fa-house";
            default:
                return "fa-solid fa-question";
        }
    }

    return (
        <i className={getCampsiteIconClass(campsiteType)}></i>
    )
}

CampsiteIcon.propTypes = {
    campsiteType: PropTypes.string.isRequired,
};