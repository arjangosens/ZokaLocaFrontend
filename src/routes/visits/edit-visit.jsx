import {useLoaderData, useNavigate} from "react-router-dom";
import {useState} from "react";
import CampsiteIcon from "../../components/campsites/campsite-icon.jsx";
import VisitForm from "../../components/visits/visit-form.jsx";
import {backendApi} from "../../utils/backend-api.jsx";

export default function EditVisit() {
    const {visit} = useLoaderData();
    const [errorMsg, setErrorMsg] = useState(null);
    const [isSubmitProcessing, setIsSubmitProcessing] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (data) => {
        setIsSubmitProcessing(true);
        setErrorMsg(null);

        const body = {
            ...data
        }

        try {
            const response = await backendApi.put(`/visits/${visit.id}`, body);
            console.log("Visit added: ", response.data);
            navigate(`/campsites/${visit.campsiteId}`);
        } catch (error) {
            console.error("Update visit failed: ", error);
            setErrorMsg(error.message);
        } finally {
            setIsSubmitProcessing(false);
        }
    };

    return (
        <div className="container">
            <div className="row">
                <h1 className="page-header-margin text-center">Bezoek Bewerken</h1>
                <h2 className="text-center"><CampsiteIcon campsiteType={visit.campsite.campsiteType}/> {visit.campsite.name} • <i className="fa-solid fa-users-between-lines"></i> {visit.branch.name}</h2>
                <hr/>
                {errorMsg && <div className="alert alert-danger">{errorMsg}</div>}
                <VisitForm visit={visit} isSubmitProcessing={isSubmitProcessing} disableBranchSelect={true} onSubmit={handleSubmit}/>
            </div>
        </div>);
}