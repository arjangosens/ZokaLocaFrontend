import {useLoaderData} from "react-router-dom";
import {backendApi} from "../../utils/backend-api.jsx";
import {useEffect, useRef, useState} from "react";
import ChatMessage from "../../components/conversations/chat-message.jsx";
import {useAuth} from "../../providers/auth-provider.jsx";
import WebSocketService from "../../services/websocket-service.jsx";

export default function ConversationDetails() {
    const {conversation} = useLoaderData();
    const [messages, setMessages] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [messageInput, setMessageInput] = useState('');
    const {loggedInUser} = useAuth();

    const fetchExistingMessages = async () => {
        setMessages([]);
        setIsLoading(true);
        try {
            const response = await backendApi.get(`/conversations/${conversation.id}/messages`);
            setMessages(response.data);
        } catch (error) {
            console.error("Error fetching data: ", error);
        } finally {
            setIsLoading(false);
        }
    }

    const sendMessage = async () => {
        if (messageInput.trim() === '') return;
        try {
            await backendApi.post(`/conversations/${conversation.id}/messages`, {content: messageInput});
            setMessageInput('');
        } catch (error) {
            console.error("Error sending message: ", error);
        }
    };

    useEffect(() => {
        fetchExistingMessages().then();
        WebSocketService.connect(conversation.id, (message) => {
            setMessages((prevMessages) => [...prevMessages, message]);
        });

        return () => {
            WebSocketService.disconnect();
        };
    }, [conversation.id]);

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            sendMessage().then();
        }
    };

    return (
        <>
            <div className="toolbar fixed-top d-flex align-items-center">
                <div className="d-flex align-items-center flex-shrink-1 me-auto">
                    <h4 className="mb-0">{conversation.name}</h4>
                    {conversation.branches.map((branch) => (
                        <span key={branch.id} className="badge text-bg-dark ms-1">{branch.name}</span>
                    ))}
                </div>
            </div>

            <div className="container">
                <div className="nav-size"></div>
                <div className="chat-container">
                    {isLoading && <div className="text-center">Loading...</div>}
                    {messages.map((message) => (
                        <div key={message.id}
                             className={`w-75 mb-4 ${message.author.id === loggedInUser.id ? "ms-auto" : "me-auto"}`}>
                            <ChatMessage message={message}/>
                        </div>
                    ))}
                </div>
            </div>

            <div className="toolbar fixed-bottom d-flex align-items-center">
                <div className="flex-grow-1 me-auto mb-4">
                    <div className="input-group">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Bericht"
                            value={messageInput}
                            onChange={(e) => setMessageInput(e.target.value)}
                            onKeyDown={handleKeyDown}
                        />
                        <button
                            className="btn btn-primary"
                            type="button"
                            onClick={sendMessage}
                        >
                            <i className="fa-solid fa-paper-plane"></i>
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}