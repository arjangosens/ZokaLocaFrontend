import SockJS from 'sockjs-client';
import Stomp from 'stompjs';

const { VITE_BACKEND_API_URL } = import.meta.env;

class WebsocketService {

    constructor() {
        this.stompClient = null;
    }

    connect(conversationId, onMessageReceived) {
        const socket = new SockJS(`${VITE_BACKEND_API_URL}/ws`);
        this.stompClient = Stomp.over(socket);
        this.stompClient.connect({}, () => {
            console.log('Connected to WebSocket');
            this.stompClient.subscribe(`/topic/conversations/${conversationId}`, (message) => {
                onMessageReceived(JSON.parse(message.body));
            });
        });
    }

    disconnect() {
        if (this.stompClient !== null && this.stompClient.connected) {
            this.stompClient.disconnect();
            console.log('Disconnected from WebSocket');
        } else {
            console.log('WebSocket connection is not established yet');
        }
    }
}

export default new WebsocketService();