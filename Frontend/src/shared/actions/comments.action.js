import { meetpointApi } from "../../config";

// Obtener todos
export const getCommentsList = async (searchTerm = "", page = 1) => {
  try {
    const { data } = await meetpointApi.get(
      `/comments?searchTerm=${searchTerm}&page=${page}`,
    );
    return data;
  } catch (error) {
    console.error(error);
    return error.response;
  }
};

// Obtener por Id
export const getCommentById = async (id) => {
  try {
    const { data } = await meetpointApi.get(`/comments/${id}`);
    return data;
  } catch (error) {
    console.error(error);
    return error.response;
  }
};

// Crear
export const createCommentApi = async (form) => {
  try {
    const { data } = await meetpointApi.post(`/comments`, form);
    return data;
  } catch (error) {
    console.error(error);
    return error.response;
  }
};

// Editar
export const editCommentApi = async (id, form) => {
  try {
    const { data } = await meetpointApi.put(`/comments/${id}`, form);
    return data;
  } catch (error) {
    console.error(error);
    return error.response;
  }
};

// Eliminar
export const deleteCommentApi = async (id) => {
  try {
    const { data } = await meetpointApi.delete(`/comments/${id}`);
    return data;
  } catch (error) {
    console.error(error);
    return error.response;
  }
};
