import { Link } from "react-router-dom";
import { useCategoriesStore } from "../store/useCategoriesStore";
import { useEffect, useState } from "react";
import { RiDeleteBin5Fill, RiEdit2Fill } from "react-icons/ri";
import { useEventsStore } from "../../user/store/useEventsStore";

export const CategoriesRowItem = ({ category, handleCategoriesChange }) => {
  const { deleteCategory } = useCategoriesStore();
  const { events, loadEvents } = useEventsStore();
  const [fetching, setFetching] = useState(true);
  const [alertData, setAlertData] = useState({ message: "", type: "", show: false });
  const [showConfirmAlert, setShowConfirmAlert] = useState(false);

  useEffect(() => {
    if (fetching) {
      loadEvents();
      setFetching(false);
    }
  }, [fetching]);

  const handleDelete = async () => {
    const isCategoryRelated = events.data.items.some((event) => event.categoryId === category.id);
    if (isCategoryRelated) {
      setAlertData({
        message: "Error: No se pueden eliminar categorías con eventos relacionados.",
        type: "error",
        show: true,
      });
      return;
    }
    setShowConfirmAlert(true); // Mostrar alerta de confirmación
  };

  const confirmDeleteCategory = async () => {
    try {
      await deleteCategory(category.id);
      setAlertData({
        message: "Categoría eliminada correctamente.",
        type: "success",
        show: true,
      });
      setShowConfirmAlert(false); // Ocultar alerta de confirmación
      if (handleCategoriesChange) handleCategoriesChange();
    } catch (error) {
      setAlertData({
        message: "Error al eliminar la categoría.",
        type: "error",
        show: true,
      });
      console.error("Error al eliminar la categoría:", error);
    }
  };

  return (
    <>
      {alertData.show && (
        <tr>
          <td colSpan="3" className="bg-red-100 text-red-800 text-center px-4 py-2">
            <div className="flex justify-between items-center">
              <span>{alertData.message}</span>
              <button
                className="text-red-600 hover:text-red-800 font-bold"
                onClick={() => setAlertData((prev) => ({ ...prev, show: false }))}
              >
                Cerrar
              </button>
            </div>
          </td>
        </tr>
      )}
      {showConfirmAlert && (
        <tr>
          <td colSpan="3" className="bg-yellow-100 text-yellow-800 text-center px-6 py-2 pr-20">
            <div className="flex justify-between items-center">
              <span>¿Está seguro de que desea eliminar esta categoría?</span>
                <div className="flex space-x-2">
                <button
                  className="bg-green-500 text-white px-4 py-1 rounded hover:bg-green-700 font-bold"
                  onClick={confirmDeleteCategory}
                >
                  Confirmar
                </button>
                <button
                  className="bg-gray-500 text-white px-4 py-1 rounded hover:bg-gray-700 font-bold"
                  onClick={() => setShowConfirmAlert(false)}
                >
                  Cancelar
                </button>
              </div>
            </div>
          </td>
        </tr>
      )}
      <tr key={category.id}>
        <td className="px-6 py-4 text-sm font-medium text-gray-900">
          {category.name}
        </td>
        <td className="px-6 py-4 text-sm text-gray-500">
          {category.description}
        </td>
        <td className="flex justify-center px-6 py-4 text-sm text-white">
          <Link
            className="flex items-center bg-blue-500 px-4 py-2 rounded-lg mr-2 hover:bg-blue-700"
            to={`/administration/categories-list/edit/${category.id}`}
          >
            <RiEdit2Fill className="mr-2" size={15} />
            Editar
          </Link>
          <button
            className="flex items-center bg-red-500 px-4 py-2 rounded-lg hover:bg-red-700"
            onClick={handleDelete}
          >
            <RiDeleteBin5Fill className="mr-2" size={15} />
            Eliminar
          </button>
        </td>
      </tr>
    </>
  );
};
