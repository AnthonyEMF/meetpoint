import { meetpointApi } from '../../../config/api';

// Obtener todos
export const getEventsList = async (searchTerm = "", page = 1) => {
    try {
        const {data} = await meetpointApi.get(`/events?searchTerm=${searchTerm}&page=${page}`);
        return data;
    } catch(error) {
        console.error(error);
        return error.response;
    }
}

// Obtener por Id
export const getEventById = async (id) => {
    try {
        const {data} = await meetpointApi.get(`/events/${id}`);
        return data;
    } catch(error) {
        console.error(error);
        return error.response;
    }
}

// Crear
export const createEventApi = async (form) => {
    try {
        const {data} = await meetpointApi.post(`/events`, form);
        return data;
    } catch(error) {
        console.error(error);
        return error.response;
    }
}

// Editar 
export const editEventApi = async (id, form) => {
    try {
        const {data} = await meetpointApi.put(`/events/${id}`, form);
        return data;
    } catch (error) {
        console.error(error);
        return error.response;
    }
}

// Eliminar
export const deleteEventApi = async (id) => {
    try {
        const {data} = await meetpointApi.delete(`/events/${id}`);
        return data;
    } catch (error) {
        console.error(error);
        return error.response;
    }
}
