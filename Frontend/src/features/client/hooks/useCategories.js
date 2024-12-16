import { useState } from "react";
import { getCategoriesList } from "../../../shared/actions/categories";

export const useCategories = () => {
  const [categories, setCategories] = useState({});
  const [category, setCategory] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Cargar todas los categorías
  const loadCategories = async (searchTerm, page) => {
    setIsLoading(true);

    const result = await getCategoriesList(searchTerm, page);
    setCategories(result);

    setIsLoading(false);
  };

  // Cargar categoría por Id
  const loadCategoryById = async (id) => {
    const result = await getEventById(id);
    setCategory(result);
  };

  // Crear evento
  const createCategory = async (categoryData) => {
    setIsSubmitting(true);
    setError(null);

    try {
      const result = await createEventApi(categoryData);
      setCategory(result);
    } catch (error) {
      setError(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Editar evento
  const editCategory = async (id, categoryData) => {
    setIsSubmitting(true);
    setError(null);

    try {
      const result = await editEventApi(id, categoryData);
      setCategory(result);
    } catch (error) {
      setError(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Eliminar evento
  const deleteCategory = async (id) => {
    setIsSubmitting(true);
    setError(null);

    try {
      await deleteEventApi(id);
      setCategory(null);
    } catch (error) {
      setError(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    // Properties
    categories,
    category,
    isLoading,
    isSubmitting,
    error,
    // Methods
    loadCategories,
    loadCategoryById,
    createCategory,
    editCategory,
    deleteCategory,
  };
};
