import { useFormik } from "formik";
import { categoryInitValues, categoryValidationSchema } from "../forms/category.data";
import { useCategoriesStore } from "../store/useCategoriesStore";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export const CreateCategoriesPage = () => {
  const createCategory = useCategoriesStore((state) => state.createCategory);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: categoryInitValues(),
    validationSchema: categoryValidationSchema(),
    validateOnChange: false,
    onSubmit: async (formValues) => {
      try {
        await createCategory(formValues);
        Swal.fire({
          title: "¡Éxito!",
          text: "Categoría creada correctamente",
          icon: "success",
          confirmButtonText: "OK",
        }).then(() => {
          navigate("/administration/categories-list");
        });
      } catch (error) {
        Swal.fire({
          title: "Error",
          text: "Ocurrió un problema al crear la categoría. Intenta nuevamente",
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    },
  });

  return (
    <div className="container mx-auto px-6">
      <main className="flex-1 p-6">
        <h2 className="text-3xl text-white font-bold mb-6">Crear Categoría</h2>

        <form
          onSubmit={formik.handleSubmit}
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        >
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="name"
            >
              Nombre de la Categoría
            </label>
            <input
              id="name"
              name="name"
              type="text"
              placeholder="Nombre"
              value={formik.values.name}
              onChange={formik.handleChange}
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
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
              placeholder="Descripción de la categoría"
              value={formik.values.description}
              onChange={formik.handleChange}
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            ></textarea>
          </div>

          <div className="flex items-center justify-center">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-8 rounded focus:outline-none focus:shadow-outline"
            >
              Crear Categoría
            </button>
          </div>
        </form>
      </main>
    </div>
  );
};
