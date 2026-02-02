import { MdEmail, MdLocationOn } from "react-icons/md";
import { Link } from "react-router-dom";
import { ImLock } from "react-icons/im";
import { FaUser } from "react-icons/fa";
import { Loading } from "../../../shared/components";
import { useRegister } from "../hooks/useRegister";

export const RegisterPage = () => {
  const { formik, loading, error, message } = useRegister();

  // Pantalla de carga
  if (loading) {
    <Loading />;
  }

  return (
    <div className="flex items-center justify-center h-full mt-8 mb-8">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-xl font-semibold mb-6 text-center">Registrarse</h1>

        {/* Formulario de registro */}
        <form onSubmit={formik.handleSubmit} className="space-y-4">
          {/* Primer nombre */}
          <div>
            <div className="flex items-center mb-1">
              <FaUser className="mr-2" />
              <input
                type="text"
                name="firstName"
                id="firstName"
                value={formik.values.firstName}
                onChange={formik.handleChange}
                placeholder="Primer nombre"
                className="border w-full p-2 rounded-md"
              />
            </div>
            {formik.touched.firstName && formik.errors.firstName && (
              <div className="text-red-500 text-xs mt-1">
                {formik.errors.firstName}
              </div>
            )}
          </div>

          {/* Segundo nombre */}
          <div>
            <div className="flex items-center mb-1">
              <FaUser className="mr-2" />
              <input
                type="text"
                name="lastName"
                id="lastName"
                value={formik.values.lastName}
                onChange={formik.handleChange}
                placeholder="Segundo nombre"
                className="border w-full p-2 rounded-md"
              />
            </div>
            {formik.touched.lastName && formik.errors.lastName && (
              <div className="text-red-500 text-xs mt-1">
                {formik.errors.lastName}
              </div>
            )}
          </div>

          {/* Locación */}
          <div>
            <div className="flex items-center mb-1">
              <MdLocationOn className="mr-2" />
              <input
                type="text"
                name="location"
                id="location"
                value={formik.values.location}
                onChange={formik.handleChange}
                placeholder="Locación"
                className="border w-full p-2 rounded-md"
              />
            </div>
            {formik.touched.location && formik.errors.location && (
              <div className="text-red-500 text-xs mt-1">
                {formik.errors.location}
              </div>
            )}
          </div>

          {/* Correo */}
          <div>
            <div className="flex items-center mb-1">
              <MdEmail className="mr-2" />
              <input
                type="email"
                name="email"
                id="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                placeholder="Correo electrónico"
                className="border w-full p-2 rounded-md"
              />
            </div>
            {formik.touched.email && formik.errors.email && (
              <div className="text-red-500 text-xs mt-1">
                {formik.errors.email}
              </div>
            )}
          </div>

          {/* Contraseña */}
          <div>
            <div className="flex items-center mb-1">
              <ImLock className="mr-2" />
              <input
                type="password"
                name="password"
                id="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                placeholder="Contraseña"
                className="border w-full p-2 rounded-md"
              />
            </div>
            {formik.touched.password && formik.errors.password && (
              <div className="text-red-500 text-xs mt-1">
                {formik.errors.password}
              </div>
            )}
          </div>

          {/* Confirmar contraseña */}
          <div>
            <div className="flex items-center mb-1">
              <ImLock className="mr-2" />
              <input
                type="password"
                name="confirmPassword"
                id="confirmPassword"
                value={formik.values.confirmPassword}
                onChange={formik.handleChange}
                placeholder="Confirmar contraseña"
                className="border w-full p-2 rounded-md"
              />
            </div>
            {formik.touched.confirmPassword &&
              formik.errors.confirmPassword && (
                <div className="text-red-500 text-xs mt-1">
                  {formik.errors.confirmPassword}
                </div>
              )}
          </div>

          {/* Botón de ingresar */}
          <button
            type="submit"
            className="flex justify-center text-center bg-blue-500 text-white hover:bg-blue-600 p-2 rounded-md w-full"
          >
            Ingresar
          </button>

          {/* Ruta para la página de login */}
          <Link
            to="/security/login"
            className="flex justify-center text-blue-500 underline"
          >
            Iniciar Sesión
          </Link>
        </form>

        {/* Mensaje de Error */}
        {error && (
          <span className="flex justify-center text-red-500 text-center pt-4">
            {message}
          </span>
        )}
      </div>
    </div>
  );
};
