import { create } from "zustand";
import { createCategoryApi, deleteCategoryApi, editCategoryApi, getCategoryById } from "../../../shared/actions/categories/categories.action";

export const useCategoriesStore = create((set, get) => ({
  selectedCategory: {},
  categoriesData: {
    hasNextPage: false,
    hasPreviousPage: false,
    currentPage: 1,
    pageSize: 10,
    totalItems: 0,
    totalPages: 0,
    items: []
  },

  // Cargar categoría por id
  getCategory: async (id) => {
    try {
      const result = await getCategoryById(id);
      if (result.status) {
        set({ selectedCategory: result.data });
      } else {
        set({ selectedCategory: null });
        throw new Error("Error al cargar la categoría");
      }
    } catch (error) {
      console.error(error);
      set({ selectedCategory: null });
    }
  },

  // Crear categoría
  createCategory: async (form) => {
    try {
      const result = await createCategoryApi(form);
      if (result.status) {
        set((state) => ({
          categoriesData: {
            ...state.categoriesData,
            items: [...state.categoriesData.items, result.data]
          }
        }));
      } else {
        throw new Error("Error al crear la categoría");
      }
      return result;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },

  // Editar categoría
  editCategory: async (id, form) => {
    try {
      const result = await editCategoryApi(id, form);
      if (result.status) {
        const updatedCategories = get().categoriesData.items.map((category) =>
          category.id === id ? { ...category, ...result.data } : category
        );
        set((state) => ({
          categoriesData: {
            ...state.categoriesData,
            items: updatedCategories
          },
          selectedCategory: result.data
        }));
      } else {
        throw new Error("Error al editar la categoría");
      }
      return result;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },

  // Eliminar categoría
  deleteCategory: async (id) => {
    try {
      const result = await deleteCategoryApi(id);
      if (result.status) {
        set((state) => ({
          categoriesData: {
            ...state.categoriesData,
            items: state.categoriesData.items.filter((category) => category.id !== id)
          },
          selectedCategory: state.selectedCategory.id === id ? {} : state.selectedCategory
        }));
      } else {
        throw new Error("Error al eliminar la categoría");
      }
      return result;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}));
