import {useLoaderData, useNavigate} from "react-router-dom";
import {useForm} from "react-hook-form";
import {useState} from "react";
import {backendApi} from "../../utils/backend-api.jsx";
import MultiBranchTypeahead from "../../components/branches/multi-branch-typeahead.jsx";

export default function EditUser() {
    const {user} = useLoaderData();
    const navigate = useNavigate();
    const {register, handleSubmit, formState: {errors}, watch} = useForm({
        mode: "onBlur"
    });

    const [errMsg, setErrMsg] = useState('');
    const [formData, setFormData] = useState({});
    const [isSubmitProcessing, setIsSubmitProcessing] = useState(false);

    const handleUpdateUser = async (value) => {
        setIsSubmitProcessing(true);
        setErrMsg("");
        const completeFormData = {...value, branchIds: formData?.branchIds ?? []};
        console.log("Update user: ", completeFormData);

        try {
            await backendApi.put(`/users/${user.id}`, completeFormData);
            navigate(`/users`);
        } catch (error) {
            console.error("Failed to update user: ", error);
            if (error.response.status === 409) {
                setErrMsg("Er bestaat al een gebruiker met dit e-mailadres.");
            } else {
                setErrMsg("Er is een fout opgetreden bij het bijwerken van de gebruiker. Probeer het later opnieuw.");
            }
        } finally {
            setIsSubmitProcessing(false);
        }
    }

    const handleBranchesChanged = (branches) => {
        const branchIds = branches.map(branch => branch.id);
        setFormData({...formData, branchIds});
    };

    return (
        <div className="container">
            <div className="row">
                <h1 className="page-header-margin text-center">Gebruiker bewerken</h1>
                <h2 className="text-center"><i className="fa-solid fa-user" /> {user.firstName} {user.lastName}</h2>
                <hr/>
                <form onSubmit={handleSubmit(handleUpdateUser)}>

                    {/* Error message */}
                    {errMsg && <div className="alert alert-danger">{errMsg}</div>}

                    {/* Role */}
                    <div className="mb-3">
                        <label>Rol<small className="text-danger">*</small></label>
                        <select
                            className={"form-select" + (errors.role ? " is-invalid" : "")}
                            {...register("role", {required: "Dit veld is vereist"})}
                            defaultValue={user.role}
                            disabled={isSubmitProcessing}
                        >
                            <option value="">Selecteer...</option>
                            <option value="VOLUNTEER">Vrijwilliger</option>
                            <option value="ADMIN">Administrator</option>
                        </select>
                        {errors.role && <div className="invalid-feedback">{errors.role.message}</div>}
                    </div>

                    {/* Branches */}
                    <div className="mb-3">
                        <label>Speltakken</label>
                        <MultiBranchTypeahead
                            initialSelectedBranches={user.branches}
                            onSelectedBranchesChange={handleBranchesChanged}
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