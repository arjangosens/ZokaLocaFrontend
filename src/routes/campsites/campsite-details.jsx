import {useEffect, useState} from "react";
import {backendApi} from "../../utils/backend-api.jsx";
import {Link, useLoaderData} from "react-router-dom";
import CampsiteIcon from "../../components/campsites/campsite-icon.jsx";
import PersonLimit from "../../components/campsites/person-limit.jsx";
import CampsitePrice from "../../components/campsites/campsite-price.jsx";

export async function loader({params}) {
    try {
        const response = await backendApi.get(`/campsites/${params.campsiteId}`);
        return {campsite: response.data};
    } catch (error) {
        console.error("Error fetching data: ", error);
        return {campsite: null};
    }
}

export default function CampsiteDetails() {
    const {campsite} = useLoaderData();

    return (
        <>
            <div className="toolbar fixed-top">
                <Link to="./edit" className=" btn btn-sm btn-dark"><i
                    className="fa-solid fa-pencil"></i></Link>
            </div>
            <div className="row">
                <div className="col text-center">
                    <div className="nav-size"></div>
                    <h1><CampsiteIcon campsiteType={campsite.campsiteType}/> {campsite.name}</h1>
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
                <div className="col-12 col-md-8">
                    <img className="img-fluid" alt="campsite thumbnail" src="https://placehold.co/1920x1080"/>
                </div>
                <div className="col-12 col-md-4">
                    <div className="row d-block d-md-none">
                        <h2 className="text-center">Praktisch</h2>
                        <hr/>
                    </div>
                    <div className="row">
                        <div className="col-6 col-md-12">
                            <div className="card text-bg-light ">
                                <div className="card-header">
                                    <i className="fa-solid fa-city"></i> Adres
                                </div>
                                <div className="card-body">

                                    <p>Woonplaats: {campsite.address.city}</p>
                                    <p>Land: {campsite.address.country}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>

    )
}