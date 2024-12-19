import {useAuth} from "../../providers/auth-provider.jsx";
import {Link, useSearchParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {backendApi} from "../../utils/backend-api.jsx";
import useBranchId from "../../hooks/use-branch-id.jsx";

export default function ConversationOverview() {
    const {loggedInUser, refreshUserInfo} = useAuth();
    const [searchParams, setSearchParams] = useSearchParams();
    const [conversations, setConversations] = useState([]);
    const [errorMsg, setErrorMsg] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const {selectedBranchId, updateBranchId} = useBranchId();

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

    useEffect(() => {
        refreshUserInfo().then(() => {
            updateBranchId(null);

            if (selectedBranchId) {
                getConversations(selectedBranchId).then();
            }
        });
    }, [selectedBranchId]);

    return (<>
        <div className="toolbar fixed-top d-flex align-items-center">
            <div className="flex-shrink-1 me-auto">
                {/*Branch select*/}
                <select
                    className="form-select"
                    value={selectedBranchId}
                    onChange={(e) => {
                        setSearchParams({branchId: e.target.value});
                        updateBranchId(e.target.value);
                    }}
                >
                    {loggedInUser.branches.map(branch => (
                        <option key={branch.id} value={branch.id}>{branch.name}</option>
                    ))}
                </select>
            </div>
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
    </>);
}