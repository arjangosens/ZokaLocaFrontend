import {Link} from "react-router-dom";
import PersonLimit from "./person-limit.jsx";
import CampsitePrice from "./campsite-price.jsx";
import CampsiteAmenity from "./campsite-amenity.jsx";
import CampsiteIcon from "./campsite-icon.jsx";
import CampsitePropTypes from "../../domain/prop-types/campsite.jsx";
import VisitRatingBadge from "../visits/visit-rating-badge.jsx";

export default function CampsiteCard({campsite}) {
    return (
        <div className="card p-0">
            <div className="card-body p-0">
                <div className="p-2">
                    <div className="d-flex">
                        <h5 className="card-title text-truncate">
                            <CampsiteIcon campsiteType={campsite.campsiteType}/> {campsite.name}
                        </h5>
                        <h5 className="ms-auto">
                            <VisitRatingBadge rating={campsite.rating}/>
                        </h5>
                    </div>

                    <hr/>
                    <div className="d-flex">
                        <p className="mb-0 text-truncate"><i className="fa-solid fa-city"></i> {campsite.address.city}</p>
                        <p className="ms-auto mb-0 text-nowrap">{campsite.address.distanceInKm} km</p>
                    </div>
                </div>
                <img className="img-fluid" alt="campsite thumbnail" src="https://placehold.co/1920x1080"/>
                <div className="p-2">
                    <div className="d-flex justify-content-between">
                        <PersonLimit limit={campsite.personLimit}/>
                        <CampsitePrice price={campsite.price}/>
                    </div>
                    <hr/>
                    <div className="d-flex justify-content-between">
                        <div className="d-flex">
                            <div className="d-flex flex-column me-2">
                                <CampsiteAmenity icon={"fa-solid fa-toilet"} amount={campsite.numOfToilets}/>
                                <CampsiteAmenity icon={"fa-solid fa-shower"} amount={campsite.numOfShowers}/>
                            </div>
                            <div className="d-flex flex-column">
                                <CampsiteAmenity icon={"fa-solid fa-faucet-drip"} amount={campsite.numOfWaterSources}/>
                                {campsite.campsiteType === "BUILDING" &&
                                    <CampsiteAmenity icon={"fa-solid fa-door-closed"} amount={campsite.numOfRooms}/>}
                                {campsite.campsiteType === "FIELD" &&
                                    <CampsiteAmenity icon={"fa-solid fa-maximize"} amount={campsite.sizeSquareMeters}
                                                     unit={"m²"}/>}
                            </div>
                        </div>
                        <div>
                            <span><i
                                className="fa-solid fa-right-to-bracket"></i> {campsite.arrivalTime ? campsite.arrivalTime : "?"}</span>
                            <br/>
                            <span><i
                                className="fa-solid fa-right-from-bracket"></i> {campsite.departureTime ? campsite.departureTime : "?"}</span>
                        </div>
                    </div>
                    <hr/>
                    <div className="facilities-container d-flex flex-wrap align-items-start overflow-auto">
                        {campsite.facilities.map((facility) => (
                            <small key={facility.id}
                                   className="badge rounded-pill text-bg-secondary me-2 mb-2">{facility.name}</small>
                        ))}
                    </div>
                    <div className="d-grid mt-3">
                        <Link to={`/campsites/${campsite.id}`} className="btn btn-primary">Bekijk</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

CampsiteCard.propTypes = {
    campsite: CampsitePropTypes.isRequired
}