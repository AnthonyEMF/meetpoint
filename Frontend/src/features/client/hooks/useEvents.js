import { useState } from "react";
import { getEventsList, getEventById, createEventApi, editEventApi, deleteEventApi } from "../../../shared/actions/events";

export const useEvents = () => {
    const [events, setEvents] = useState({});
    const [event, setEvent] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState(null);

    // Cargar todos los eventos
    const loadEvents = async (searchTerm, page) => {
        setIsLoading(true);

        const result = await getEventsList(searchTerm, page);
        setEvents(result);

        setIsLoading(false);
    }

    // Cargar evento por Id
    const loadEventById = async (id) => {
        const result = await getEventById(id);
        setEvent(result);
    }

    // Crear evento
    const createEvent = async (eventData) => {
        setIsSubmitting(true);
        setError(null);

        try {
            const result = await createEventApi(eventData);
            setEvent(result);
        } catch(error) {
            setError(error)
        } finally {
            setIsSubmitting(false);
        }
    }

    // Editar evento
    const editEvent = async (id, eventData) => {
        setIsSubmitting(true);
        setError(null);

        try {
            const result = await editEventApi(id, eventData);
            setEvent(result);
        } catch (error) {
            setError(error);
        } finally {
            setIsSubmitting(false);
        }
    };

    // Eliminar evento
    const deleteEvent = async (id) => {
        setIsSubmitting(true);
        setError(null);

        try {
            await deleteEventApi(id);
            setEvent(null);
        } catch (error) {
            setError(error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return {
        // Properties
        events,
        event,
        isLoading,
        isSubmitting,
        error,
        // Methods
        loadEvents,
        loadEventById,
        createEvent,
        editEvent,
        deleteEvent,
    };
}