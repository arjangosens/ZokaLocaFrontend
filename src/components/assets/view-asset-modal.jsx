import {Modal} from "react-bootstrap";
import AuthenticatedImage from "../shared/authenticated-image.jsx";
import PropTypes from "prop-types";

export default function ViewAssetModal({asset, onClose}) {
    return (
        <Modal show={true} onHide={onClose}>
            <Modal.Header closeButton>
                <Modal.Title>Afbeelding bekijken</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <AuthenticatedImage alt={asset.name} imageId={asset.id} className={"img-fluid"} />
            </Modal.Body>
        </Modal>
    );
}

ViewAssetModal.propTypes = {
    asset: PropTypes.object.isRequired,
    onClose: PropTypes.func.isRequired
}