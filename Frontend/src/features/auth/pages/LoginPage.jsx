import { MdEmail } from "react-icons/md";
import { ImLock } from "react-icons/im";
import { Link } from "react-router-dom";
import { Loading } from "../../../shared/components";
import { useLogin } from "../hooks/useLogin";

export const LoginPage = () => {
  const { formik, loading, error, message } = useLogin();
  
  // Pantalla de carga
  if (loading) {
    <Loading />;
  }

  return (
    <div className="flex items-center justify-center h-full mt-8">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-xl font-semibold mb-6 text-center">
          Iniciar Sesión
        </h1>
        {/* Formulario de Ingreso */}
        <div>
          <form onSubmit={formik.handleSubmit} className="space-y-4">
            {/* Email */}
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

            {/* Botón de Ingresar */}
            <div className="flex justify-center">
              <button
                type="submit"
                className="w-full bg-blue-500 text-white hover:bg-blue-600 p-2 rounded-md"
              >
                Ingresar
              </button>
            </div>

            {/* Enlace de Registro */}
            <Link
              to="/security/register"
              className="flex justify-center text-blue-500 underline"
            >
              Registrarse
            </Link>
          </form>
        </div>

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
