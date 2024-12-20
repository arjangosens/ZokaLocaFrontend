import {useState, useEffect} from "react";
import {Button, Modal} from "react-bootstrap";
import {useForm} from "react-hook-form";
import RequiredMark from "../shared/required-mark.jsx";
import MultiBranchTypeahead from "../branches/multi-branch-typeahead.jsx";
import useBranch from "../../hooks/use-branch.jsx";
import {backendApi} from "../../utils/backend-api.jsx";

export default function CreateConversationModal({show, onClose, onConversationCreated, initialSelectedBranch}) {
    const {register, handleSubmit, formState: {errors}} = useForm({
        mode: "onBlur"
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [formData, setFormData] = useState({ branchIds: initialSelectedBranch ? [initialSelectedBranch.id] : [] });

    const handleBranchesChanged = (branches) => {
        const branchIds = branches.map(branch => branch.id);
        setFormData({...formData, branchIds});
    };

    const createConversation = async (data) => {
        try {
            setLoading(true);
            const response = await backendApi.post('/conversations', JSON.stringify({
                name: data.name,
                branchIds: formData.branchIds
            }), {
                headers: {'Content-Type': 'application/JSON'},
                withCredentials: true
            });

            if (response?.status === 200) {
                onConversationCreated();
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <Modal show={show} onHide={onClose}>
            <form onSubmit={handleSubmit(createConversation)}>
                <Modal.Header closeButton>
                    <Modal.Title>Gesprek aanmaken</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>
                        {error && <div className="alert alert-danger">{error}</div>}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="name">Naam<RequiredMark /></label>
                        <input
                            id="name"
                            className={`form-control ${errors.name ? "is-invalid" : ""}`}
                            type="text"
                            placeholder={"Naam"}
                            {...register("name", {required: true})}
                            disabled={loading}
                        />
                        {errors.name && <span className="text-danger">Dit veld is vereist</span>}
                    </div>
                    <div className="mb-3">
                        <label>Speltakken</label>
                        <MultiBranchTypeahead
                            initialSelectedBranches={initialSelectedBranch ? [initialSelectedBranch] : []}
                            onSelectedBranchesChange={handleBranchesChanged}
                            disabled={loading}
                        />
                    </div>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="dark" onClick={onClose}>
                        Annuleren
                    </Button>
                    <Button variant="primary" onClick={handleSubmit(createConversation)} disabled={loading}>
                        {loading && <span className="spinner-border spinner-border-sm" role="status"
                                          aria-hidden="true"></span>} Gesprek aanmaken
                    </Button>
                </Modal.Footer>
            </form>
        </Modal>
    )
}