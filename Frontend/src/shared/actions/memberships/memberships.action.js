import { meetpointApi } from '../../../config/api';

// Crear una membresía
export const addMembershipApi = async (form) => {
    try {
        const {data} = await meetpointApi.post(`/memberships`, form);
        return data;
    } catch(error) {
        console.error(error);
        return error.response;
    }
}