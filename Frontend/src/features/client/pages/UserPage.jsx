import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { formatDate } from "../../../shared/utils";
import { useAuthStore } from "../../security/store/useAuthStore";
import { CustomAlerts, StarRating } from "../../../shared/components";
import { IoStatsChart } from "react-icons/io5";
import { FiPlusCircle } from "react-icons/fi";
import { BiLogOutCircle } from "react-icons/bi";
import { RiDeleteBin5Fill, RiEdit2Fill } from "react-icons/ri";
import { useUsersStore } from "../../admin/store/useUsersStore";
import { MdOutlineWorkspacePremium } from "react-icons/md";

export const UserPage = () => {
  const logout = useAuthStore((state) => state.logout);
  const [fetching, setFetching] = useState(true);
  const { user, loadUserById } = useUsersStore();
  const { deleteUser } = useUsersStore();
  const navigate = useNavigate();
  const [alert, setAlert] = useState(null);

  // Obtener id del usuario en sesión
  const getUserId = useAuthStore((state) => state.getUserId);
  const loggedUserId = getUserId();

  useEffect(() => {
    if(fetching){
      loadUserById(loggedUserId);
      setFetching(false);
    }
  }, [fetching, loadUserById]);

  // Cerrar Sesión
  const handleLogout = () => {
    logout();
  };

  // Eliminar cuenta
  const handleDeleteUser = async () => {
    try {
      await deleteUser(loggedUserId);
      setAlert({
        message: "Su cuenta ha sido eliminada correctamente.",
        type: "success",
      });
      setTimeout(() => {
        logout();
        navigate("/home");
      }, 2000);
    } catch (error) {
      console.error("Error al eliminar la cuenta:", error);
      setAlert({
        message: "Hubo un error al eliminar la cuenta.",
        type: "error",
      });
    }
  };
  

  return (
    <div className="container mx-auto p-6">
      
      {alert && (
      <CustomAlerts
        message={alert.message}
        type={alert.type}
        onClose={() => setAlert(null)} // Cerrar alerta
      />
    )}

      {/* Información de Usuario */}
      <div className="bg-white shadow-lg rounded-lg p-6 mb-4 flex items-center justify-between">
        <div className="flex items-center">
          <div className="mr-8">
            <img
              className="w-32 h-32 rounded-full"
              src="https://static.vecteezy.com/system/resources/previews/009/292/244/non_2x/default-avatar-icon-of-social-media-user-vector.jpg"
              alt="Profile"
            />
          </div>
          <div>
            <h2 className="text-2xl flex font-semibold">
              {user?.data?.firstName} {user?.data?.lastName}
              {user?.data?.membership && ( // Mostrar insignia de usuario premium
                <MdOutlineWorkspacePremium size={32} className="text-yellow-500 ml-1"/>
              )}
            </h2>
            <p className="py-1 text-gray-700">{user?.data?.email}</p>
            <p className="text-gray-700">{user?.data?.location}</p>
            {/* Rating de estrellas */}
            <div className="mt-2 flex items-center">
              <StarRating rating={user?.data?.averageRating || 0} />
              <IoStatsChart size={14} className="text-gray-700 mt-1 mx-1" />
              <span className="text-base text-gray-700">({user?.data?.ratingsCount})</span>
            </div>
          </div>
        </div>
        <div className="ml-auto grid grid-cols-2 gap-4">
          <Link to={`/user/edit/${loggedUserId}`}>
            <button className="flex items-center justify-center px-10 bg-blue-600 text-white w-full py-2 rounded hover:bg-blue-500">
              <RiEdit2Fill size={17} className="mr-1" />
              Editar Cuenta
            </button>
          </Link>
          <button
            className="flex items-center justify-center bg-red-600 text-white w-full py-2 px-10 rounded hover:bg-red-500"
            onClick={handleDeleteUser}
          >
            <RiDeleteBin5Fill className="mr-2" size={18}/>
            Eliminar Cuenta
          </button>

          <Link to="/main/event/create">
            <button className="flex items-center justify-center px-10 bg-green-600 text-white w-full py-2 rounded hover:bg-green-500">
              <FiPlusCircle size={17} className="mr-1" />
              Nuevo Evento
            </button>
          </Link>
          <Link to="/home">
            <button
              onClick={handleLogout}
              className="flex items-center justify-center px-10 bg-gray-600 text-white w-full py-2 rounded hover:bg-gray-500">
              <BiLogOutCircle size={20} className="mr-1" />
              Cerrar Sesión
            </button>
          </Link>
        </div>
      </div>

      {/* Eventos */}
      <div className="flex justify-between gap-4">
        {/* Eventos Organizados */}
        <div className="w-full">
          <h2 className="text-2xl text-white mb-4 font-semibold">Eventos Organizados</h2>
            <div className="bg-white shadow-lg rounded-lg p-4">
              {user?.data?.organizedEvents?.length > 0 ? (
                user.data.organizedEvents.map(event => (
                  <Link to={`/main/event/${event.id}`} key={event.id} className="flex justify-between p-3 rounded-md transition-colors duration-200 hover:text-white hover:bg-gray-600">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold">{event.title}</h3>
                      <p>{event.categoryName}</p>
                    </div>
                    <div className="flex-1 text-right">
                      <p>{formatDate(event.date)}</p>
                    </div>
                  </Link>
                ))
              ) : (
                <p className="text-center text-gray-600">No hay eventos organizados aún.</p>
              )}
            </div>
        </div>

        {/* Eventos Registrados (Asistencias) */}
        <div className="w-full">
          <h2 className="text-2xl text-white mb-4 font-semibold">Eventos Registrados</h2>
            <div className="bg-white shadow-lg rounded-lg p-4">
              {user?.data?.attendances?.length > 0 ? (
                user.data.attendances.map(attendance => (
                  <Link to={`/main/event/${attendance.eventId}`} key={attendance.id} className="flex justify-between p-3 rounded-md transition-colors duration-200 hover:text-white hover:bg-gray-600">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold">{attendance.eventTitle}</h3>
                    </div>
                    <div className="flex text-right">
                      <div
                      className={`font-bold rounded-2xl px-3 py-1 text-white ${
                        attendance.state === "CONFIRMADO"
                          ? "bg-green-500"
                          : attendance.state === "PENDIENTE"
                          ? "bg-yellow-500"
                          : "bg-red-500"
                      }`}
                      >{attendance.state}
                      </div>
                    </div>
                  </Link>
                ))
              ) : (
                <p className="text-center text-gray-600">No estás registrado en ningún evento.</p>
              )}
            </div>
        </div>
      </div>
    </div>
  );
};
