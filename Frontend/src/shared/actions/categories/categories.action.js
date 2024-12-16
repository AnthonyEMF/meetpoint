import { meetpointApi } from '../../../config/api';

// Obtener todos
export const getCategoriesList = async (searchTerm = "", page = 1) => {
    try {
        const {data} = await meetpointApi.get(`/categories?searchTerm=${searchTerm}&page=${page}`);
        return data;
    } catch(error) {
        console.error(error);
        return error.response;
    }
}

// Obtener por Id
export const getCategoryById = async (id) => {
    try {
        const {data} = await meetpointApi.get(`/categories/${id}`);
        return data;
    } catch(error) {
        console.error(error);
        return error.response;
    }
}

// Crear
export const createCategoryApi = async (form) => {
    try {
        const {data} = await meetpointApi.post(`/categories`, form);
        return data;
    } catch(error) {
        console.error(error);
        return error.response;
    }
}

// Editar 
export const editCategoryApi = async (id, form) => {
    try {
        const {data} = await meetpointApi.put(`/categories/${id}`, form);
        return data;
    } catch (error) {
        console.error(error);
        return error.response;
    }
}

// Eliminar
export const deleteCategoryApi = async (id) => {
    try {
        const {data} = await meetpointApi.delete(`/categories/${id}`);
        return data;
    } catch (error) {
        console.error(error);
        return error.response;
    }
}