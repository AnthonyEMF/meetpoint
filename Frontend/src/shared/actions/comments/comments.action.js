import { meetpointApi } from '../../../config/api';

// Obtener todos
export const getCommentsList = async (searchTerm = "", page = 1) => {
    try {
        const {data} = await meetpointApi.get(`/comments?searchTerm=${searchTerm}&page=${page}`);
        return data;
    } catch(error) {
        console.error(error);
        return error.response;
    }
}

// Obtener por Id
export const getCommentById = async (id) => {
    try {
        const {data} = await meetpointApi.get(`/comments/${id}`);
        return data;
    } catch(error) {
        console.error(error);
        return error.response;
    }
}

// Crear
export const createCommentApi = async (commentData) => {
    try {
        const {data} = await meetpointApi.post(`/comments`, commentData);
        return data;
    } catch(error) {
        console.error(error);
        return error.response;
    }
}

// Editar 
export const editCommentApi = async (id, commentData) => {
    try {
        const {data} = await meetpointApi.put(`/comments/${id}`, commentData);
        return data;
    } catch (error) {
        console.error(error);
        return error.response;
    }
}

// Eliminar
export const deleteCommentApi = async (id) => {
    try {
        const {data} = await meetpointApi.delete(`/comments/${id}`);
        return data;
    } catch (error) {
        console.error(error);
        return error.response;
    }
}