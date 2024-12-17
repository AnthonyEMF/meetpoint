import { meetpointApi } from '../../../config/api';

// Obtener todos
export const getAttendancesList = async (searchTerm = "", page = 1) => {
    try {
        const {data} = await meetpointApi.get(`/attendances?searchTerm=${searchTerm}&page=${page}`);
        return data;
    } catch(error) {
        console.error(error);
        return error.response;
    }
}

// Obtener por Id
export const getAttendanceById = async (id) => {
    try {
        const {data} = await meetpointApi.get(`/attendances/${id}`);
        return data;
    } catch(error) {
        console.error(error);
        return error.response;
    }
}

// Crear
export const createAttendanceApi = async (form) => {
    try {
        const {data} = await meetpointApi.post(`/attendances`, form);
        return data;
    } catch(error) {
        console.error(error);
        return error.response;
    }
}

// Editar 
export const editAttendanceApi = async (id, form) => {
    try {
        const {data} = await meetpointApi.put(`/attendances/${id}`, form);
        return data;
    } catch (error) {
        console.error(error);
        return error.response;
    }
}

// Eliminar
export const deleteAttendanceApi = async (id) => {
    try {
        const {data} = await meetpointApi.delete(`/attendances/${id}`);
        return data;
    } catch (error) {
        console.error(error);
        return error.response;
    }
}