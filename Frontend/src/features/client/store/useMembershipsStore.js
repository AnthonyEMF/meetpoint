import { create } from "zustand";
import { addMembershipApi } from "../../../shared/actions/memberships/memberships.action";

export const useMembershipsStore = create((set) => ({
  selectedMembership: {},
  membershipsData: {
    hasNextPage: false,
    hasPreviousPage: false,
    currentPage: 1,
    pageSize: 10,
    totalItems: 0,
    totalPages: 0,
    items: [],
  },

  // Crear membresía
  addMembership: async (form) => {
    try {
      const result = await addMembershipApi(form);
      if (result.status) {
        set((state) => ({
          membershipsData: {
            ...state.membershipsData,
            items: [...state.membershipsData.items, result.data],
          },
        }));
      } else {
        throw new Error("Error al crear la membresía");
      }
      return result;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
}));
