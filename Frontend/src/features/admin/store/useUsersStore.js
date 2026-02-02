import { create } from "zustand";
import {
  createUserApi,
  deleteUserApi,
  editUserApi,
  getUserById,
  getUsersList,
  toggleBlockUserApi,
} from "../../../shared/actions/users/users.action";

export const useUsersStore = create((set, get) => ({
  user: null,
  users: {},
  isLoading: false,
  isSubmitting: false,
  error: null,
  selectedUser: {},
  usersData: {
    hasNextPage: false,
    hasPreviousPage: false,
    currentPage: 1,
    pageSize: 10,
    totalItems: 0,
    totalPages: 0,
    items: [],
  },

  // Cargar todos los usuarios
  loadUsers: async (searchTerm, page) => {
    set({ isLoading: true, error: null });
    try {
      const result = await getUsersList(searchTerm, page);
      set({ users: result });
      return result;
    } catch (error) {
      set({ error });
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },

  // Cargar usuario por ID
  loadUserById: async (id) => {
    set({ isLoading: true, error: null });
    try {
      const result = await getUserById(id);
      set({ user: result });
      return result;
    } catch (error) {
      set({ error });
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },

  getUser: async (id) => {
    try {
      const result = await getUserById(id);
      if (result.status) {
        set({ selectedUser: result.data });
      } else {
        set({ selectedUser: null });
        throw new Error("Error al cargar el usuario");
      }
    } catch (error) {
      console.error(error);
      set({ selectedUser: null });
    }
  },

  createUser: async (form) => {
    try {
      const result = await createUserApi(form);
      if (result.status) {
        set((state) => ({
          usersData: {
            ...state.usersData,
            items: [...state.usersData.items, result.data],
          },
        }));
      } else {
        throw new Error("Error al crear usuario");
      }
      return result;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },

  editUser: async (id, form) => {
    try {
      const result = await editUserApi(id, form);
      if (result.status) {
        const updatedUsers = get().usersData.items.map((user) =>
          user.id === id ? { ...user, ...result.data } : user,
        );
        set((state) => ({
          usersData: {
            ...state.usersData,
            items: updatedUsers,
          },
          selectedUser: result.data,
        }));
      } else {
        throw new Error("Error al editar el usuario");
      }
      return result;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },

  deleteUser: async (id) => {
    try {
      const result = await deleteUserApi(id);
      if (result.status) {
        set((state) => ({
          usersData: {
            ...state.usersData,
            items: state.usersData.items.filter((user) => user.id !== id),
          },
          selectedUser: state.selectedUser.id === id ? {} : state.selectedUser,
        }));
      } else {
        throw new Error("Error al eliminar el usuario");
      }
      return result;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },

  toggleBlockUser: async (id) => {
    try {
      const result = await toggleBlockUserApi(id);
      if (result.status) {
        const updatedUsers = get().usersData.items.map((user) =>
          user.id === id ? { ...user, isBlocked: !user.isBlocked } : user,
        );
        set((state) => ({
          usersData: {
            ...state.usersData,
            items: updatedUsers,
          },
          selectedUser:
            get().selectedUser.id === id
              ? {
                  ...get().selectedUser,
                  isBlocked: !get().selectedUser.isBlocked,
                }
              : get().selectedUser,
        }));
      } else {
        throw new Error("Error al bloquear/desbloquear el usuario");
      }
      return result;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
}));
