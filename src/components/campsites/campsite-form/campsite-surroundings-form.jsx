import PropTypes from "prop-types";
import { useState } from "react";
import { useForm } from "react-hook-form";
import SurroundingProximity from "../../../domain/enums/surrounding-proximity.jsx";

export default function CampsiteSurroundingsForm({ initialSurroundings, onSurroundingsChange }) {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [surroundings, setSurroundings] = useState(initialSurroundings || {});

    const onSubmit = (data) => {
        const updatedSurroundings = {
            ...surroundings,
            [data.name.toLowerCase()]: data.proximity,
        };
        setSurroundings(updatedSurroundings);
        onSurroundingsChange(updatedSurroundings);
    };

    const deleteSurrounding = (name) => {
        const updatedSurroundings = { ...surroundings };
        delete updatedSurroundings[name];
        setSurroundings(updatedSurroundings);
        onSurroundingsChange(updatedSurroundings);
    };

    const translateProximity = (proximity) => {
        switch (proximity) {
            case SurroundingProximity.NOT_IN_PROXIMITY:
                return "Niet in de buurt";
            case SurroundingProximity.WALKING_DISTANCE:
                return "Loopafstand";
            case SurroundingProximity.CYCLING_DISTANCE:
                return "Fietsafstand";
            default:
                return "Onbekend";
        }
    }

    return (
        <>
            <div onSubmit={handleSubmit(onSubmit)} onKeyDown={(e) => e.key === 'Enter' && e.preventDefault()}>
                <div className="input-group mb-2">
                    <input className={"form-control" + (errors.name ? " is-invalid" : "")}
                           placeholder="Naam" {...register("name", { required: true })} />
                    <select className={"form-select" + (errors.proximity ? " is-invalid" : "")}
                            {...register("proximity", { required: true })}>
                        <option value="">Kies nabijheid...</option>
                        {Object.values(SurroundingProximity).map((proximity) => (
                            <option key={proximity} value={proximity}>
                                {translateProximity(proximity)}
                            </option>
                        ))}
                    </select>
                    <button type="button" className="btn btn-outline-secondary" onClick={handleSubmit(onSubmit)}>
                        <i className="fa-solid fa-plus"></i>
                    </button>
                </div>
                {errors.name && <div className="text-danger">Name is required</div>}
                {errors.proximity && <div className="text-danger">Proximity is required</div>}
            </div>
            <hr />
            <table className="table">
                <thead>
                <tr>
                    <th scope="col">Naam</th>
                    <th scope="col">Nabijheid</th>
                    <th scope="col"></th>
                </tr>
                </thead>
                <tbody className="table-group-divider">
                {surroundings && Object.keys(surroundings).map((key) => (
                    <tr key={key}>
                        <td>{key.charAt(0).toUpperCase() + key.slice(1)}</td>
                        <td>{translateProximity(surroundings[key])}</td>
                        <td>
                            <button type="button" className="btn btn-sm btn-outline-danger float-end"
                                    onClick={() => deleteSurrounding(key)}><i
                                className="fa-solid fa-trash"></i></button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </>
    );
}

CampsiteSurroundingsForm.propTypes = {
    initialSurroundings: PropTypes.object,
    onSurroundingsChange: PropTypes.func.isRequired,
};