import {backendApi} from "../utils/backend-api.jsx";

export async function getBranchByIdLoader({params}) {
    try {
        const response = await backendApi.get(`/branches/${params.branchId}`);
        return {branch: response.data};
    } catch (error) {
        console.error("Error fetching data: ", error);
        return {branch: null};
    }
}