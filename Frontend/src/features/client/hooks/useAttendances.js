import { useState } from "react";
import { createAttendanceApi, editAttendanceApi, deleteAttendanceApi } from "../../../shared/actions/attendances";

export const useAttendances = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState(null);

    // Crear Asistencia
    const createAttendance = async (attendanceData) => {
        setIsSubmitting(true);
        setError(null);
        
        try {
            const result = await createAttendanceApi(attendanceData);
            return result;
        } catch (error) {
            setError(error);
        } finally {
            setIsSubmitting(false);
        }
    };

    // Editar Asistencia
    const editAttendance = async (id, attendanceData) => {
        setIsSubmitting(true);
        setError(null);

        try {
            const result = await editAttendanceApi(id, attendanceData);
            return result;
        } catch (error) {
            setError(error);
        } finally {
            setIsSubmitting(false);
        }
    };

    // Eliminar asistencia
    const deleteAttendance = async (id) => {
        setIsSubmitting(true);
        setError(null);

        try {
            const result = await deleteAttendanceApi(id);
            return result;
        } catch (error) {
            setError(error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return {
        // Properties
        isSubmitting,
        error,
        // Methods
        createAttendance,
        editAttendance,
        deleteAttendance,
    };
}