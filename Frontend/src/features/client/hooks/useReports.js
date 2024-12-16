import { useState } from "react";
import { createReportApi, deleteReportApi, editReportApi, getReportById, getReportsList } from "../../../shared/actions/reports/reports.action";

export const useReports = () => {
    const [reports, setReports] = useState({});
    const [report, setReport] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState(null);

    //Cargar todos los reportes
    const loadReports = async (searchTerm, page) => {
        setIsLoading(true);

        const result = await getReportsList(searchTerm, page);
        setReports(result);

        setIsLoading(false);
    }

    //Cargar reporte por Id
    const loadReportById = async (id) => {
        const result = await getReportById(id);
        setReport(result);
    }

    //Crear reporte
    const createReport = async (reportData) => {
        setIsSubmitting(true);
        setError(null);

        try {
            const result = await createReportApi(reportData);
            setReport(result);
        } catch(error) {
            setError(error)
        } finally {
            setIsSubmitting(false);
        } 
    }

    //Editar Reporte
    const editReport = async (id, reportData) => {
        setIsSubmitting(true);
        setError(null);

        try {
            const result = await editReportApi(id, reportData);
            setReport(result);
        } catch (error) {
            setError(error);
        } finally {
            setIsSubmitting(false);
        }
    };

    //Eliminar reporte
    const deleteReport = async (id) => {
        setIsSubmitting(true);
        setError(null);

        try {
            await deleteReportApi(id);
            setReport(null);
        } catch (error) {
            setError(error);
        } finally {
            setIsSubmitting(false);
        }
    };

  return {
    //Properties
    reports,
    report,
    isLoading,
    isSubmitting,
    error,
    //Methods
    loadReports,
    loadReportById,
    createReport,
    editReport,
    deleteReport,
  };
};
