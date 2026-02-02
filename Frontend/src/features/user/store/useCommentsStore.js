import { create } from "zustand";
import {
  createCommentApi,
  editCommentApi,
  deleteCommentApi,
} from "../../../shared/actions";

export const useCommentsStore = create((set) => ({
  // Estados iniciales
  comment: {},
  isSubmitting: false,
  error: null,

  // Crear un comentario
  createComment: async (form) => {
    set({ isSubmitting: true, error: null });
    try {
      const result = await createCommentApi(form);
      set({ comment: result });
      return result;
    } catch (error) {
      set({ error });
      throw error;
    } finally {
      set({ isSubmitting: false });
    }
  },

  // Editar un comentario
  editComment: async (id, form) => {
    set({ isSubmitting: true, error: null });
    try {
      const result = await editCommentApi(id, form);
      set({ comment: result });
      return result;
    } catch (error) {
      set({ error });
      throw error;
    } finally {
      set({ isSubmitting: false });
    }
  },

  // Eliminar un comentario
  deleteComment: async (id) => {
    set({ isSubmitting: true, error: null });
    try {
      const result = await deleteCommentApi(id);
      set({ comment: {} });
      return result;
    } catch (error) {
      set({ error });
      throw error;
    } finally {
      set({ isSubmitting: false });
    }
  },
}));
