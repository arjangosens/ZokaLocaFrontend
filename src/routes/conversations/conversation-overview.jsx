import {useAuth} from "../../providers/auth-provider.jsx";
import {Link, useSearchParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {backendApi} from "../../utils/backend-api.jsx";
import useBranch from "../../hooks/use-branch.jsx";
import CreateConversationModal from "../../components/conversations/create-conversation-modal.jsx";

export default function ConversationOverview() {
    const {loggedInUser, refreshUserInfo} = useAuth();
    const [searchParams, setSearchParams] = useSearchParams();
    const [conversations, setConversations] = useState([]);
    const [errorMsg, setErrorMsg] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const {selectedBranch, updateBranch} = useBranch();
    const [showCreateModal, setShowCreateModal] = useState(false);


    const getConversations = async (branchId) => {
        setErrorMsg(null);
        setIsLoading(true);
        setConversations([]);
        try {
            const response = await backendApi.get(`/conversations/branch/${branchId}`);
            setConversations(response.data);
        } catch (error) {
            console.error("Failed to fetch visits: ", error);
        } finally {
            setIsLoading(false);
        }
    }

    const handleCreateBtnClicked = () => {
        setShowCreateModal(true);
    }

    const handleModalClosed = () => {
        setShowCreateModal(false);
    }

    const handleConversationCreated = () => {
        setShowCreateModal(false);
        getConversations(selectedBranch.id).then();
    }

    useEffect(() => {
        refreshUserInfo().then(() => {
            updateBranch(null);
        });
    }, []);

    useEffect(() => {
        if (selectedBranch) {
            getConversations(selectedBranch.id).then();
        }
    }, [selectedBranch]);

    return (<>
        <div className="toolbar fixed-top d-flex align-items-center">
            <div className="flex-shrink-1 me-auto">
                {/*Branch select*/}
                <select
                    className="form-select"
                    value={selectedBranch?.id}
                    onChange={(e) => {
                        setSearchParams({branchId: e.target.value});
                        updateBranch(e.target.value);
                    }}
                >
                    {loggedInUser.branches.map(branch => (
                        <option key={branch.id} value={branch.id}>{branch.name}</option>
                    ))}
                </select>
            </div>
            <button className="ms-2 btn btn-sm btn-dark" onClick={handleCreateBtnClicked}>
                <i className="fa-solid fa-plus"></i>
            </button>
        </div>

        <div className="container">
            <div className="nav-size"></div>
            <h1 className="text-center page-header-margin">Gesprekken</h1>
            <hr/>
            {isLoading && <div className="text-center">
                <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
            }
            {errorMsg && <p className="text-danger">{errorMsg}</p>
            }

            {conversations.map(conversation => (
                <div key={conversation.id} className="col">
                    <div className="card mb-2 zoom">
                        <div className="card-body">
                            <h5 className="card-title">{conversation.name} {conversation.branches.map((branch) => (
                                <small key={branch.id} className="badge text-bg-light me-1">{branch.name}</small>
                            ))}</h5>
                            <p className="card-text">{conversation.description}</p>
                            <Link to={`/conversations/${conversation.id}`} className="stretched-link"></Link>
                        </div>
                    </div>
                </div>
            ))}

        </div>

        {showCreateModal && <CreateConversationModal show={showCreateModal} initialSelectedBranch={selectedBranch} onClose={handleModalClosed} onConversationCreated={handleConversationCreated} />}
    </>);
}