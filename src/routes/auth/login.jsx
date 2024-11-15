import {useForm} from "react-hook-form";
import RequiredMark from "../../components/shared/required-mark.jsx";
import {useState} from "react";
import {backendApi} from "../../utils/backend-api.jsx";
import {useNavigate} from "react-router-dom";
import {useAuth} from "../../providers/auth-provider.jsx";

export default function Login() {
    const navigate = useNavigate();
    const {updateToken} = useAuth();
    const [errMsg, setErrMsg] = useState('');
    const [isSubmitProcessing, setIsSubmitProcessing] = useState(false);
    const {register, handleSubmit, formState: {errors}, watch} = useForm({
        mode: "onBlur"
    });

    const handleLogin = async (value) => {
        setIsSubmitProcessing(true);
        setErrMsg("");

        try {
            const response = await backendApi.post("/auth/login", value);
            console.log("Login successful: ", response);
            updateToken(response.data.token);
            navigate("/campsites");
        } catch (error) {
            console.error("Failed to log in: ", error);
            if (error?.response?.status === 403) {
                setErrMsg("Ongeldig e-mailadres en/of wachtwoord");
            } else {
                setErrMsg("Er ging iets fout. Probeer het later opnieuw.");
            }
        } finally {
            setIsSubmitProcessing(false);
        }
    };

    return (
        <div className="container">
            <div className="row">
                <div className="col-12 col-md-8 offset-md-2 col-lg-6 offset-lg-3 my-5">
                    <div className="card shadow-sm">
                        <div className="card-body bg-light">
                            <h1 className="text-center">Log in</h1>
                            <hr/>
                            {errMsg && <div className="alert alert-danger">{errMsg}</div>}
                            <p>Om gebruik te kunnen maken van deze applicatie dien je ingelogd te zijn. Heb je geen
                                gebruikersaccount? Vraag er dan een aan bij een administrator.</p>
                            <form onSubmit={handleSubmit(handleLogin)}>
                                <div className="mb-3">
                                    <label htmlFor="email">E-mailadres<RequiredMark/></label>
                                    <input
                                        type="text"
                                        className={"form-control" + (errors.email ? " is-invalid" : "")}
                                        id="email"
                                        {...register("email", {
                                            required: "Dit veld is verplicht",
                                            pattern: {
                                                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                                                message: "Voer een geldig e-mailadres in"
                                            }
                                        })}
                                    />
                                    {errors.email && <div className="invalid-feedback">{errors.email.message}</div>}
                                </div>
                                <div className="mb-5">
                                    <label htmlFor="password">Wachtwoord<RequiredMark/></label>
                                    <input
                                        type="password"
                                        className={"form-control" + (errors.password ? " is-invalid" : "")}
                                        id="password"
                                        {...register("password", {required: "Dit veld is verplicht"})}
                                    />
                                    {errors.password &&
                                        <div className="invalid-feedback">{errors.password.message}</div>}
                                </div>
                                <div className="d-grid gap-2">
                                    <button type="submit" className="btn btn-primary" disabled={isSubmitProcessing}>
                                        {isSubmitProcessing &&
                                            <span className="spinner-border spinner-border-sm me-1"
                                                  role="status"></span>}
                                        Inloggen
                                    </button>
                                </div>
                            </form>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}