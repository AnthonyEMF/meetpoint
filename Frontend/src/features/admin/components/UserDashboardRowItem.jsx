import { Link } from "react-router-dom";
import { useAuthStore } from "../../security/store";

export const UserDashboardRowItem = ({ users = [] }) => {
  // Obtener id del usuario en sesión
  const getUserId = useAuthStore((state) => state.getUserId);
  const loggedUserId = getUserId();

  return (
    <div className="space-y-4">
      {users.map((user) => (
        <div key={user.id}>
          <Link
            className="p-4 bg-gray-100 rounded shadow flex justify-between items-center hover:bg-gray-200"
            to={user.id === loggedUserId ? "/user" : `/user/view/${user.id}`}
          >
            <div>
              <p className="font-medium text-gray-700">
                {user.fullName}
              </p>
              <p className="text-sm text-gray-500">{user.email}</p>
            </div>
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
          </Link>
        </div>
      ))}
    </div>
  );
};
