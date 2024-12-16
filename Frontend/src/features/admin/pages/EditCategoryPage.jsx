import { useParams } from "react-router-dom";
import { useCategoriesStore } from "../store/useCategoriesStore";
import { useEffect, useState } from "react";
import { useFormik } from "formik";
import { categoryInitValues, categoryValidationSchema } from "../forms/category.data";
import { CustomAlerts } from "../../../shared/components";

export const EditCategoryPage = () => {
  let { id } = useParams();
  const selectedCategory = useCategoriesStore((state) => state.selectedCategory);
  const getCategory = useCategoriesStore((state) => state.getCategory);
  const editCategory = useCategoriesStore((state) => state.editCategory);
  const [alertData, setAlertData] = useState({ message: "", type: "", show: false });
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    if (fetching && id) {
      getCategory(id).then(() => {
        // validar que selectedCategory tenga datos antes de actualizar formik
        if (selectedCategory && selectedCategory.name && selectedCategory.description) {
          formik.setValues({
            id: id,
            name: selectedCategory.name || "",
            description: selectedCategory.description || "",
          });
          setFetching(false);
        }
      });
    }
  }, [fetching, id, selectedCategory]);  

  const formik = useFormik({
    initialValues: categoryInitValues(),
    validationSchema: categoryValidationSchema(),
    validateOnChange: false,
    onSubmit: (formValues) => {
      try {
        editCategory(id, formValues); // editar
        setAlertData({
          message: "Categoría actualizada correctamente.",
          type: "success",
          show: true,
        });
      } catch (error) {
        setAlertData({
          message: "Hubo un error al actualizar la categoría.",
          type: "error",
          show: true,
        });
      }
    },
  });

  return (
    <div className="container mx-auto px-6">
      <main className="flex-1 p-6">
        <h2 className="text-3xl text-white font-bold mb-6">Editar Categoría</h2>

        {/* Mostrar el alert si está habilitado */}
        {alertData.show && (
          <CustomAlerts
            message={alertData.message}
            type={alertData.type}
            onClose={() => setAlertData((prev) => ({ ...prev, show: false }))}
          />
        )}

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
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            ></textarea>
          </div>

          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Guardar Cambios
            </button>
          </div>
        </form>
      </main>
    </div>
  );
};
