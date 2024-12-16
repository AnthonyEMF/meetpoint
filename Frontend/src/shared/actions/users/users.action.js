import { meetpointApi } from '../../../config/api';

// Obtener todos
export const getUsersList = async (searchTerm = "", page = 1) => {
    try {
        const {data} = await meetpointApi.get(`/users?searchTerm=${searchTerm}&page=${page}`);
        return data;
    } catch(error) {
        console.error(error);
        return error.response;
    }
}

// Obtener por Id
export const getUserById = async (id) => {
    try {
        const {data} = await meetpointApi.get(`/users/${id}`);
        return data;
    } catch(error) {
        console.error(error);
        return error.response;
    }
}

// Crear
export const createUserApi = async (form) => {
    try {
        const {data} = await meetpointApi.post(`/users`, form);
        return data;
    } catch(error) {
        console.error(error);
        return error.response;
    }
}

// Editar 
export const editUserApi = async (id, form) => {
    try {
        const {data} = await meetpointApi.put(`/users/${id}`, form);
        return data;
    } catch (error) {
        console.error(error);
        return error.response;
    }
}

// Eliminar
export const deleteUserApi = async (id) => {
    try {
        const {data} = await meetpointApi.delete(`/users/${id}`);
        return data;
    } catch (error) {
        console.error(error);
        return error.response;
    }
}

// Editar 
export const toggleBlockUserApi = async (id) => {
    try {
        const {data} = await meetpointApi.put(`/users/block/${id}`);
        return data;
    } catch (error) {
        console.error(error);
        return error.response;
    }
}