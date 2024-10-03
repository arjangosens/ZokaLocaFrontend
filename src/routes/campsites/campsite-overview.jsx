import {useEffect, useState} from "react";
import CampsiteCard from "../../components/campsites/campsite-card.jsx";
import {Link} from "react-router-dom";
import {backendApi} from "../../utils/backend-api.jsx";

export default function CampsiteOverview() {
    const [campsites, setCampsites] = useState([]);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(true);
        setError(null);
        backendApi.get(`/campsites`)
            .then((response) => {
                setCampsites(response.data);
            })
            .catch((error) => {
                console.error("Error fetching data: ", error);
                setError(error);
            }).finally(() => {
            setIsLoading(false);
        })
    }, []);

    return (
        <>
            <div className="toolbar fixed-top">
                <Link to="/campsites/create" className=" btn btn-sm btn-dark"><i
                    className="fa-solid fa-plus"></i></Link>
            </div>
            <div className="row">
                <div className="col text-center">
                    <div className="nav-size"></div>
                    <h1>Kamplocaties</h1>
                    <hr/>
                </div>
            </div>
            <div className="row">
                {isLoading && <div className="spinner-border mx-auto" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>}
                {error && <div className="text-center">Error: {error.message}</div>}
                {!isLoading && !error && campsites.length === 0 &&
                    <div className="text-center">Geen kamplocaties gevonden</div>}

                {campsites.map((campsite) => (
                    <div className="col-6 col-lg-4 col-xl-3 mb-2" key={campsite.id}>
                        <CampsiteCard campsite={campsite}/>
                    </div>
                ))}
            </div>
        </>
    )
}