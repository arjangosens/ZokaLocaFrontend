import {useState} from "react";
import {Button, Modal} from "react-bootstrap";
import PropTypes from "prop-types";
import {useForm} from "react-hook-form";
import RequiredMark from "../../shared/required-mark.jsx";
import {backendApi} from "../../../utils/backend-api.jsx";

export default function CreateCampsiteAssetModal({campsite, isShown, onClose, onAssetCreated}) {
    const [isSubmitProcessing, setIsSubmitProcessing] = useState(false);
    const [error, setError] = useState(null);
    const {register, handleSubmit, formState: {errors}} = useForm({
        mode: "onBlur"
    });


    const onSubmit = async (data) => {
        setIsSubmitProcessing(true);
        setError(null);

        try {
            const formData = new FormData();
            formData.append('file', data.file[0]);
            formData.append('name', data.name);
            formData.append('isThumbnail', data.isThumbnail);

            const response = await backendApi.post(`/campsites/${campsite.id}/assets`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            if (response?.status === 200) {
                onAssetCreated();
                onClose();
            } else {
                setError(new Error("Failed to create asset" + response?.status));
            }

        } catch (error) {
            console.error("Failed to create asset: ", error);
            setError(error);
        } finally {
            setIsSubmitProcessing(false);
        }
        // Handle form submission
        console.log("Create asset for campsite: ", campsite.id);
        console.log(data);
    };


    return (
        <Modal show={isShown} onHide={onClose}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Modal.Header closeButton>
                    <Modal.Title>Afbeelding toevoegen</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {/* File */}
                    <div className="mb-3">
                        <label>Bestand<RequiredMark/></label>
                        <input
                            type="file"
                            className={"form-control" + (errors.file ? " is-invalid" : "")}
                            {...register("file", {required: "Bestand is vereist"})}
                            disabled={isSubmitProcessing}
                        />
                        {errors.file && <div className="invalid-feedback">{errors.file.message}</div>}
                    </div>

                    {/* Name */}
                    <div className="mb-3">
                        <label>Naam<RequiredMark/></label>
                        <input
                            type="text"
                            className={"form-control" + (errors.name ? " is-invalid" : "")}
                            {...register("name", {required: "Naam is vereist"})}
                            disabled={isSubmitProcessing}
                        />
                        {errors.name && <div className="invalid-feedback">{errors.name.message}</div>}
                    </div>

                    {/* Is thumbnail? */}
                    <div className="mb-3 form-check">
                        <input
                            id="isThumbnail"
                            type="checkbox"
                            className="form-check-input"
                            {...register("isThumbnail")}
                            disabled={isSubmitProcessing}
                        />
                        <label htmlFor="isThumbnail" className="form-check-label">Gebruiken als thumbnail</label>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="dark" onClick={onClose}>
                        Annuleren
                    </Button>
                    <Button variant="primary" onClick={handleSubmit(onSubmit)} disabled={isSubmitProcessing}>
                        {isSubmitProcessing && <span className="spinner-border spinner-border-sm" role="status"
                                          aria-hidden="true"></span>} Afbeelding toevoegen
                    </Button>
                </Modal.Footer>
            </form>
        </Modal>
    );
}

CreateCampsiteAssetModal.propTypes = {
    campsite: PropTypes.object.isRequired,
    isShown: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired
}