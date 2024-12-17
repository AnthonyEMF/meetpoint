import { create } from "zustand";
import { getEventsList, getEventById, createEventApi, editEventApi, deleteEventApi } from "../../../shared/actions/events";

export const useEventsStore = create((set) => ({
  // Estados iniciales
  events: {},
  event: null,
  isLoading: false,
  isSubmitting: false,
  error: null,

  // Cargar todos los eventos
  loadEvents: async (searchTerm, page) => {
    set({ isLoading: true, error: null });
    try {
      const result = await getEventsList(searchTerm, page);
      set({ events: result });
      return result;
    } catch (error) {
      set({ error });
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },

  // Cargar evento por ID
  loadEventById: async (id) => {
    set({ isLoading: true, error: null });
    try {
      const result = await getEventById(id);
      set({ event: result });
      return result;
    } catch (error) {
      set({ error });
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },

  // Crear evento
  createEvent: async (form) => {
    set({ isSubmitting: true, error: null });
    try {
      const result = await createEventApi(form);
      set({ event: result });
      return result;
    } catch (error) {
      set({ error });
      throw error;
    } finally {
      set({ isSubmitting: false });
    }
  },

  // Editar evento
  editEvent: async (id, form) => {
    set({ isSubmitting: true, error: null });
    try {
      const result = await editEventApi(id, form);
      set({ event: result });
      return result;
    } catch (error) {
      set({ error });
      throw error;
    } finally {
      set({ isSubmitting: false });
    }
  },

  // Eliminar evento
  deleteEvent: async (id) => {
    set({ isSubmitting: true, error: null });
    try {
      await deleteEventApi(id);
      set({ event: null });
    } catch (error) {
      set({ error });
      throw error;
    } finally {
      set({ isSubmitting: false });
    }
  },
}));
