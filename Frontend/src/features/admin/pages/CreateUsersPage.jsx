import { useUsersStore } from "../store/useUsersStore";
import { useFormik } from "formik";
import { userInitValues, userValidationSchema } from "../forms/user.data";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export const CreateUsersPage = () => {
  const createUser = useUsersStore((state) => state.createUser);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: userInitValues(),
    validationSchema: userValidationSchema(),
    validateOnChange: false,
    onSubmit: async (formValues) => {
      try {
        await createUser(formValues);
        Swal.fire({
          title: "¡Éxito!",
          text: "Usuario creado correctamente",
          icon: "success",
          confirmButtonText: "OK",
        }).then(() => {
          navigate("/administration/users-list");
        });
      } catch (error) {
        Swal.fire({
          title: "Error",
          text: "Ocurrió un problema al crear usuario. Intenta nuevamente",
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    },
  });

  return (
    <div className="container mx-auto px-6">
      <main className="flex-1 p-6">
        <h2 className="text-3xl text-white font-bold mb-6">Crear Usuario</h2>

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
            <div className="text-red-500 text-sm mb-2">
              {formik.errors.firstName}
            </div>
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
            <div className="text-red-500 text-sm mb-2">
              {formik.errors.lastName}
            </div>
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
            <div className="text-red-500 text-sm mb-2">
              {formik.errors.location}
            </div>
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
            <div className="text-red-500 text-sm mb-2">
              {formik.errors.email}
            </div>
          )}

          <div className="mb-2">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Contraseña
            </label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="Contraseña"
              value={formik.values.password}
              onChange={formik.handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          {formik.touched.password && formik.errors.password && (
            <div className="text-red-500 text-sm mb-2">
              {formik.errors.password}
            </div>
          )}

          <div className="mb-2">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Confirmar Contraseña
            </label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              placeholder="Confirmar Contraseña"
              value={formik.values.confirmPassword}
              onChange={formik.handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          {formik.touched.confirmPassword && formik.errors.confirmPassword && (
            <div className="text-red-500 text-sm mb-2">
              {formik.errors.confirmPassword}
            </div>
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
              <option value="">Seleccionar rol</option>
              <option value="ADMIN">Administrador</option>
              <option value="USER">Usuario</option>
            </select>
          </div>
          {formik.touched.role && formik.errors.role && (
            <div className="text-red-500 text-sm mb-2">
              {formik.errors.role}
            </div>
          )}

          <div className="flex items-center justify-center">
            <button
              type="submit"
              className="w-80 mt-4 bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline hover:bg-blue-700"
            >
              Crear Usuario
            </button>
          </div>
        </form>
      </main>
    </div>
  );
};
