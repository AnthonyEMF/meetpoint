import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuthStore } from "../../security/store/useAuthStore";
import { BiLogOutCircle } from "react-icons/bi";
import { FiPlusCircle } from "react-icons/fi";
import { FaPeoplePulling } from "react-icons/fa6";
import { MdOutlineWorkspacePremium } from "react-icons/md";
import { StarRating } from "../../../shared/components";
import { IoStatsChart } from "react-icons/io5";
import { useCategoriesStore } from "../../admin/store/useCategoriesStore";
import { useUsersStore } from "../../admin/store/useUsersStore";

export const Sidebar = ({ onCategorySelect }) => {
  const [fetching, setFetching] = useState(true);

  // Funciones de categorías y usuarios
  const { user, loadUserById } = useUsersStore();
  const { categories, loadCategories, isLoading } = useCategoriesStore();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const logout = useAuthStore((state) => state.logout);

  // Obtener id del usuario en sesión
  const getUserId = useAuthStore((state) => state.getUserId);
  const loggedUserId = getUserId();

  useEffect(() => {
    if (fetching) {
      loadUserById(loggedUserId);
      loadCategories();
      setFetching(false);
    }
  }, [fetching, loadUserById, loadCategories]);

  // Pasar nombre de categoría para ordenar eventos
  const handleCategoryClick = (category) => {
    onCategorySelect(category.name);
  };

  // Cerrar Sesión
  const handleLogout = () => {
    logout();
  };

  return (
    <aside className="w-64 mr-6 mb-6">
      {/* Sección de Usuario */}
      {isAuthenticated ? (
        <div className="bg-white shadow-lg rounded-md p-6 mb-6">
          <div className="text-center mb-2">
            <Link to="/user">
              <img
                src="https://static.vecteezy.com/system/resources/previews/009/292/244/non_2x/default-avatar-icon-of-social-media-user-vector.jpg"
                alt="Perfil"
                className="w-24 h-24 rounded-full mx-auto mb-3"
              />
            </Link>
            <h2 className="text-xl flex justify-center items-center font-bold">
              {user?.data?.firstName} {user?.data?.lastName}
              {user?.data?.membership && ( // Mostrar insignia de usuario premium
                <MdOutlineWorkspacePremium size={27} className="text-yellow-500 ml-1"/>
              )}
            </h2>
          </div>
          <div className="mb-4 text-center">
            <p className="mb-2">Eventos Organizados: <span className="font-bold">{user?.data?.eventsCount}</span></p>
            <p>Eventos Registrados: <span className="font-bold">{user?.data?.attendancesCount}</span></p>
            {/* Rating de estrellas */}
            <div className="mt-2 flex justify-center items-center">
              <StarRating rating={user?.data?.averageRating || 0} />
              <IoStatsChart size={14} className="text-gray-700 mt-1 mx-1" />
              <span className="text-base text-gray-700">({user?.data?.ratingsCount})</span>
            </div>
          </div>
          <div className="mb-4">
            <Link to="/main/event/create">
              <button className="flex items-center justify-center bg-green-600 text-white w-full py-2 rounded hover:bg-green-500 mb-4">
                <FiPlusCircle size={17} className="mr-1" />
                Nuevo Evento
              </button>
            </Link>
            <Link to="/home">
              <button
                onClick={handleLogout}
                className="flex items-center justify-center bg-gray-600 text-white w-full py-2 rounded hover:bg-gray-500">
                <BiLogOutCircle size={20} className="mr-1" />
                Cerrar Sesión
              </button>
            </Link>
          </div>
        </div>
      ) : (
        <div></div>
      )}

      {/* Sección de Categorías */}
      <div className="bg-white shadow-lg rounded-md p-6 mb-6">
        <h3 className="text-xl font-bold mb-4">Categorías</h3>
        <ul className="space-y-2">
          {isLoading ? (
            <li>Cargando categorías...</li>
          ) : (
            categories?.data?.items?.map((category) => (
              <li key={category.id}>
                <button
                  onClick={() => handleCategoryClick(category)}
                  className="text-gray-600 hover:underline"
                >
                  {category.name}
                </button>
              </li>
            ))
          )}
        </ul>
      </div>

      {/* Membresía */}
      {isAuthenticated && (
        <>
          {!user?.data?.membership ? (
            <div className="bg-white shadow-lg rounded-md p-5">
              <h3 className="text-lg text-center font-bold mb-2">¡Adquiere tu membresía!</h3>
              <div className="flex flex-col items-center justify-center">
                <MdOutlineWorkspacePremium size={60} className="text-yellow-500" />
                <p className="mb-4 mt-2 text-center px-4">
                  Descubre las ventajas de adquirir un plan de membresía
                </p>
              </div>
              <Link
                to="/membership"
                className="flex justify-center p-2 bg-yellow-500 rounded text-white font-semibold hover:bg-yellow-600"
              >
                Ver planes
              </Link>
            </div>
          ) : (
            <div className="bg-white shadow-lg rounded-md p-5">
              <h3 className="text-xl text-center font-bold mb-2">¡Felicidades!</h3>
              <div className="flex flex-col items-center justify-center">
                <MdOutlineWorkspacePremium size={60} className="text-yellow-500" />
                <p className="mb-2 mt-2 text-center px-4">
                  Ya eres un usuario premium, esperamos que disfrutes de los beneficios exclusivos
                </p>
              </div>
            </div>
          )}
        </>
      )}

      {/* Crear una cuenta */}
      {!isAuthenticated && (
      <div className="bg-white shadow-lg rounded-md p-6">
        <h3 className="text-xl text-center font-bold mb-4">¡Únete a nosotros!</h3>

        <div className="flex flex-col items-center justify-center">
          <FaPeoplePulling size={50} className="text-gray-800" />
          <p className="mb-4 mt-2 text-center px-4">Regístrate para poder empezar a crear nuevos eventos y compartir con nuestra comunidad</p>
        </div>

        <Link
          to="/security/register"
          className="flex justify-center p-2 bg-blue-600 rounded text-white hover:bg-blue-500"
        >
          Crear una cuenta
        </Link>
      </div>
      )}

    </aside>
  );
};