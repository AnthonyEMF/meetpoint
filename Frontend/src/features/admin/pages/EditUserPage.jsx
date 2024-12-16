import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CustomAlerts } from "../../../shared/components";
import { useUsersStore } from "../store/useUsersStore";
import { useFormik } from "formik";
import { userInitValues, userValidationSchema } from "../forms/user.data";

export const EditUserPage = () => {
  let { id } = useParams();
  const selectedUser = useUsersStore((state) => state.selectedUser);
  const getUser = useUsersStore((state) => state.getUser);
  const editUser = useUsersStore((state) => state.editUser);
  const [fetching, setFetching] = useState(true);
  const [alertData, setAlertData] = useState({ message: "", type: "", show: false }); // Estado del alert

  useEffect(() => {
    if (fetching && id) {
      getUser(id).then(() => {
        if (selectedUser && selectedUser.firstName && selectedUser.lastName && selectedUser.location && selectedUser.email) {
          formik.setValues({
            id: id,
            firstName: selectedUser.firstName || "",
            lastName: selectedUser.lastName || "",
            location: selectedUser.location || "",
            email: selectedUser.email || "",
            role: selectedUser.role || "",
            password: selectedUser.password || "",
          });
          setFetching(false);
        }
      });
    }
  }, [fetching, id, selectedUser]);  

  const formik = useFormik({
    initialValues: userInitValues(),
    validationSchema: userValidationSchema(),
    validateOnChange: false,
    onSubmit: (formValues) => {
      try {
        editUser(id, formValues);
        setAlertData({
          message: "Usuario actualizado correctamente.",
          type: "success",
          show: true,
        });
      } catch (error) {
        setAlertData({
          message: "Hubo un error al actualizar el usuario.",
          type: "error",
          show: true,
        });
      }
    },
  });

  return (
    <div className="container mx-auto px-6">
      <main className="flex-1 p-6">
        <h2 className="text-3xl text-white font-bold mb-6">Editar Usuario</h2>

        <form
          onSubmit={formik.handleSubmit}
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        >
          <div className="mb-2">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="firstName"
            >
              Primer Nombre
            </label>
            <input
              id="firstName"
              name="firstName"
              type="text"
              placeholder="Primer Nombre"
              value={formik.values.firstName}
              onChange={formik.handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          {formik.touched.firstName && formik.errors.firstName && (
            <div className="text-red-500 text-sm mb-2">{formik.errors.firstName}</div>
          )}

          <div className="mb-2">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="lastName"
            >
              Segundo Nombre
            </label>
            <input
              id="lastName"
              name="lastName"
              type="text"
              placeholder="Segundo Nombre"
              value={formik.values.lastName}
              onChange={formik.handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          {formik.touched.lastName && formik.errors.lastName && (
            <div className="text-red-500 text-sm mb-2">{formik.errors.lastName}</div>
          )}

          <div className="mb-2">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="location"
            >
              Locación
            </label>
            <input
              id="location"
              name="location"
              type="text"
              placeholder="Locación"
              value={formik.values.location}
              onChange={formik.handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          {formik.touched.location && formik.errors.location && (
            <div className="text-red-500 text-sm mb-2">{formik.errors.location}</div>
          )}

          <div className="mb-2">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Correo Electrónico
            </label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="Correo Electrónico"
              value={formik.values.email}
              onChange={formik.handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          {formik.touched.email && formik.errors.email && (
            <div className="text-red-500 text-sm mb-2">{formik.errors.email}</div>
          )}

          <div className="mb-2">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Nueva Contraseña
            </label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="Nueva Contraseña"
              value={formik.values.password}
              onChange={formik.handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          {formik.touched.password && formik.errors.password && (
            <div className="text-red-500 text-sm mb-2">{formik.errors.password}</div>
          )}

          <div className="mb-2">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="role"
            >
              Rol
            </label>
            <select
              id="role"
              name="role"
              value={formik.values.role}
              onChange={formik.handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            >
              <option value="">Seleccionar</option>
              <option value="ADMIN">Administrador</option>
              <option value="USER">Usuario</option>
            </select>
          </div>
          {formik.touched.role && formik.errors.role && (
            <div className="text-red-500 text-sm mb-2">{formik.errors.role}</div>
          )}

          <div className="flex items-center justify-center">
            <button
              type="submit"
              className="w-80 bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline hover:bg-blue-700"
            >
              Actualizar Usuario
            </button>
          </div>
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
