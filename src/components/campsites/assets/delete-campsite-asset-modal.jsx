import {useState} from "react";
import {backendApi} from "../../../utils/backend-api.jsx";
import {Button, Modal} from "react-bootstrap";
import PropTypes from "prop-types";

export default function DeleteCampsiteAssetModal({campsite, asset, isShown, onClose, onDeleted}) {
    const [isSubmitProcessing, setIsSubmitProcessing] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");

    const deleteAsset = async () => {
        setIsSubmitProcessing(true);
        setErrorMsg("");

        try {
            const response = await backendApi.delete(`/campsites/${campsite.id}/assets/${asset.id}`);
            if (response?.status === 200) {
                onDeleted();
                onClose();
            } else {
                setErrorMsg("Failed to delete asset: " + response?.status);
            }
        } catch (error) {
            console.log("Failed to delete asset");
            console.error(error);
            setErrorMsg(error.message);
        } finally {
            setIsSubmitProcessing(false);
        }
    }

    return (
        <Modal show={isShown} onHide={onClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Afbeelding verwijderen</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {errorMsg && <div className="alert alert-danger">{errorMsg}</div>}
                    <p>Weet je zeker dat je de afbeelding <b>{asset.name}</b> wilt verwijderen?</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="dark" onClick={onClose}>Annuleren</Button>
                    <Button variant="danger" type="button" onClick={deleteAsset} disabled={isSubmitProcessing}>Verwijderen</Button>
                </Modal.Footer>
        </Modal>
    );
}

DeleteCampsiteAssetModal.propTypes = {
    campsite: PropTypes.object.isRequired,
    asset: PropTypes.object.isRequired,
    isShown: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onDeleted: PropTypes.func.isRequired
}