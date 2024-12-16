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

// Obtener estado de membresía por id de usuario
export const getMembershipStateApi = async (userId) => {
    try {
        const {data} = await meetpointApi.get(`/memberships/state/${userId}`);
        return data;
    } catch(error) {
        console.error(error);
        return error.response;
    }
}