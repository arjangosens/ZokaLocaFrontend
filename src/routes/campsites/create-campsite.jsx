import CampsiteForm from "../../components/campsites/campsite-form/campsite-form.jsx";

export default function CreateCampsite() {

    const handleCreateCampsite = async (campsite) => {
        console.log("Create campsite: ", campsite);
        //TODO: Add API call to create campsite
    }

    return (
        <div className="row">
            <h1 className="page-header-margin text-center">Locatie toevoegen</h1>
            <hr />
            <CampsiteForm onSubmit={handleCreateCampsite}/>
        </div>
    );
}