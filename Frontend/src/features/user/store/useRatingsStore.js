import { create } from "zustand";
import {
  getRatingsList,
  getRatingById,
  getRatingByUserId,
  createRatingApi,
  editRatingApi,
  deleteRatingApi,
} from "../../../shared/actions";

export const useRatingsStore = create((set) => ({
  // Estados iniciales
  ratings: {},
  rating: null,
  isLoading: false,
  isSubmitting: false,
  error: null,

  // Cargar todos los ratings
  loadRatings: async (searchTerm, page) => {
    set({ isLoading: true, error: null });
    try {
      const result = await getRatingsList(searchTerm, page);
      set({ ratings: result });
      return result;
    } catch (error) {
      set({ error });
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },

  // Cargar rating por ID
  loadRatingById: async (id) => {
    set({ isLoading: true, error: null });
    try {
      const result = await getRatingById(id);
      set({ rating: result });
      return result;
    } catch (error) {
      set({ error });
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },

  // Cargar rating por ID del usuario
  loadRatingByUserId: async (userId) => {
    set({ isLoading: true, error: null });
    try {
      const result = await getRatingByUserId(userId);
      set({ rating: result });
      return result;
    } catch (error) {
      set({ error });
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },

  // Crear rating
  createRating: async (form) => {
    set({ isSubmitting: true, error: null });
    try {
      const result = await createRatingApi(form);
      set({ rating: result });
      return result;
    } catch (error) {
      set({ error });
      throw error;
    } finally {
      set({ isSubmitting: false });
    }
  },

  // Editar rating
  editRating: async (id, form) => {
    set({ isSubmitting: true, error: null });
    try {
      const result = await editRatingApi(id, form);
      set({ rating: result });
      return result;
    } catch (error) {
      set({ error });
      throw error;
    } finally {
      set({ isSubmitting: false });
    }
  },

  // Eliminar rating
  deleteRating: async (id) => {
    set({ isSubmitting: true, error: null });
    try {
      await deleteRatingApi(id);
      set({ rating: null });
    } catch (error) {
      set({ error });
      throw error;
    } finally {
      set({ isSubmitting: false });
    }
  },
}));
