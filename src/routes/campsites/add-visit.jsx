import {useLoaderData, useNavigate} from "react-router-dom";
import CampsiteIcon from "../../components/campsites/campsite-icon.jsx";
import VisitForm from "../../components/visits/visit-form.jsx";
import {backendApi} from "../../utils/backend-api.jsx";
import {useState} from "react";

export default function AddVisit() {
    const {campsite} = useLoaderData();
    const [errorMsg, setErrorMsg] = useState(null);
    const [isSubmitProcessing, setIsSubmitProcessing] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (data) => {
        setIsSubmitProcessing(true);
        setErrorMsg(null);

        const visit = {
            ...data,
            campsiteId: campsite.id
        };

        try {
            const response = await backendApi.post("/visits", visit);
            console.log("Visit added: ", response.data);
            navigate(`/campsites/${campsite.id}`);
        } catch (error) {
            console.error("Add visit failed: ", error);
            setErrorMsg(error.message);
        } finally {
            setIsSubmitProcessing(false);
        }
    };

    return (
        <div className="container">
        <div className="row">
            <h1 className="page-header-margin text-center">Bezoek toevoegen</h1>
            <h2 className="text-center"><CampsiteIcon campsiteType={campsite.campsiteType}/> {campsite.name}</h2>
            <hr/>
            {errorMsg && <div className="alert alert-danger">{errorMsg}</div>}
            <VisitForm isSubmitProcessing={isSubmitProcessing} onSubmit={handleSubmit}/>
        </div>
        </div>);
}