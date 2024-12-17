import { useState } from "react";
import { getUserById } from "../../../shared/actions/users";

export const useUsers = () => {
    const [user, setUser] = useState({});

    // Cargar usuario por Id
    const loadUserById = async (id) => {
        const result = await getUserById(id);
        setUser(result);
    }

    return {
        // Properties
        user,
        // Methods
        loadUserById,
    };
}