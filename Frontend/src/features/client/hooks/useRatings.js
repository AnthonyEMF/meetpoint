import { useState } from "react";
import { createRatingApi, deleteRatingApi, editRatingApi, getRatingById, getRatingByUserId, getRatingsList } from "../../../shared/actions/ratings/ratings.action";

export const useRatings = () => {
    const [ratings, setRatings] = useState({});
    const [rating, setRating] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState(null);

    // Cargar todos los ratings
    const loadRatings = async (searchTerm, page) => {
        setIsLoading(true);

        const result = await getRatingsList(searchTerm, page);
        setRatings(result);

        setIsLoading(false);
    }

    // Cargar rating por Id
    const loadRatingById = async (id) => {
        const result = await getRatingById(id);
        setRating(result);
    }

    // Cargar rating por Id del usuario
    const loadRatingByUserId = async (userId) => {
        const result = await getRatingByUserId(userId);
        setRating(result);
    }

    // Crear rating
    const createRating = async (ratingData) => {
        setIsSubmitting(true);
        setError(null);

        try {
            const result = await createRatingApi(ratingData);
            setRating(result);
        } catch(error) {
            setError(error)
        } finally {
            setIsSubmitting(false);
        }
    }

    // Editar rating
    const editRating = async (id, ratingData) => {
        setIsSubmitting(true);
        setError(null);

        try {
            const result = await editRatingApi(id, ratingData);
            setRating(result);
        } catch (error) {
            setError(error);
        } finally {
            setIsSubmitting(false);
        }
    };

    // Eliminar rating
    const deleteRating = async (id) => {
        setIsSubmitting(true);
        setError(null);

        try {
            await deleteRatingApi(id);
            setRating(null);
        } catch (error) {
            setError(error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return {
        // Properties
        ratings,
        rating,
        isLoading,
        isSubmitting,
        error,
        // Methods
        loadRatings,
        loadRatingById,
        loadRatingByUserId,
        createRating,
        editRating,
        deleteRating,
    };
}
