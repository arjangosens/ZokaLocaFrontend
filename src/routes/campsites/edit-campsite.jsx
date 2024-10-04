import {useLoaderData} from "react-router-dom";
import CampsiteForm from "../../components/campsites/campsite-form/campsite-form.jsx";
import CampsiteIcon from "../../components/campsites/campsite-icon.jsx";

export default function EditCampsite() {
    const {campsite} = useLoaderData();
    const handleUpdateCampsite = async (campsite) => {
        console.log("Update campsite: ", campsite);
        //TODO: Add API call to update campsite
    }

    return (
        <div className="row">
            <h1 className="page-header-margin text-center">Locatie bewerken</h1>
            <h2 className="text-center"><CampsiteIcon campsiteType={campsite.campsiteType}/> {campsite.name}</h2>
            <hr />
            <CampsiteForm campsite={campsite} onSubmit={handleUpdateCampsite}/>
        </div>
    );
}