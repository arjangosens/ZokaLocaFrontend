import {useForm} from "react-hook-form";
import {useAuth} from "../../providers/auth-provider.jsx";
import PropTypes from "prop-types";
import RequiredMark from "../shared/required-mark.jsx";

export default function VisitForm({visit, onSubmit}) {
    const {loggedInUser} = useAuth();
    const {register, handleSubmit, formState: {errors}, watch} = useForm({
        mode: "onBlur"
    });

    const onSubmitHandler = (data) => {
        console.log("Submit visit: ", data);
        onSubmit(data);
    }

    return (
        <form onSubmit={onSubmit(onSubmitHandler)}>
            {/* Branch select */}
            <div className="mb-3">
                <label>Speltak<RequiredMark/></label>
                <select
                    className={"form-select" + (errors.branchId ? " is-invalid" : "")}
                    {...register("branchId", {required: "Speltak is vereist"})}
                    defaultValue={visit?.branchId}
                >
                    {loggedInUser.branches.map(branch => (
                        <option key={branch.id} value={branch.id}>{branch.name}</option>
                    ))}
                </select>
                {errors.branchId && <div className="invalid-feedback">{errors.branchId.message}</div>}
            </div>

            {/* Arrival and departure dates */}
            <div className="card mb-3">
                <div className="card-header">
                    <i className="fa-solid fa-calendar"></i> Huurperiode
                </div>
                <div className="card-body">
                    <div className="row">
                        <div className="col-6">
                            <label>Van<RequiredMark/></label>
                            <input
                                type="date"
                                className={"form-control" + (errors.arrivalDate ? " is-invalid" : "")}
                                {...register("arrivalDate", {required: "Aankomstdatum is vereist"})}
                                defaultValue={visit?.arrivalDate}
                            />
                            {errors.arrivalDate && <div className="invalid-feedback">{errors.arrivalDate.message}</div>}
                        </div>
                        <div className="col-6">
                            <label>Tot en met<RequiredMark/></label>
                            <input
                                type="date"
                                className={"form-control" + (errors.departureDate ? " is-invalid" : "")}
                                {...register("departureDate", {required: "Vertrekdatum is vereist"})}
                                defaultValue={visit?.departureDate}
                            />
                            {errors.departureDate &&
                                <div className="invalid-feedback">{errors.departureDate.message}</div>}
                        </div>
                    </div>
                </div>
            </div>

            {/* Number of people */}

            {/* Price */}

            {/* Pros and cons */}

            {/* Description */}

            {/* Submit button */}
        </form>
    )
}

VisitForm.propTypes = {
    visit: PropTypes.object,
    onSubmit: PropTypes.func.isRequired
}