import CampsiteForm from "../../components/campsites/campsite-form/campsite-form.jsx";
import {backendApi} from "../../utils/backend-api.jsx";
import {useNavigate} from "react-router-dom";

export default function CreateCampsite() {
    const navigate = useNavigate();

    const handleCreateCampsite = async (campsite) => {
        campsite.facilityIds = campsite.facilities.map(facility => facility.id);
        delete campsite.facilities;
        console.log("Create campsite: ", campsite);

        try {
            await backendApi.post(`/campsites`, campsite);
            navigate(`/campsites`);
        } catch (error) {
            console.error("Failed to create campsite: ", error);
            alert("Failed to create campsite. Please try again.");
        }
    }

    return (
        <div className="container">
            <div className="row">
                <h1 className="page-header-margin text-center">Locatie toevoegen</h1>
                <hr/>
                <CampsiteForm onSubmit={handleCreateCampsite}/>
            </div>
        </div>
    );
}