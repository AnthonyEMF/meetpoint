import { useState } from "react";
import { getCategoriesList } from "../../../shared/actions/categories";

export const useCategories = () => {
  const [categories, setCategories] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  // Cargar todas los categorías
  const loadCategories = async (searchTerm, page) => {
    setIsLoading(true);

    const result = await getCategoriesList(searchTerm, page);
    setCategories(result);

    setIsLoading(false);
  };

  return {
    // Properties
    categories,
    isLoading,
    // Methods
    loadCategories,
  };
};
