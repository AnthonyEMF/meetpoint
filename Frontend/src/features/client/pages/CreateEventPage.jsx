import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCategories } from "../hooks/useCategories";
import { CustomAlerts } from "../../../shared/components";
import { useEventsStore } from "../store/useEventsStore";

export const CreateEventPage = () => {
  const navigate = useNavigate();
  const [fetching, setFetching] = useState(true);
  const { categories, loadCategories, isLoading } = useCategories();
  const { createEvent, isSubmitting, error } = useEventsStore();
  const [eventData, setEventData] = useState({
    categoryId: "",
    title: "",
    description: "",
    ubication: "",
    date: "",
  });

// Estado del alert
const [alertData, setAlertData] = useState({ message: "", type: "", show: false });

  // Cargar categorías
  useEffect(() => {
    if (fetching) {
      loadCategories();
      setFetching(false);
    }
  }, [fetching]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEventData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validar que la fecha sea mayor a la fecha actual
    const selectedDate = new Date(eventData.date);
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
      await createEvent(eventData);

      // Mostrar alert de éxito
      setAlertData({
        message: "Evento creado correctamente.",
        type: "success",
        show: true,
      });

      // Redirigir después de 2 segundos
      setTimeout(() => {
        navigate("/main");
      }, 2000);
    } catch (error) {
      setAlertData({
        message: "Hubo un error al crear el evento.",
        type: "error",
        show: true,
      });
    }
  };

  return (
    <div className="container mx-auto px-6">
      <main className="flex-1 p-6">
        <h2 className="text-3xl text-white font-bold mb-6">
          Crear Nuevo Evento
        </h2>

        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        >
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="title"
            >
              Título del Evento
            </label>
            <input
              id="title"
              name="title"
              type="text"
              placeholder="Título"
              value={eventData.title}
              onChange={handleChange}
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="category"
            >
              Categoría
            </label>

            {isLoading ? (
              <li>Cargando categorías...</li>
            ) : (
              <select
                id="categoryId"
                name="categoryId"
                value={eventData.categoryId}
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
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="description"
            >
              Descripción
            </label>
            <textarea
              id="description"
              name="description"
              placeholder="Descripción del evento"
              value={eventData.description}
              onChange={handleChange}
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              rows="4"
            ></textarea>
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="ubication"
            >
              Ubicación
            </label>
            <input
              id="ubication"
              name="ubication"
              type="text"
              placeholder="Ubicación"
              value={eventData.ubication}
              onChange={handleChange}
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="date"
            >
              Fecha de Realización
            </label>
            <input
              id="date"
              name="date"
              type="datetime-local"
              value={eventData.date}
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
              {isSubmitting ? "Creando..." : "Crear Evento"}
            </button>
          </div>

          {error && (
            <div className="text-red-500 text-center mt-4">
              Ocurrió un error al crear el evento. Intenta nuevamente.
            </div>
          )}
        </form>
        {/* Mostrar el alert si está habilitado */}
        {alertData.show && (
          <CustomAlerts
            message={alertData.message}
            type={alertData.type}
            onClose={() => setAlertData((prev) => ({ ...prev, show: false }))}
          />
        )}
      </main>
    </div>
  );
};
