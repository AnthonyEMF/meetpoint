import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { useFormik } from "formik";
import { loginInitValues, loginValidationSchema } from "../forms/login.data";

export function useLogin() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const validateAuthentication = useAuthStore((state) => state.validateAuthentication);
  const login = useAuthStore((state) => state.login);
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
    initialValues: loginInitValues,
    validationSchema: loginValidationSchema,
    validateOnChange: true,
    onSubmit: async (formValues) => {
      setLoading(true);
      await login(formValues);
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
