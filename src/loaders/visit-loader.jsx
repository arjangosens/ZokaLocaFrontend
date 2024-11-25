import {backendApi} from "../utils/backend-api.jsx";

export async function getVisitByIdLoader({params}) {
    try {
        const response = await backendApi.get(`/visits/${params.visitId}`);
        return {visit: response.data};
    } catch (error) {
        console.error("Error fetching visit: ", error);
        return {visit: null};
    }
}