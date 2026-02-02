import { useEffect, useState } from "react";
import { EventListItem } from "./EventListItem";
import { Pagination } from "../../../shared/components";
import { EventListSkeleton } from "./EventListSkeleton";
import { useEventsStore } from "../store/useEventsStore";

export const EventList = ({ selectedCategory }) => {
  const { events, loadEvents, isLoading } = useEventsStore();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState(selectedCategory || "");
  const [fetching, setFetching] = useState(true);

  // El fetching evita que la pagina se este recargando constantemente
  useEffect(() => {
    if (fetching) {
      loadEvents(searchTerm, currentPage);
      setFetching(false);
    }
  }, [fetching, searchTerm, currentPage]);

  useEffect(() => {
    if (selectedCategory) {
      setSearchTerm(selectedCategory);
      setCurrentPage(1);
      setFetching(true);
    }
  }, [selectedCategory]);

  // Evitar que el envío de un formulario recargue la página
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
    if (events.data.hasPreviousPage) {
      setCurrentPage((prevPage) => prevPage - 1);
      setFetching(true);
    }
  };

  // Ir a página siguiente
  const handleNextPage = () => {
    if (events.data.hasNextPage) {
      setCurrentPage((prevPage) => prevPage + 1);
      setFetching(true);
    }
  };

  return (
    <div className="flex-1 flex flex-col">
      {/* Barra de búsqueda */}
      <div className="mb-6 shadow-lg">
        <form onSubmit={handleSubmit}>
          <div className="flex items-center">
            <input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              type="search"
              placeholder="Buscar eventos..."
              className="w-full px-4 py-2 rounded-l-md border-none focus:outline-none"
            />
            <button
              type="submit"
              className="bg-gray-600 text-white px-4 py-2 rounded-r-md hover:bg-gray-500"
            >
              Buscar
            </button>
          </div>
        </form>
      </div>

      {/* Eventos */}
      {isLoading ? (
        <EventListSkeleton size={6} />
      ) : (
        <main className="flex-1">
          <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-6">
            {events?.data?.items?.length ? (
              events.data.items.map((event) => (
                <EventListItem key={event.id} event={event} />
              ))
            ) : (
              <p className="text-white font-bold">
                No hay eventos disponibles.
              </p>
            )}
          </div>
        </main>
      )}

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
