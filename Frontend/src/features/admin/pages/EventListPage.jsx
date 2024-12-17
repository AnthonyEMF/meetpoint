import { useEffect, useState } from "react";
import { Pagination } from "../../../shared/components";
import { EventRowItem } from "../components";
import { Link } from "react-router-dom";
import { FiPlusCircle } from "react-icons/fi";
import { useEventsStore } from "../../client/store/useEventsStore";

export const EventListPage = () => {
  const { events, loadEvents, isLoading } = useEventsStore();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    if (fetching) {
      loadEvents(searchTerm, currentPage);
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
    if (event.data.hasPreviousPage) {
      setCurrentPage((prevPage) => prevPage - 1);
      setFetching(true);
    }
  };

  // Ir a página siguiente
  const handleNextPage = () => {
    if (event.data.hasNextPage) {
      setCurrentPage((prevPage) => prevPage + 1);
      setFetching(true);
    }
  };

  return (
    <div className="flex flex-col items-center w-full h-full p-4 ">
      <div className="w-full p-6">
        <div className="flex items-center justify-between pb-4">
          <h1 className="text-4xl font-bold text-white">Eventos</h1>
          <form onSubmit={handleSubmit}>
            <div className="flex">
              <input
                type="text"
                placeholder="Buscar evento..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="px-4 py-2 border rounded-lg rounded-r-none focus:outline-none focus:border-gray-500"
              />
              <button
                type="submit"
                className="bg-gray-600 text-white px-4 py-2 rounded-r-lg hover:bg-gray-500"
              >
                {" "}
                Buscar
              </button>
              <Link
                className="flex items-center bg-green-500 text-white px-4 py-2 rounded-lg ml-2 hover:bg-green-700"
                to="/main/event/create" // Mandar al CreateEventPage
              >
                <FiPlusCircle size={17} className="mr-2" />
                Nuevo evento
              </Link>
            </div>
          </form>
        </div>

        <table className="min-w-full mt-3 bg-gray-100 rounded-lg shadow-md overflow-hidden">
          <thead>
            <tr>
              <th className="px-6 py-3 text-left text-gray-600 font-medium tracking-wider">
                TITULO
              </th>
              <th className="px-6 py-3 text-left text-gray-600 font-medium tracking-wider">
                CATEGORÍA
              </th>
              <th className="px-6 py-3 text-left text-gray-600 font-medium tracking-wider">
                ORGANIZADOR
              </th>
              <th className="px-6 py-3 text-left text-gray-600 font-medium tracking-wider">
                FECHA
              </th>
              <th className="px-6 py-3 text-left text-gray-600 font-medium tracking-wider">
                COMENTARIOS
              </th>
              <th className="px-6 py-3 text-left text-gray-600 font-medium tracking-wider">
                ASISTENCIAS
              </th>
              <th className="px-6 py-3 text-left text-gray-600 font-medium tracking-wider">
                DETALLES
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {isLoading ? (
              <tr>
                <td colSpan="7" className="px-6 py-4 text-center text-gray-500">
                  Cargando...
                </td>
              </tr>
            ) : events?.data?.items?.length ? (
              events.data.items.map((event) => (
                <EventRowItem key={event.id} event={event} />
              ))
            ) : (
              <tr>
                <td colSpan="7" className="px-6 py-4 text-center text-gray-500">
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
          totalPages={events?.data?.totalPages}
          hasNextPage={events?.data?.hasNextPage}
          hasPreviousPage={events?.data?.hasPreviousPage}
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
