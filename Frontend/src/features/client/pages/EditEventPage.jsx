import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useEventsStore } from "../store/useEventsStore";
import Swal from "sweetalert2";
import { useCategoriesStore } from "../../admin/store/useCategoriesStore";

export const EditEventPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [fetching, setFetching] = useState(true);

  // Funciones de eventos y categorías
  const { categories, loadCategories, isLoading } = useCategoriesStore();
  const { event, loadEventById, editEvent, isSubmitting, error } = useEventsStore();
  const [formData, setFormData] = useState({
    title: "",
    categoryId: "",
    description: "",
    ubication: "",
    date: "",
  });

  // Cargar categorías
  useEffect(() => {
    if (fetching) {
      loadCategories();
      setFetching(false);
    }
  }, [fetching]);

  // Cargar Evento a editar
  useEffect(() => {
    const fetchEvent = async () => {
      await loadEventById(id);
    };
    fetchEvent();
  }, [id]);

  useEffect(() => {
    if (event?.data) {
      setFormData({
        title: event.data.title,
        categoryId: event.data.categoryId,
        description: event.data.description,
        ubication: event.data.ubication,
        date: new Date(event.data.date).toISOString().slice(0, 16), // Formato para datetime-local
      });
    }
  }, [event]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validar que la fecha sea mayor a la fecha actual
    const selectedDate = new Date(formData.date);
    const currentDate = new Date();

    if (selectedDate <= currentDate) {
      setAlertData({
        message: "La fecha que intenta ingresar ya pasó.",
        type: "error",
        show: true,
      });
      return;
    }

    try {
      await editEvent(id, {
        categoryId: formData.categoryId,
        title: formData.title,
        description: formData.description,
        ubication: formData.ubication,
        date: formData.date,
      });

      // Mostrar alert de éxito
      Swal.fire({
        title: "¡Éxito!",
        text: "Evento actualizado correctamente",
        icon: "success",
        confirmButtonText: "OK",
      }).then(() => {
        navigate(`/main/event/${id}`);
      });

    } catch (error) {
      setAlertData({
        message: "Hubo un error al editar el evento.",
        type: "error",
        show: true,
      });
    }
  };

  return (
    <div className="container mx-auto px-6">
      <main className="flex-1 p-6">
        <h2 className="text-3xl text-white font-bold mb-6">Editar Evento</h2>

        <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
              Título del Evento
            </label>
            <input
              id="title"
              name="title"
              type="text"
              placeholder="Título"
              value={formData.title}
              onChange={handleChange}
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="category">
              Categoría
            </label>
            {isLoading ? (
              <li>Cargando categorías...</li>
            ) : (
              <select
                id="categoryId"
                name="categoryId"
                value={formData.categoryId}
                onChange={handleChange}
                required
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              >
                <option value="">Selecciona una categoría</option>
                {categories?.data?.items?.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
              Descripción
            </label>
            <textarea
              id="description"
              name="description"
              placeholder="Descripción del evento"
              value={formData.description}
              onChange={handleChange}
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              rows="4"
            ></textarea>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="ubication">
              Ubicación
            </label>
            <input
              id="ubication"
              name="ubication"
              type="text"
              placeholder="Ubicación"
              value={formData.ubication}
              onChange={handleChange}
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="date">
              Fecha de Realización
            </label>
            <input
              id="date"
              name="date"
              type="datetime-local"
              value={formData.date}
              onChange={handleChange}
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>

          <div className="flex items-center justify-center">
            <button
              type="submit"
              className="w-80 bg-green-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline hover:bg-green-700"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Actualizando..." : "Actualizar Evento"}
            </button>
          </div>

          {error && (
            <div className="text-red-500 text-center mt-4">
              {error}
            </div>
          )}
        </form>

      </main>
    </div>
  );
};
