import { useState } from "react";
import { createCommentApi, editCommentApi, deleteCommentApi } from "../../../shared/actions/comments";

export const useComments = () => {
    const [comment, setComment] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState(null);

    // Crear comentario
    const createComment = async (commentData) => {
        setIsSubmitting(true);
        setError(null);

        try {
            const result = await createCommentApi(commentData);
            setComment(result);
        } catch(error) {
            setError(error);
        } finally {
            setIsSubmitting(false);
        }
    }

    // Editar comentario
    const editComment = async (id, commentData) => {
        setIsSubmitting(true);
        setError(null);

        try {
            const result = await editCommentApi(id, commentData);
            setComment(result);
        } catch (error) {
            setError(error);
        } finally {
            setIsSubmitting(false);
        }
    };

    // Eliminar comentario
    const deleteComment = async (id) => {
        setIsSubmitting(true);
        setError(null);

        try {
            const result = await deleteCommentApi(id);
            setComment(result);
        } catch (error) {
            setError(error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return {
        // Properties
        comment,
        isSubmitting,
        error,
        // Methods
        createComment,
        editComment,
        deleteComment,
    }
}
