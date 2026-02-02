import { create } from "zustand";
import { createReportApi, deleteReportApi, editReportApi, getReportById, getReportsList } from "../../../shared/actions/reports/reports.action";

export const useReportsStore = create((set) => ({
  // Estados iniciales
  reports: {},
  report: {},
  isLoading: false,
  isSubmitting: false,
  error: null,

  // Cargar todos los reportes
  loadReports: async (searchTerm, page) => {
    set({ isLoading: true });
    try {
      const result = await getReportsList(searchTerm, page);
      set({ reports: result });
    } catch (error) {
      set({ error });
    } finally {
      set({ isLoading: false });
    }
  },

  // Cargar un reporte por ID
  loadReportById: async (id) => {
    set({ isLoading: true });
    try {
      const result = await getReportById(id);
      set({ report: result });
    } catch (error) {
      set({ error });
    } finally {
      set({ isLoading: false });
    }
  },

  // Crear un reporte
  createReport: async (form) => {
    set({ isSubmitting: true, error: null });
    try {
      const result = await createReportApi(form);
      set({ report: result });
    } catch (error) {
      set({ error });
    } finally {
      set({ isSubmitting: false });
    }
  },

  // Editar un reporte
  editReport: async (id, form) => {
    set({ isSubmitting: true, error: null });
    try {
      const result = await editReportApi(id, form);
      set({ report: result });
    } catch (error) {
      set({ error });
    } finally {
      set({ isSubmitting: false });
    }
  },

  // Eliminar un reporte
  deleteReport: async (id) => {
    set({ isSubmitting: true, error: null });
    try {
      await deleteReportApi(id);
      set({ report: null });
    } catch (error) {
      set({ error });
    } finally {
      set({ isSubmitting: false });
    }
  },
}));
