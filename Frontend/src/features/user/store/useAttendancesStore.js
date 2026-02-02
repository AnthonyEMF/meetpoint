import { create } from "zustand";
import {
  createAttendanceApi,
  editAttendanceApi,
  deleteAttendanceApi,
} from "../../../shared/actions";

export const useAttendancesStore = create((set) => ({
  // Estados iniciales
  isSubmitting: false,
  error: null,

  // Crear una asistencia
  createAttendance: async (form) => {
    set({ isSubmitting: true, error: null });
    try {
      const result = await createAttendanceApi(form);
      return result;
    } catch (error) {
      set({ error });
      throw error;
    } finally {
      set({ isSubmitting: false });
    }
  },

  // Editar una asistencia
  editAttendance: async (id, form) => {
    set({ isSubmitting: true, error: null });
    try {
      const result = await editAttendanceApi(id, form);
      return result;
    } catch (error) {
      set({ error });
      throw error;
    } finally {
      set({ isSubmitting: false });
    }
  },

  // Eliminar una asistencia
  deleteAttendance: async (id) => {
    set({ isSubmitting: true, error: null });
    try {
      const result = await deleteAttendanceApi(id);
      return result;
    } catch (error) {
      set({ error });
      throw error;
    } finally {
      set({ isSubmitting: false });
    }
  },
}));
