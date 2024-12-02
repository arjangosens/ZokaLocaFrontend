import PropTypes from "prop-types";
import {useState} from "react";
import {useForm} from "react-hook-form";
import {backendApi} from "../../../utils/backend-api.jsx";
import {Button, Modal} from "react-bootstrap";

export default function EditCampsiteAssetModal({campsite, asset, isShown, onClose, onAssetUpdated}) {
    const [isSubmitProcessing, setIsSubmitProcessing] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const {register, handleSubmit, formState: {errors}} = useForm({
        mode: "onBlur"
    });

    const onSubmit = async (data) => {
        setIsSubmitProcessing(true);
        setErrorMsg("");

        try {
            const formData = new FormData();
            if (data.file && data.file.length > 0) {
                formData.append('file', data.file[0]);
            }

            formData.append('name', data.name);
            formData.append('isThumbnail', data.isThumbnail);

            const response = await backendApi.patch(`/campsites/${campsite.id}/assets/${asset.id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            if (response?.status === 200) {
                onAssetUpdated();
                onClose();
            } else {
                setErrorMsg("Failed to update asset: " + response?.status);
            }

        } catch (error) {
            console.error("Failed to update asset: ", error);
            setErrorMsg(error.message);
        } finally {
            setIsSubmitProcessing(false);
        }
    };


    return (
        <Modal show={isShown} onHide={onClose}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Modal.Header closeButton>
                    <Modal.Title>Afbeelding bewerken</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {errorMsg && <div className="alert alert-danger">{errorMsg}</div>}
                    {/* File */}
                    <div className="mb-3">
                        <label>Bestand <small className="text-info">(Blijft hetzelfde indien er niks geüpload wordt.)</small></label>
                        <input
                            type="file"
                            className={"form-control" + (errors.file ? " is-invalid" : "")}
                            {...register("file")}
                            disabled={isSubmitProcessing}
                        />
                        {errors.file && <div className="invalid-feedback">{errors.file.message}</div>}
                    </div>

                    {/* Name */}
                    <div className="mb-3">
                        <label>Naam</label>
                        <input
                            type="text"
                            className={"form-control" + (errors.name ? " is-invalid" : "")}
                            {...register("name", {required: "Naam is vereist"})}
                            disabled={isSubmitProcessing}
                            defaultValue={asset.name}
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
                            defaultChecked={asset.isThumbnail}
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
                                                     aria-hidden="true"></span>} Opslaan
                    </Button>
                </Modal.Footer>
            </form>
        </Modal>
    );
}

EditCampsiteAssetModal.propTypes = {
    campsite: PropTypes.object.isRequired,
    asset: PropTypes.object.isRequired,
    isShown: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onAssetUpdated: PropTypes.func.isRequired
}