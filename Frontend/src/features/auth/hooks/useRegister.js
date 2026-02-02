import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuthStore } from "../store";
import { useFormik } from "formik";
import { registerInitValues, registerValidationSchema } from "../forms/register.data";

export function useRegister() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const validateAuthentication = useAuthStore((state) => state.validateAuthentication);
  const register = useAuthStore((state) => state.register);
  const error = useAuthStore((state) => state.error);
  const message = useAuthStore((state) => state.message);

  // Si se válida la autenticación (isAuthenticated = true) redireccionar la página
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/main");
    }
  }, [isAuthenticated]);

  // Manejo del formulario con Formik
  const formik = useFormik({
    initialValues: registerInitValues,
    validationSchema: registerValidationSchema,
    validateOnChange: true,
    onSubmit: async (formValues) => {
      setLoading(true);
      await register(formValues);
      validateAuthentication();
      setLoading(false);
    },
  });

  return {
    formik,
    loading,
    error,
    message,
  };
}
