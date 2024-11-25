import {backendApi} from "../utils/backend-api.jsx";

export async function getCampsiteByIdLoader({params}) {
    try {
        const response = await backendApi.get(`/campsites/${params.campsiteId}`);

        return {campsite: response.data};
    } catch (error) {
        console.error("Error fetching data: ", error);
        return {campsite: null};
    }
}