import * as Yup from "yup";

export const userInitValues = () => ({
  id: "",
  firstName: "",
  lastName: "",
  location: "",
  email: "",
  role: "",
  password: "",
  confirmPassword: "",
});

export const userValidationSchema = () =>
  Yup.object().shape({
    firstName: Yup.string().required("El primer nombre es obligatorio."),
    lastName: Yup.string().required("El segundo nombre es obligatorio."),
    location: Yup.string().required("La locación es obligatoria."),
    email: Yup.string()
      .email("Correo electrónico no válido.")
      .required("El correo electrónico es obligatorio."),
    role: Yup.string()
      .oneOf(["ADMIN", "USER"], "El rol debe ser 'ADMIN' o 'USER'.")
      .required("El rol es obligatorio."),
    password: Yup.string()
      .required("La contraseña es requerida.")
      .min(8, "La contraseña debe tener al menos 8 caracteres.")
      .matches(
        /[a-z]/,
        "La contraseña debe contener al menos una letra minúscula.",
      )
      .matches(
        /[A-Z]/,
        "La contraseña debe contener al menos una letra mayúscula.",
      )
      .matches(/\d/, "La contraseña debe contener al menos un número.")
      .matches(
        /[@$!%*?&#]/,
        "La contraseña debe contener al menos un carácter especial.",
      ),
    confirmPassword: Yup.string()
      .required("Confirmar la contraseña es requerido.")
      .oneOf([Yup.ref("password"), null], "Las contraseñas deben coincidir."),
  });
