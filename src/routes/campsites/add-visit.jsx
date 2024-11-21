import {useLoaderData} from "react-router-dom";
import CampsiteIcon from "../../components/campsites/campsite-icon.jsx";
import VisitForm from "../../components/visits/visit-form.jsx";

export default function AddVisit() {
    const {campsite} = useLoaderData();

    const handleSubmit = (data) => {
        console.log("Submit visit: ", data);
    };

    return (
        <div className="container">
        <div className="row">
            <h1 className="page-header-margin text-center">Bezoek toevoegen</h1>
            <h2 className="text-center"><CampsiteIcon campsiteType={campsite.campsiteType}/> {campsite.name}</h2>
            <hr/>
            <VisitForm onSubmit={handleSubmit}/>
        </div>
        </div>);
}