import PropTypes from "prop-types";
import { useState } from "react";
import { useForm } from "react-hook-form";

export default function ExternalSourcesForm({ initialExternalSources, onExternalSourcesChange }) {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [externalSources, setExternalSources] = useState(initialExternalSources || {});

    const onSubmit = (data) => {
        const updatedSources = {
            ...externalSources,
            [data.name.toLowerCase()]: data.url,
        };
        setExternalSources(updatedSources);
        onExternalSourcesChange(updatedSources);
    };

    const deleteExternalSource = (name) => {
        const updatedSources = { ...externalSources };
        delete updatedSources[name];
        setExternalSources(updatedSources);
        onExternalSourcesChange(updatedSources);
    };

    return (
        <>
            <div onSubmit={handleSubmit(onSubmit)} onKeyDown={(e) => e.key === 'Enter' && e.preventDefault()}>
                <div className="input-group mb-2">
                    <input className={"form-control" + (errors.name ? " is-invalid" : "")}
                           placeholder="Naam" {...register("name", { required: true })} />
                    <input className={"form-control" + (errors.url ? " is-invalid" : "")}
                           placeholder="URL" {...register("url", { required: true })} />
                    <button type="button" className="btn btn-outline-secondary" onClick={handleSubmit(onSubmit)}>
                        <i className="fa-solid fa-plus"></i>
                    </button>
                </div>
                {errors.name && <div className="text-danger">Naam is vereist</div>}
                {errors.url && <div className="text-danger">URL is vereist</div>}
            </div>
            <hr />
            <table className="table">
                <thead>
                <tr>
                    <th scope="col">Naam</th>
                    <th scope="col">URL</th>
                    <th scope="col"></th>
                </tr>
                </thead>
                <tbody className="table-group-divider">
                {externalSources && Object.keys(externalSources).map((key) => (
                    <tr key={key}>
                        <td>{key.charAt(0).toUpperCase() + key.slice(1)}</td>
                        <td>
                            <a href={externalSources[key]} target="_blank" rel="noopener noreferrer">
                                {externalSources[key]}
                            </a>
                        </td>
                        <td>
                            <button type="button" className="btn btn-sm btn-outline-danger float-end"
                                    onClick={() => deleteExternalSource(key)}><i
                                className="fa-solid fa-trash"></i></button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </>
    );
}

ExternalSourcesForm.propTypes = {
    initialExternalSources: PropTypes.object,
    onExternalSourcesChange: PropTypes.func.isRequired,
};