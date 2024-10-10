import {useLoaderData, useNavigate} from "react-router-dom";
import CampsiteForm from "../../components/campsites/campsite-form/campsite-form.jsx";
import CampsiteIcon from "../../components/campsites/campsite-icon.jsx";
import {backendApi} from "../../utils/backend-api.jsx";

export default function EditCampsite() {
    const navigate = useNavigate();
    const {campsite} = useLoaderData();

    const handleUpdateCampsite = async (campsite) => {
        campsite.facilityIds = campsite.facilities.map(facility => facility.id);
        delete campsite.facilities;
        console.log("Update campsite: ", campsite);

        try {
            await backendApi.put(`/campsites/${campsite.id}`, campsite);
            navigate(`/campsites/${campsite.id}`);
        } catch (error) {
            console.error("Failed to update campsite: ", error);
            alert("Failed to update campsite. Please try again.");
        }
    }

    return (
        <div className="row">
            <h1 className="page-header-margin text-center">Locatie bewerken</h1>
            <h2 className="text-center"><CampsiteIcon campsiteType={campsite.campsiteType}/> {campsite.name}</h2>
            <hr/>
            <CampsiteForm campsite={campsite} onSubmit={handleUpdateCampsite}/>
        </div>
    );
}