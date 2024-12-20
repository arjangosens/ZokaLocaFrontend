import {backendApi} from "../utils/backend-api.jsx";

export async function getConversationByIdLoader({params}) {
    try {
        const response = await backendApi.get(`/conversations/${params.conversationId}`);
        return {conversation: response.data};
    } catch (error) {
        console.error("Error fetching data: ", error);
        return {conversation: null};
    }
}