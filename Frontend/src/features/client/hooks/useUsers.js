import { useState } from "react";
import { getUserById, createUserApi, getUsersList } from "../../../shared/actions/users";

export const useUsers = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState(null);
    const [user, setUser] = useState({});
    const [users, setUsers] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    // Cargar todos los usuarios
    const loadUsers = async (searchTerm, page) => {
        setIsLoading(true);

        const result = await getUsersList(searchTerm, page);
        setUsers(result);

        setIsLoading(false);
    }

    // Cargar usuario por Id
    const loadUserById = async (id) => {
        const result = await getUserById(id);
        setUser(result);
    }

    // Crear usuario
    const createUser = async (userData) => {
        setIsSubmitting(true);
        setError(null);

        try {
            const result = await createUserApi(userData);
            setUser(result);
        } catch(error) {
            setError(error)
        } finally {
            setIsSubmitting(false);
        }
    }

    return {
        // Properties
        user,
        users,
        isLoading,
        isSubmitting,
        error,
        // Methods
        loadUserById,
        loadUsers,
        createUser,
    };
}