import {useLoaderData, useNavigate} from "react-router-dom";
import {useForm} from "react-hook-form";
import {useState} from "react";
import {backendApi} from "../../utils/backend-api.jsx";
import MultiUserTypeahead from "../../components/users/multi-user-typeahead.jsx";

export default function EditBranch() {
    const {branch} = useLoaderData();
    const navigate = useNavigate();
    const {register, handleSubmit, formState: {errors}, watch} = useForm({
        mode: "onBlur"
    });

    const [errMsg, setErrMsg] = useState('');
    const [formData, setFormData] = useState({ userIds: branch.users.map(user => user.id) });
    const [isSubmitProcessing, setIsSubmitProcessing] = useState(false);

    const handleUpdateBranch = async (value) => {
        setIsSubmitProcessing(true);
        setErrMsg("");
        const completeFormData = {...value, userIds: formData?.userIds ?? []};
        console.log("Update branch: ", value);

        try {
            await backendApi.put(`/branches/${branch.id}`, completeFormData);
            navigate(`/branches/${branch.id}`);
        } catch (error) {
            console.error("Failed to update branch: ", error);
            if (error.response.status === 409) {
                setErrMsg("Er bestaat al een speltak met deze naam.");
            } else {
                setErrMsg("Er is een fout opgetreden bij het bijwerken van de speltak. Probeer het later opnieuw.");
            }
        } finally {
            setIsSubmitProcessing(false);
        }
    }

    const handleUsersChanged = (users) => {
        const userIds = users.map(user => user.id);
        setFormData({...formData, userIds});
    }

    return (
        <div className="container">
            <div className="row">
                <h1 className="page-header-margin text-center">Speltak bewerken</h1>
                <h2 className="text-center"><i className="fa-solid fa-users-between-lines"/> {branch.name}</h2>
                <hr/>
                <form onSubmit={handleSubmit(handleUpdateBranch)}>

                    {/* Error message */}
                    {errMsg && <div className="alert alert-danger">{errMsg}</div>}

                    {/* Name */}
                    <div className="mb-3">
                        <label>Naam<small className="text-danger">*</small></label>
                        <input
                            type="text"
                            className={"form-control" + (errors.name ? " is-invalid" : "")}
                            defaultValue={branch.name}
                            {...register("name", {required: "Naam is verplicht"})}
                        />
                        {errors.name && <div className="invalid-feedback">{errors.name.message}</div>}
                    </div>

                    {/* Users */}
                    <div className="mb-3">
                        <label>Gebruikers</label>
                        <MultiUserTypeahead
                            initialSelectedUsers={branch.users}
                            onSelectedUsersChange={handleUsersChanged}
                            disabled={isSubmitProcessing}
                        />
                    </div>

                    <button type="submit" className="btn btn-primary" disabled={isSubmitProcessing}>
                        {isSubmitProcessing &&
                            <span className="spinner-border spinner-border-sm me-1" role="status"></span>}
                        Opslaan
                    </button>
                </form>
            </div>
        </div>
    );
}