import { useEffect, useState} from "react";
import axios from "axios";
import CampsiteCard from "../../components/campsites/campsite-card.jsx";
const { VITE_BACKEND_API_URL } = import.meta.env;


export default function CampsiteOverview() {
    const [campsites, setCampsites] = useState([])
    useEffect(() => {
        axios.get(`${VITE_BACKEND_API_URL}/campsites`)
            .then((response) => {
                setCampsites(response.data)
            })
            .catch((error) => {
                console.error("Error fetching data: ", error)
            })
    }, []);

    return (
        <>
            <div className="row">
                <div className="col text-center">
                    <h1 className="page-header-margin">Kamplocaties</h1>
                    <hr />
                </div>
            </div>
            <div className="row">
                {campsites.map((campsite) => (
                    <div className="col-6 col-lg-4 col-xl-3 mb-2" key={campsite.id}>
                        <CampsiteCard campsite={campsite} />
                    </div>
                ))}
            </div>
        </>
    )
}