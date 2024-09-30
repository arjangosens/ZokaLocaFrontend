import PropTypes from 'prop-types';
import {Link} from "react-router-dom";
import PersonLimit from "./person-limit.jsx";
import CampsitePrice from "./campsite-price.jsx";

export default function CampsiteCard({campsite}) {
    return (
        <div className="card p-0">
            <div className="card-body p-0">
                <div className="p-2">
                    <h5 className="card-title"><i
                        className={getCampsiteIcon(campsite.campsiteType)}></i> {campsite.name}
                    </h5>
                    <hr/>
                    <div className="d-flex">
                        <p className="mb-0"><i className="fa-solid fa-city"></i> {campsite.address.city}</p>
                        <p className="ms-auto mb-0">{campsite.address.distanceInKm}km</p>
                    </div>
                </div>
                <img className="img-fluid" alt="campsite thumbnail" src="https://placehold.co/1920x1080" />
                <div className="p-2">
                    <div className="d-flex justify-content-between">
                        <PersonLimit limit={campsite.personLimit}/>
                        <CampsitePrice price={campsite.price}/>
                    </div>
                    <hr />
                    <div className="d-grid mt-4">
                        <Link to={`/campsites/${campsite.id}`} className="btn btn-primary">Bekijk</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

function getCampsiteIcon(campsiteType) {
    switch (campsiteType) {
        case "FIELD":
            return "fa-solid fa-campground";
        case "BUILDING":
            return "fa-solid fa-house";
        default:
            return "fa-solid fa-question";
    }
}

CampsiteCard.propTypes = {
    campsite: PropTypes.object.isRequired
}