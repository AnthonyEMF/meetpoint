import { useEffect, useState } from "react";
import { Pagination } from "../../../shared/components";
import { CategoriesRowItem } from "../components";
import { Link } from "react-router-dom";
import { FiPlusCircle } from "react-icons/fi";
import { useCategoriesStore } from "../store/useCategoriesStore";

export const CategoriesListPage = () => {
  const { categories, loadCategories, isLoading } = useCategoriesStore();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    if (fetching) {
      loadCategories(searchTerm, currentPage);
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

  // Actualizar categorías
  const handleCategoriesChange = async () => {
    await loadCategories(searchTerm, currentPage);
  };

  return (
    <div className="flex flex-col items-center w-full h-full p-4 ">
      <div className="w-full max-w-5xl p-6">
        <div className="flex items-center justify-between pb-4">
          <h1 className="text-4xl font-bold text-white">Categorías</h1>
          <form onSubmit={handleSubmit}>
            <div className="flex">
              <input
                type="text"
                placeholder="Buscar categoría..."
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
                to={`/administration/categories-list/new`} // Mandar al CreateCategoryPage
              >
                <FiPlusCircle size={17} className="mr-2" />
                Nueva categoría
              </Link>
            </div>
          </form>
        </div>

        <table className="min-w-full mt-3  bg-gray-100 rounded-lg">
          <thead>
            <tr>
              <th className="px-6 py-3 text-left text-gray-600 font-medium tracking-wider">
                NOMBRE
              </th>
              <th className="px-6 py-3 text-left text-gray-600 font-medium tracking-wider">
                DESCRIPCIÓN
              </th>
              <th className="px-6 py-3 text-center text-gray-600 font-medium tracking-wider">
                ACCIONES
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {isLoading ? (
              <tr>
                <td colSpan="2" className="px-6 py-4 text-center text-gray-500">
                  Cargando...
                </td>
              </tr>
            ) : categories?.data?.items?.length ? (
              categories.data.items.map((category) => (
                <CategoriesRowItem
                  key={category.id}
                  category={category}
                  handleCategoriesChange={handleCategoriesChange}
                />
              ))
            ) : (
              <tr>
                <td colSpan="2" className="px-6 py-4 text-center text-gray-500">
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
          totalPages={categories?.data?.totalPages}
          hasNextPage={categories?.data?.hasNextPage}
          hasPreviousPage={categories?.data?.hasPreviousPage}
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
