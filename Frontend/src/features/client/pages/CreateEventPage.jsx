import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Loading } from "../../../shared/components";
import { useEventsStore } from "../store/useEventsStore";
import { useFormik } from "formik";
import { eventInitValues, eventValidationSchema } from "../forms/event.data";
import { useCategoriesStore } from "../../admin/store/useCategoriesStore";
import Swal from "sweetalert2";

export const CreateEventPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  // Funciones para eventos y categorías
  const { createEvent, isSubmitting, error } = useEventsStore();
  const { categories, loadCategories, isLoading } = useCategoriesStore();

  // Cargar categorías
  useEffect(() => {
    if (fetching) {
      loadCategories();
      setFetching(false);
    }
  }, [fetching]);

  // Manejo del formulario con Formik
  const formik = useFormik({
    initialValues: eventInitValues,
    validationSchema: eventValidationSchema,
    validateOnChange: true,
    onSubmit: async (formValues) => {
      setLoading(true);

      // Crear el nuevo evento
      const newEvent = await createEvent(formValues);
      Swal.fire({
        title: "¡Éxito!",
        text: "Evento creado correctamente",
        icon: "success",
        confirmButtonText: "OK",
      }).then(() => {
        navigate(`/main/event/${newEvent.data.id}`);
      });

      validateAuthentication();
      setLoading(false);
    }
  });

  // Pantalla de carga
  if (loading) return <Loading/>

  return (
    <div className="container mx-auto px-6">
      <main className="flex-1 p-6">
        <h2 className="text-3xl text-white font-bold mb-6">
          Crear Nuevo Evento
        </h2>

        <form
          onSubmit={formik.handleSubmit}
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
              value={formik.values.title}
              onChange={formik.handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          {formik.touched.title && formik.errors.title && (
            <div className="text-red-500 text-sm mb-3">{formik.errors.title}</div>
          )}

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
                value={formik.values.categoryId}
                onChange={formik.handleChange}
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
          {formik.touched.categoryId && formik.errors.categoryId && (
            <div className="text-red-500 text-sm mb-3">{formik.errors.categoryId}</div>
          )}

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
              value={formik.values.description}
              onChange={formik.handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              rows="4"
            ></textarea>
          </div>
          {formik.touched.description && formik.errors.description && (
            <div className="text-red-500 text-sm mb-3">{formik.errors.description}</div>
          )}

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
              value={formik.values.ubication}
              onChange={formik.handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          {formik.touched.ubication && formik.errors.ubication && (
            <div className="text-red-500 text-sm mb-3">{formik.errors.ubication}</div>
          )}

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
              value={formik.values.date}
              onChange={formik.handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          {formik.touched.date && formik.errors.date && (
            <div className="text-red-500 text-sm mb-3">{formik.errors.date}</div>
          )}

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
      </main>
    </div>
  );
};
