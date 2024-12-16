import { meetpointApi } from '../../../config/api';

// Obtener todos
export const getRatingsList = async (searchTerm = "", page = 1) => {
    try {
        const {data} = await meetpointApi.get(`/ratings?searchTerm=${searchTerm}&page=${page}`);
        return data;
    } catch(error) {
        console.error(error);
        return error.response;
    }
}

// Obtener por Id
export const getRatingById = async (id) => {
    try {
        const {data} = await meetpointApi.get(`/ratings/${id}`);
        return data;
    } catch(error) {
        console.error(error);
        return error.response;
    }
}

// Crear
export const createRatingApi = async (ratingData) => {
    try {
        const {data} = await meetpointApi.post(`/ratings`, ratingData);
        return data;
    } catch(error) {
        console.error(error);
        return error.response;
    }
}

// Editar 
export const editRatingApi = async (id, ratingData) => {
    try {
        const {data} = await meetpointApi.put(`/ratings/${id}`, ratingData);
        return data;
    } catch (error) {
        console.error(error);
        return error.response;
    }
}

// Eliminar
export const deleteRatingApi = async (id) => {
    try {
        const {data} = await meetpointApi.delete(`/ratings/${id}`);
        return data;
    } catch (error) {
        console.error(error);
        return error.response;
    }
}