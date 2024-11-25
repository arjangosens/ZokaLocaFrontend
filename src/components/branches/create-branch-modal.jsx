import {useState} from "react";
import {useForm} from "react-hook-form";
import {backendApi} from "../../utils/backend-api.jsx";
import {Button, Modal} from "react-bootstrap";
import PropTypes from "prop-types";
import RequiredMark from "../shared/required-mark.jsx";

export default function CreateBranchModal({isShown, onClose, onBranchCreated}) {
    const {register, handleSubmit, formState: {errors}} = useForm({
        mode: "onBlur"
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const onSubmit = async (data) => {
        try {
            setLoading(true);
            const response = await backendApi.post('/branches', JSON.stringify({
                name: data.name,
            }), {
                headers: {'Content-Type': 'application/JSON'},
                withCredentials: true
            });

            if (response?.status === 200) {
                onBranchCreated();
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <Modal show={isShown} onHide={onClose}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Modal.Header closeButton>
                    <Modal.Title>Speltak aanmaken</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>
                        {error && <div className="alert alert-danger">{error}</div>}
                    </div>
                    <p>
                        Vul de naam van de speltak in die je wilt aanmaken.
                    </p>
                    <label htmlFor="name">Naam<RequiredMark /></label>
                    <input
                        id="name"
                        className={`form-control ${errors.name ? "is-invalid" : ""}`}
                        type="text"
                        {...register("name", {required: true})}
                        disabled={loading}
                    />
                    {errors.name && <span className="text-danger">Dit veld is vereist</span>}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="dark" onClick={onClose}>
                        Annuleren
                    </Button>
                    <Button variant="primary" onClick={handleSubmit(onSubmit)} disabled={loading}>
                        {loading && <span className="spinner-border spinner-border-sm" role="status"
                                          aria-hidden="true"></span>} Speltak aanmaken
                    </Button>
                </Modal.Footer>
            </form>
        </Modal>
    );
}

CreateBranchModal.propTypes = {
    isShown: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onBranchCreated: PropTypes.func.isRequired
};