import { Pagination } from "../../../shared/components/Pagination";
import { useEffect, useState } from "react";
import { UserRowItem } from "../components/UserRowItem";
import { Link } from "react-router-dom";
import { FiPlusCircle } from "react-icons/fi";
import { useUsersStore } from "../store/useUsersStore";

export const UsersListPage = () => {
  const { users, loadUsers, isLoading } = useUsersStore();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    if (fetching) {
      loadUsers(searchTerm, currentPage);
      setFetching(false);
    }
  }, [fetching, searchTerm, currentPage]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setFetching(true);
  };

  // Cambiar a una página especifica
  const handleCurrentPage = (index = 1) => {
    setCurrentPage(index);
    setFetching(true);
  };

  // Ir a página anterior
  const handlePreviousPage = () => {
    if (user.data.hasPreviousPage) {
      setCurrentPage((prevPage) => prevPage - 1);
      setFetching(true);
    }
  };

  // Ir a página siguiente
  const handleNextPage = () => {
    if (user.data.hasNextPage) {
      setCurrentPage((prevPage) => prevPage + 1);
      setFetching(true);
    }
  };

  // Actualizar reportes
  const handleBlockedChange = async () => {
    loadUsers(searchTerm, currentPage);
  };

  return (
    <div className="flex flex-col items-center w-full h-full p-4 ">
      <div className="w-full max-w-6xl p-6">
        <div className="flex items-center justify-between pb-4">
          <h1 className="text-4xl font-bold text-white">Usuarios</h1>
          <form onSubmit={handleSubmit}>
            <div className="flex">
              <input
                type="text"
                placeholder="Buscar usuario..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="px-4 py-2 border rounded-lg rounded-r-none focus:outline-none focus:border-gray-500"
              />
              <button
                type="submit"
                className="bg-gray-600 text-white px-4 py-2 rounded-r-md hover:bg-gray-500"
              >
                {" "}
                Buscar
              </button>
              <Link
                className="flex items-center bg-green-500 text-white px-4 py-2 rounded-lg ml-2 hover:bg-green-700"
                to={`/administration/users-list/new`} // Mandar al CreateUserPage
              >
                <FiPlusCircle size={17} className="mr-2" />
                Nuevo usuario
              </Link>
            </div>
          </form>
        </div>

        <table className="min-w-full mt-3  bg-gray-100 rounded-lg">
          <thead>
            <tr>
              <th className="px-6 py-3 text-left text-gray-600 font-medium">
                NOMBRE
              </th>
              <th className="px-6 py-3 text-left text-gray-600 font-medium">
                EMAIL
              </th>
              <th className="px-6 py-3 text-center text-gray-600 font-medium">
                ROL
              </th>
              <th className="px-6 py-3 text-center text-gray-600 font-medium">
                REPORTES
              </th>
              <th className="px-6 py-3 text-center text-gray-600 font-medium">
                RATINGS
              </th>
              <th className="px-6 py-3 text-center text-gray-600 font-medium">
                ESTADO
              </th>
              <th className="px-6 py-3 text-left text-gray-600 font-medium">
                DETALLES
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {isLoading ? (
              <tr>
                <td colSpan="5" className="px-6 py-4 text-center text-gray-500">
                  Cargando...
                </td>
              </tr>
            ) : users?.data?.items?.length ? (
              users.data.items.map((user) => (
                <UserRowItem key={user.id} user={user} handleBlockedChange={handleBlockedChange} />
              ))
            ) : (
              <tr>
                <td colSpan="5" className="px-6 py-4 text-center text-gray-500">
                  No se encontraron resultados.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Paginación */}
      <div className="mt-6 mb-6">
        <Pagination
          totalPages={users?.data?.totalPages}
          hasNextPage={users?.data?.hasNextPage}
          hasPreviousPage={users?.data?.hasPreviousPage}
          currentPage={currentPage}
          handleNextPage={handleNextPage}
          handlePreviousPage={handlePreviousPage}
          setCurrentPage={setCurrentPage}
          handleCurrentPage={handleCurrentPage}
        />
      </div>
    </div>
  );
};
