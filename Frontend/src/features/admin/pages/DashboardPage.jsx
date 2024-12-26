import { Link } from "react-router-dom";
import { CategoryDashboardRowItem, EventDashboardRowItem, ReportDashboardRowItem, UserDashboardRowItem } from "../components";
import { useEffect, useState } from "react";
import { Loading, Pagination } from "../../../shared/components";
import { useDashboardStore } from "../store/useDashboardStore";
import { FaComments } from "react-icons/fa";
import { FaMapLocationDot } from "react-icons/fa6";
import { MdAssignment } from "react-icons/md";
import { IoPeopleSharp } from "react-icons/io5";
import { useReportsStore } from "../../client/store/useReportsStore";
import { RiAdminFill } from "react-icons/ri";

export const DashboardPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const loadData = useDashboardStore((state) => state.loadData);
  const dashboardData = useDashboardStore((state) => state.dashboardData);

  // Reportes con paginación
  const { reports, loadReports } = useReportsStore();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [fetching, setFetching] = useState(true);

  const {
    usersCount,
    eventsCount,
    attendancesCount,
    commentsCount,
    users,
    events,
    categories,
    //reports,
  } = dashboardData;

  // Cargar dashboard
  useEffect(() => {
    if (isLoading) {
      loadData();
      setIsLoading(false);
    }
  }, [isLoading]);

  // Cargar reportes
  useEffect(() => {
    if (fetching) {
      loadReports(searchTerm, currentPage);
      setFetching(false);
    }
  }, [fetching, searchTerm, currentPage]);

  // Actualizar reportes
  const handleReportsChange = async () => {
    await loadReports(searchTerm, currentPage);
  };

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
    if (category.data.hasPreviousPage) {
      setCurrentPage((prevPage) => prevPage - 1);
      setFetching(true);
    }
  };

  // Ir a página siguiente
  const handleNextPage = () => {
    if (category.data.hasNextPage) {
      setCurrentPage((prevPage) => prevPage + 1);
      setFetching(true);
    }
  };

  if (isLoading) return <Loading />;

  return (
    <div className="min-h-screen">
      <header>
        <div className="container mx-auto mt-4 px-4 py-4 text-center">
          <h1 className="flex items-center justify-center text-4xl font-bold text-white">
            Administración
            <RiAdminFill size={35} className="ml-1" />
          </h1>
        </div>
      </header>

      {/* Contadores */}
      <div className="flex items-center px-1 text-gray-800">
        <div className="px-4 py-2 w-full">
          <div className="grid grid-cols-12 gap-4">
            <div className="col-span-12 sm:col-span-6 md:col-span-3">
              <div className="flex flex-row bg-white shadow-sm rounded p-4">
                <div className="flex items-center justify-center flex-shrink-0 h-12 w-12 rounded-xl bg-blue-100 text-blue-500">
                  <IoPeopleSharp className="w-6 h-6" />
                </div>
                <div className="flex flex-col flex-grow ml-4">
                  <div className="text-sm text-gray-700">Usuarios</div>
                  <div className="font-bold text-lg">{usersCount}</div>
                </div>
              </div>
            </div>
            <div className="col-span-12 sm:col-span-6 md:col-span-3">
              <div className="flex flex-row bg-white shadow-sm rounded p-4">
                <div className="flex items-center justify-center flex-shrink-0 h-12 w-12 rounded-xl bg-orange-100 text-orange-500">
                  <FaMapLocationDot className="w-6 h-6" />
                </div>
                <div className="flex flex-col flex-grow ml-4">
                  <div className="text-sm text-gray-700">Eventos</div>
                  <div className="font-bold text-lg">{eventsCount}</div>
                </div>
              </div>
            </div>
            <div className="col-span-12 sm:col-span-6 md:col-span-3">
              <div className="flex flex-row bg-white shadow-sm rounded p-4">
                <div className="flex items-center justify-center flex-shrink-0 h-12 w-12 rounded-xl bg-green-100 text-green-500">
                  <MdAssignment className="w-6 h-6" />
                </div>
                <div className="flex flex-col flex-grow ml-4">
                  <div className="text-sm text-gray-700">Asistencias</div>
                  <div className="font-bold text-lg">{attendancesCount}</div>
                </div>
              </div>
            </div>
            <div className="col-span-12 sm:col-span-6 md:col-span-3">
              <div className="flex flex-row bg-white shadow-sm rounded p-4">
                <div className="flex items-center justify-center flex-shrink-0 h-12 w-12 rounded-xl bg-red-100 text-red-500">
                  <FaComments className="w-6 h-6" />
                </div>
                <div className="flex flex-col flex-grow ml-4">
                  <div className="text-sm text-gray-700">Comentarios</div>
                  <div className="font-bold text-lg">{commentsCount}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Enlaces a ver todos */}
      <nav>
        <div className="container mx-auto mt-4 px-4 gap-6 grid grid-cols-1 md:grid-cols-3">
          <Link
            to="/administration/users-list"
            className="px-6 py-2 bg-blue-500 text-white text-center rounded hover:bg-blue-600"
          >
            Ver todos los Usuarios
          </Link>
          <Link
            to="/administration/events-list"
            className="px-6 py-2 bg-blue-500 text-white text-center rounded hover:bg-blue-600"
          >
            Ver todos los Eventos
          </Link>
          <Link
            to="/administration/categories-list"
            className="px-6 py-2 bg-blue-500 text-white text-center rounded hover:bg-blue-600"
          >
            Ver todas las Categorías
          </Link>
        </div>
      </nav>

      {/* Contenido */}
      <main className="container mx-auto px-4 py-2 grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Usuarios Recientes */}
        <section className="bg-white shadow rounded p-4">
          <h2 className="text-xl font-bold text-gray-700 mb-4 text-center">
            Últimos Usuarios
          </h2>
          <ul className="space-y-2">
            <UserDashboardRowItem users={users} />
          </ul>
        </section>
        {/* Eventos Recientes */}
        <section className="bg-white shadow rounded p-4">
          <h2 className="text-xl font-bold text-gray-700 mb-4 text-center">
            Últimos Eventos
          </h2>
          <ul className="space-y-2">
            <EventDashboardRowItem events={events} />
          </ul>
        </section>
        {/* Categorías Recientes */}
        <section className="bg-white shadow rounded p-4">
          <h2 className="text-xl font-bold text-gray-700 mb-4 text-center">
            Últimas Categorías
          </h2>
          <ul className="space-y-2">
            <CategoryDashboardRowItem categories={categories} />
          </ul>
        </section>
      </main>

      <div className="container mx-auto px-4 py-2 grid grid-cols-1 md:grid-cols-1 gap-6 mb-6 mt-2">
        {/* Reportes */}
        <section className="bg-white shadow rounded p-4">
          <h2 className="text-lg font-bold text-gray-700 mb-3">
            <div className="flex justify-center items-center">
              <span className="text-2xl mb-2">Reportes de usuarios</span>
            </div>
            {/* Barra de búsqueda */}
            <form onSubmit={handleSubmit} className="flex items-center">
              <input
                type="text"
                placeholder="Buscar reporte..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg rounded-r-none focus:outline-none focus:border-gray-500"
              />
              <button
                type="submit"
                className="bg-gray-600 text-white px-4 py-2 rounded-r-md hover:bg-gray-500"
              >
                {" "}
                Buscar
              </button>
            </form>
          </h2>
          <ul className="space-y-2">
            {isLoading ? (
              <li>
                <p colSpan="5" className="px-6 py-4 text-center text-gray-500">
                  Cargando...
                </p>
              </li>
            ) : reports?.data?.items?.length ? (
              reports.data.items
                .slice(0, 5)
                .map((report) => (
                  <ReportDashboardRowItem
                    key={report.id}
                    report={report}
                    handleReportsChange={handleReportsChange}
                  />
                ))
            ) : (
              <li>
                <p colSpan="5" className="px-6 py-4 text-center text-gray-500">
                  No se encontraron resultados.
                </p>
              </li>
            )}
          </ul>

          {/* Paginación */}
          <div className="mt-6 mb-6 flex justify-center">
            <Pagination
              totalPages={reports?.data?.totalPages}
              hasNextPage={reports?.data?.hasNextPage}
              hasPreviousPage={reports?.data?.hasPreviousPage}
              currentPage={currentPage}
              handleNextPage={handleNextPage}
              handlePreviousPage={handlePreviousPage}
              setCurrentPage={setCurrentPage}
              handleCurrentPage={handleCurrentPage}
            />
          </div>
        </section>
      </div>
    </div>
  );
};
