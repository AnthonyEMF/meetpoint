import { IoStatsChart } from "react-icons/io5";
import { TbMessageReport } from "react-icons/tb";
import { Link } from "react-router-dom";
import { useAuthStore } from "../../auth/store";
import { useUsersStore } from "../store/useUsersStore";
import { MdOutlineWorkspacePremium } from "react-icons/md";

export const UserRowItem = ({ user, handleBlockedChange }) => {
  // Obtener id del usuario en sesión
  const getUserId = useAuthStore((state) => state.getUserId);
  const loggedUserId = getUserId();

  // Obtener la acción de toggle del store
  const toggleBlockUser = useUsersStore((state) => state.toggleBlockUser);

  // Función para manejar el toggle de bloqueo/desbloqueo
  const handleToggleBlockUser = async () => {
    try {
      await toggleBlockUser(user.id);
      if (handleBlockedChange) handleBlockedChange();
    } catch (error) {
      console.error("Error al bloquear/desbloquear el usuario", error);
    }
  };

  return (
    <tr key={user.id}>
      <td className="px-6 py-4 text-sm flex items-center font-medium text-gray-900">
        {user?.membership && ( // Mostrar insignia de usuario premium
          <MdOutlineWorkspacePremium size={17} className="text-yellow-500 mr-1"/>
        )}
        {user.firstName} {user.lastName}
      </td>
      <td className="px-6 py-4 text-sm text-gray-700">{user.email}</td>
      <td className="px-6 py-4 text-sm text-center">
        <span
          className={`px-2 py-1 text-sm rounded ${
            user.roles.includes("ADMIN")
              ? "bg-green-500 text-white"
              : user.roles.includes("ORGANIZER")
              ? "bg-yellow-500 text-white"
              : "bg-blue-500 text-white"
          }`}
        >
          {user.roles.includes("ADMIN")
            ? "Admin"
            : user.roles.includes("ORGANIZER")
            ? "Organizer"
            : "Usuario"}
        </span>
      </td>
      <td className="px-6 py-4 text-sm text-gray-700">
        <div className="flex justify-center">
          <TbMessageReport size={16} className="mt-1 mr-1" /> {user.reportsCount}
        </div>
      </td>
      <td className="px-6 py-4 text-sm text-gray-700">
        <div className="flex justify-center">
          <IoStatsChart size={14} className="mt-1 mr-1" /> {user.ratingsCount}
        </div>
      </td>
      <td className="px-6 py-4 text-sm font-medium text-center">
        <button
          onClick={handleToggleBlockUser}
          className={`text-sm text-white px-4 py-1 font-semibold rounded ${
            user.isBlocked ? "bg-red-500 hover:bg-red-700" : "bg-green-500 hover:bg-green-700"
          }`}
          disabled={user.roles.includes("ADMIN")}
        >
          {user.isBlocked ? "Bloqueado" : "Desbloqueado"}
        </button>
      </td>
      <td className="px-6 py-4 text-sm font-medium">
        <Link
          to={user.id === loggedUserId ? "/user" : `/user/view/${user.id}`}
          className="text-blue-600 hover:text-blue-800"
        >
          Ver detalles
        </Link>
      </td>
    </tr>
  );
};

