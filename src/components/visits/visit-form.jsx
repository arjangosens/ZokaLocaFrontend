import {useForm} from "react-hook-form";
import {useAuth} from "../../providers/auth-provider.jsx";
import PropTypes from "prop-types";
import RequiredMark from "../shared/required-mark.jsx";

export default function VisitForm({visit, isSubmitProcessing, onSubmit, disableBranchSelect = false}) {
    const {loggedInUser} = useAuth();
    const {register, handleSubmit, formState: {errors}, setValue, watch} = useForm({
        mode: "onBlur"
    });

    const onSubmitHandler = (data) => {
        data.pros = data.pros.split("\n").filter(Boolean);
        data.cons = data.cons.split("\n").filter(Boolean);
        console.log("Submit visit: ", data);
        onSubmit(data);
    }

    return (
        <form onSubmit={handleSubmit(onSubmitHandler)}>
            {/* Branch select */}
            <div className="mb-3">
                <label>Speltak<RequiredMark/></label>
                <select
                    className={"form-select" + (errors.branchId ? " is-invalid" : "")}
                    {...register("branchId", disableBranchSelect ? {} : {required: "Speltak is vereist"})}
                    defaultValue={visit?.branchId}
                    disabled={disableBranchSelect || isSubmitProcessing}
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
                                disabled={isSubmitProcessing}
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
                                disabled={isSubmitProcessing}
                            />
                            {errors.departureDate &&
                                <div className="invalid-feedback">{errors.departureDate.message}</div>}
                        </div>
                    </div>
                </div>
            </div>

            {/* Rating */}
            <div className="mb-3">
                <label>Hoe beoordeel je het verblijf?<RequiredMark /> <small
                    className="text-info">(Op een schaal van 1 - 10)</small></label>
                <input
                    type="number"
                    className={"form-control" + (errors.rating ? " is-invalid" : "")}
                    {...register("rating", {
                        min: {value: 1, message: "Beoordeling kan niet lager zijn dan 1"},
                        max: {value: 10, message: "Beoordeling kan niet hoger zijn dan 10"},
                        required: "Beoordeling is vereist"
                    })}
                    defaultValue={visit?.rating}
                    disabled={isSubmitProcessing}
                />
                {errors.rating && <div className="invalid-feedback">{errors.rating.message}</div>}
            </div>

            {/* Number of people */}
            <div className="mb-3">
                <label>Met hoeveel personen was je?</label>
                <div className="input-group">
                    <span className="input-group-text"><i className="fa-solid fa-users"></i></span>
                    <input
                        type="number"
                        placeholder={"?"}
                        className={"form-control" + (errors.numOfPeople ? " is-invalid" : "")}
                        {...register("numOfPeople", {min: {value: 1, message: "Aantal kan niet lager zijn dan 1"}})}
                        defaultValue={visit?.numOfPeople}
                        disabled={isSubmitProcessing}
                    />
                    {errors.numOfPeople && <div className="invalid-feedback">{errors.numOfPeople.message}</div>}
                </div>
            </div>

            {/* Price */}
            <label>Hoe duur was het verblijf?</label>
            <div className="input-group mb-3">
                <span className="input-group-text">€</span>
                <input
                    className={"form-control" + (errors.price ? " is-invalid" : "")}
                    placeholder="?"
                    type="number"
                    step="0.01"
                    {...register("price")}
                    defaultValue={visit?.price}
                    disabled={isSubmitProcessing}
                />
            </div>

            {/* Pros and cons */}
            <div className="card mb-3">
                <div className="card-header">Plus- en minpunten</div>
                <div className="card-body">
                    <div className="row">
                        <div className="col-12 col-md-6 mb-3 mb-md-0">
                            <label>Pluspunten <small className={"text-info"}>(Eén per regel)</small></label>
                            <textarea
                                className="form-control"
                                rows="3"
                                {...register("pros")}
                                defaultValue={visit?.pros?.join("\n")}
                                disabled={isSubmitProcessing}
                            />
                        </div>
                        <div className="col-12 col-md-6">
                            <label>Minpunten <small className={"text-info"}>(Eén per regel)</small></label>
                            <textarea
                                className="form-control"
                                rows="3"
                                {...register("cons")}
                                defaultValue={visit?.cons?.join("\n")}
                                disabled={isSubmitProcessing}
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Description */}
            <div className="mb-3">
                <label>Opmerkingen</label>
                <textarea
                    className="form-control"
                    rows="5"
                    {...register("description")}
                    defaultValue={visit?.description}
                    disabled={isSubmitProcessing}
                />
            </div>

            {/* Submit button */}
            <button className="btn btn-primary mb-5" type="submit" disabled={isSubmitProcessing}>
                {isSubmitProcessing && (<div className="spinner-border spinner-border-sm" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>)}
                Opslaan
            </button>
        </form>
    )
}

VisitForm.propTypes = {
    visit: PropTypes.object,
    onSubmit: PropTypes.func.isRequired,
    isSubmitProcessing: PropTypes.bool.isRequired,
    disableBranchSelect: PropTypes.bool
}