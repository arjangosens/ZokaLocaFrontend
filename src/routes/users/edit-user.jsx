import {useLoaderData, useNavigate} from "react-router-dom";
import {useForm} from "react-hook-form";
import {useState} from "react";
import {backendApi} from "../../utils/backend-api.jsx";
import MultiBranchTypeahead from "../../components/branches/multi-branch-typeahead.jsx";
import UserRole from "../../domain/enums/user-role.jsx";
import EnumUtils from "../../utils/enum-utils.jsx";

export default function EditUser() {
    const {user} = useLoaderData();
    const navigate = useNavigate();
    const {register, handleSubmit, formState: {errors}, watch} = useForm({
        mode: "onBlur"
    });

    const [errMsg, setErrMsg] = useState('');
    const [formData, setFormData] = useState({ branchIds: user.branches.map(branch => branch.id) });
    const [isSubmitProcessing, setIsSubmitProcessing] = useState(false);

    const handleUpdateUser = async (value) => {
        setIsSubmitProcessing(true);
        setErrMsg("");
        const completeFormData = {...value, branchIds: formData?.branchIds ?? []};
        console.log("Update user: ", completeFormData);

        try {
            await backendApi.put(`/users/${user.id}`, completeFormData);
            navigate(`/users/${user.id}`);
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
        <div className="container" data-cy="edit-user-container">
            <div className="row">
                <h1 className="page-header-margin text-center" data-cy="edit-user-header">Gebruiker bewerken</h1>
                <h2 className="text-center" data-cy="edit-user-subheader"><i className="fa-solid fa-user" /> {user.firstName} {user.lastName}</h2>
                <hr/>
                <form onSubmit={handleSubmit(handleUpdateUser)} data-cy="edit-user-form">

                    {/* Error message */}
                    {errMsg && <div className="alert alert-danger" data-cy="edit-user-error">{errMsg}</div>}

                    {/* Role */}
                    <div className="mb-3">
                        <label>Rol<small className="text-danger">*</small></label>
                        <select
                            className={"form-select" + (errors.role ? " is-invalid" : "")}
                            {...register("role", {required: "Dit veld is vereist"})}
                            defaultValue={user.role}
                            disabled={isSubmitProcessing}
                            data-cy="edit-user-role"
                        >
                            <option value="">Selecteer...</option>
                            {Object.values(UserRole).map(role => (
                                <option key={role} value={role}>{EnumUtils.translateUserRole(role)}</option>
                            ))}
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
                    <button type="submit" className="btn btn-primary" disabled={isSubmitProcessing} data-cy="edit-user-submit">
                        {isSubmitProcessing &&
                            <span className="spinner-border spinner-border-sm me-1" role="status"></span>}
                        Opslaan
                    </button>
                </form>
            </div>
        </div>
    );
}