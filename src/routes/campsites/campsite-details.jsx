import {Link, useLoaderData} from "react-router-dom";
import CampsiteIcon from "../../components/campsites/campsite-icon.jsx";
import PersonLimit from "../../components/campsites/person-limit.jsx";
import CampsitePrice from "../../components/campsites/campsite-price.jsx";
import CampsiteAmenity from "../../components/campsites/campsite-amenity.jsx";
import EnumUtils from "../../utils/enum-utils.jsx";
import {useEffect, useState} from "react";
import {backendApi} from "../../utils/backend-api.jsx";
import VisitCard from "../../components/visits/visit-card.jsx";

function getAddressString(address) {
    let result = "?";
    if (address?.street && address?.houseNumber) {
        result = `${address.street} ${address.houseNumber}`;
    } else if (address.street) {
        result = address.street;
    }

    return result;
}

export default function CampsiteDetails() {
    const {campsite} = useLoaderData();
    const [visits, setVisits] = useState([]);
    const [visitsError, setVisitsError] = useState(null);
    const [isVisitsLoading, setIsVisitsLoading] = useState(true);

    const getVisits = async () => {
        setVisits([]);
        setVisitsError(null);
        setIsVisitsLoading(true);

        try {
            const response = await backendApi.get(`/visits/campsite/${campsite.id}`);
            setVisits(response.data);

            if ((response?.data?.length ?? 0) === 0) {
                setVisitsError("Geen bezoeken gevonden");
            }

        } catch (error) {
            console.error("Error fetching visits: ", error);
            setVisitsError(error.message);
        } finally {
            setIsVisitsLoading(false);
        }
    };

    useEffect(() => {
        if (campsite) {
            getVisits().then();
        }
    }, [campsite]);

    if (!campsite) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <div className="toolbar fixed-top">
                <Link to="./edit" className=" btn btn-sm btn-dark"><i
                    className="fa-solid fa-pencil"></i></Link>
            </div>
            <div className="container">
                <div className="row">
                    <div className="col text-center">
                        <div className="nav-size"></div>
                        <h1 className="page-header-margin"><CampsiteIcon
                            campsiteType={campsite.campsiteType}/> {campsite.name}</h1>
                        <hr/>
                        <div className="d-flex justify-content-between mb-2">
                            <p className="mb-0"><i
                                className="fa-solid fa-city"></i> {campsite.address.city} ({campsite.address.distanceInKm} km)
                            </p>
                            <PersonLimit limit={campsite.personLimit}/>
                            <CampsitePrice price={campsite.price}/>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12 col-lg-8">
                        <img className="img-fluid" alt="campsite thumbnail" src="https://placehold.co/1920x1080"/>
                    </div>
                    <div className="col-12 col-lg-4">
                        <div className="row d-block d-lg-none mt-4">
                            <h2 className="text-center">Praktisch</h2>
                            <hr/>
                        </div>
                        <div className="row">
                            {/*Address*/}
                            <div className="col-12 col-sm-6 col-lg-12 mb-4">
                                <div className="card text-bg-light ">
                                    <div className="card-header">
                                        <i className="fa-solid fa-city"></i> Adres
                                    </div>
                                    <div className="card-body d-flex flex-column">
                                        <span><b>Adres:</b> {getAddressString(campsite.address)}</span>
                                        <span><b>Postcode:</b> {campsite.address.zipcode ?? "?"}</span>
                                        <span><b>Woonplaats:</b> {campsite.address.city ?? "?"}</span>
                                        <span><b>Land:</b> {campsite.address.country ?? "?"}</span>
                                        <span><b>Afstand vanaf Gilze:</b> {campsite.address.distanceInKm ?? "?"} km</span>
                                    </div>
                                </div>
                            </div>
                            {/*Arrival and departure times*/}
                            <div className="col-12 col-sm-6 col-lg-12 mb-4">
                                <div className="card text-bg-light ">
                                    <div className="card-header">
                                        <i className="fa-solid fa-clock"></i> Aankomst- en vertrektijden
                                    </div>
                                    <div className="card-body d-flex flex-column">
                                    <span><b><i
                                        className="fa-solid fa-right-to-bracket"></i> Aankomst:</b> {campsite.arrivalTime ?? "?"}</span>
                                        <span><b> <i
                                            className="fa-solid fa-right-from-bracket"></i> Vertrek:</b> {campsite.departureTime ?? "?"}</span>
                                    </div>
                                </div>
                            </div>
                            {/*External sources*/}
                            {campsite?.externalSources != null && Object.keys(campsite.externalSources).length > 0 &&
                                <div className="col-12 mb-4">
                                    <div className="card text-bg-light ">
                                        <div className="card-header">
                                            <i className="fa-solid fa-globe"></i> Externe bronnen
                                        </div>
                                        <div className="card-body d-flex flex-column">
                                            {Object.keys(campsite.externalSources).map((key) => (
                                                <span key={key}><b>{key.charAt(0).toUpperCase() + key.slice(1)}:</b> <a
                                                    href={campsite.externalSources[key]} target="_blank"
                                                    rel="noopener noreferrer">{campsite.externalSources[key]}</a></span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            }
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12 col-lg-8 text-center">
                        <h2 className="mt-4">Beschrijving</h2>
                        <hr/>
                        <p>{campsite.description ??
                            <span className="text-body-tertiary">Geen beschrijving beschikbaar</span>}</p>
                    </div>
                    <div className="col-12 col-lg-4">
                        <h2 className="text-center mt-4">Voorzieningen</h2>
                        <hr/>
                        <div className="card text-bg-light mb-4">
                            <div className="card-header">
                                Algemeen
                            </div>
                            <div className="card-body d-flex flex-column">
                                <CampsiteAmenity icon={"fa-solid fa-toilet"} prefix={"Toiletten"}
                                                 amount={campsite.numOfToilets}/>
                                <CampsiteAmenity icon={"fa-solid fa-shower"} prefix={"Douches"}
                                                 amount={campsite.numOfShowers}/>
                                <CampsiteAmenity icon={"fa-solid fa-faucet-drip"} prefix={"Waterpunten"}
                                                 amount={campsite.numOfWaterSources}/>
                                {campsite.campsiteType === "BUILDING" && <>
                                    <CampsiteAmenity icon={"fa-solid fa-door-closed"} prefix={"Lokalen"}
                                                     amount={campsite.numOfRooms}/>
                                    <CampsiteAmenity icon={"fa-solid fa-door-open"} prefix={"Gedeelde ruimtes"}
                                                     amount={campsite.numOfCommonAreas}/></>
                                }
                                {campsite.campsiteType === "FIELD" &&
                                    <CampsiteAmenity icon={"fa-solid fa-maximize"} prefix={"Grootte"}
                                                     amount={campsite.sizeSquareMeters}
                                                     unit={"m²"}/>}
                            </div>
                        </div>

                        <div className="card text-bg-light mb-4">
                            <div className="card-header">
                                Overig
                            </div>
                            <div className="card-body p-0">
                                <div className="d-flex flex-wrap p-2">
                                    {campsite.facilities.map((facility) => (
                                        <small key={facility.id}
                                               className="badge rounded-pill text-bg-secondary me-2 mb-2">{facility.name}</small>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="card text-bg-light mb-4">
                            <div className="card-header">Omgeving</div>
                            <div className="card-body d-flex flex-column">
                                {Object.entries(campsite.surroundings).map(([name, proximity]) => (
                                    <span
                                        key={name}><b>{name}:</b> {EnumUtils.translateSurroundingProximity(proximity)}</span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row mb-5">
                    <div className="col">
                        <h2 className="text-center mt-4">Bezoeken</h2>
                        <div className="d-flex mb-2">
                            <hr className="flex-grow-1"/>
                            <Link to="./visits/add" className="btn btn-sm btn-primary mx-2"><i
                                className="fa-solid fa-plus"></i></Link>
                            <hr className="flex-grow-1"/>
                        </div>
                        {isVisitsLoading && <div className="spinner-border mx-auto" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>}
                        {visitsError && <div className="text-center text-body-tertiary">{visitsError}</div>}
                        {!isVisitsLoading && !visitsError && visits.length > 0 &&
                            <div className="row">
                                {visits.map((visit) => (
                                    <div className="col-12 mb-3" key={visit.id}>
                                        <VisitCard visit={visit}/>
                                    </div>
                                ))}
                            </div>
                        }
                    </div>
                </div>
            </div>
        </>
    )
}