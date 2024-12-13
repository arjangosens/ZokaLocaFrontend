import {useForm} from "react-hook-form";
import {useState} from "react";
import MultiBranchTypeahead from "../../components/branches/multi-branch-typeahead.jsx";
import {backendApi} from "../../utils/backend-api.jsx";
import {useNavigate} from "react-router-dom";
import UserRole from "../../domain/enums/user-role.jsx";
import EnumUtils from "../../utils/enum-utils.jsx";

export default function RegisterUser() {
    const navigate = useNavigate();
    const {register, handleSubmit, formState: {errors}, watch} = useForm({
        mode: "onBlur"
    });

    const [errMsg, setErrMsg] = useState('');
    const [formData, setFormData] = useState({});
    const [isSubmitProcessing, setIsSubmitProcessing] = useState(false);

    const handleRegisterUser = async (user) => {
        setIsSubmitProcessing(true);
        setErrMsg("");
        const completeFormData = {...user, branchIds: formData.branchIds};
        console.log("Register user: ", completeFormData);

        try {
            await backendApi.post(`/users`, completeFormData);
            navigate(`/users`);
        } catch (error) {
            console.error("Failed to register user: ", error);
            if (error.response.status === 409) {
                setErrMsg("Er bestaat al een gebruiker met dit e-mailadres.");
            } else {
                setErrMsg("Er is een fout opgetreden bij het registreren van de gebruiker. Probeer het later opnieuw.");
            }
        } finally {
            setIsSubmitProcessing(false);
        }
    }

    const handleBranchesChanged = (branches) => {
        const branchIds = branches.map(branch => branch.id);
        setFormData({...formData, branchIds});
    };

    const password = watch("password");

    return (
        <div className="container" data-cy="register-user-container">
            <div className="row">
                <h1 className="page-header-margin text-center">Gebruiker registreren</h1>
                <hr/>
                <form onSubmit={handleSubmit(handleRegisterUser)} data-cy="register-user-form">

                    {/* Error message */}
                    {errMsg && <div className="alert alert-danger" data-cy="register-user-error">{errMsg}</div>}

                    {/* First and last name */}
                    <div className="row">
                        <div className="col-6 mb-3">
                            <label>Voornaam<small className="text-danger">*</small></label>
                            <input
                                className={"form-control" + (errors.firstName ? " is-invalid" : "")}
                                placeholder="Voornaam"
                                type="text"
                                {...register("firstName", {required: true})}
                                disabled={isSubmitProcessing}
                                data-cy="register-user-first-name"
                            />
                            {errors.firstName && <div className="invalid-feedback">Dit veld is vereist</div>}
                        </div>
                        <div className="col-6 mb-3">
                            <label>Achternaam<small className="text-danger">*</small></label>
                            <input
                                className={"form-control" + (errors.lastName ? " is-invalid" : "")}
                                placeholder="Achternaam"
                                type="text"
                                {...register("lastName", {required: true})}
                                disabled={isSubmitProcessing}
                                data-cy="register-user-last-name"
                            />
                            {errors.lastName && <div className="invalid-feedback">Dit veld is vereist</div>}
                        </div>
                    </div>

                    {/* Email */}
                    <div className="mb-3">
                        <label>E-mailadres<small className="text-danger">*</small></label>
                        <input
                            className={"form-control" + (errors.email ? " is-invalid" : "")}
                            placeholder="E-mailadres"
                            type="email"
                            {...register("email", {
                                required: "Dit veld is vereist",
                                pattern: {
                                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                                    message: "Ongeldig e-mailadres"
                                }
                            })}
                            disabled={isSubmitProcessing}
                            data-cy="register-user-email"
                        />
                        {errors.email && <div className="invalid-feedback">{errors.email.message}</div>}
                    </div>

                    {/* Password */}
                    <div className="row">
                        <div className="col-md-6 mb-3">
                            <label>Wachtwoord<small className="text-danger">*</small></label>
                            <input
                                className={"form-control" + (errors.password ? " is-invalid" : "")}
                                placeholder="Wachtwoord"
                                type="password"
                                {...register("password", {
                                    required: "Dit veld is vereist",
                                    minLength: {
                                        value: 8,
                                        message: "Wachtwoord moet minimaal 8 tekens lang zijn"
                                    }
                                })}
                                disabled={isSubmitProcessing}
                                data-cy="register-user-password"
                            />
                            {errors.password && <div className="invalid-feedback">{errors.password.message}</div>}
                        </div>
                        <div className="col-md-6 mb-3">
                            <label>Herhaal wachtwoord<small className="text-danger">*</small></label>
                            <input
                                className={"form-control" + (errors.confirmPassword ? " is-invalid" : "")}
                                placeholder="Herhaal wachtwoord"
                                type="password"
                                {...register("confirmPassword", {
                                    required: "Dit veld is vereist",
                                    validate: value => value === password || "Wachtwoorden komen niet overeen"
                                })}
                                disabled={isSubmitProcessing}
                                data-cy="register-user-confirm-password"
                            />
                            {errors.confirmPassword && <div className="invalid-feedback">{errors.confirmPassword.message}</div>}
                        </div>
                    </div>

                    {/* Role */}
                    <div className="mb-3">
                        <label>Rol<small className="text-danger">*</small></label>
                        <select
                            className={"form-select" + (errors.role ? " is-invalid" : "")}
                            {...register("role", {required: "Dit veld is vereist"})}
                            disabled={isSubmitProcessing}
                            data-cy="register-user-role"
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
                            onSelectedBranchesChange={handleBranchesChanged}
                            disabled={isSubmitProcessing}
                        />
                    </div>
                    <button type="submit" className="btn btn-primary" disabled={isSubmitProcessing} data-cy="register-user-submit">
                        {isSubmitProcessing &&
                            <span className="spinner-border spinner-border-sm me-1" role="status"></span>}
                        Opslaan
                    </button>
                </form>
            </div>
        </div>
    );
}