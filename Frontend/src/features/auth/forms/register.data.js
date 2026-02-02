import * as Yup from "yup";

// Campos del formulario
export const registerInitValues = {
  firstName: "",
  lastName: "",
  location: "",
  email: "",
  password: "",
  confirmPassword: "",
};

// Validación de los campos
export const registerValidationSchema = Yup.object({
  firstName: Yup.string().required("El primer nombre es requerido."),
  lastName: Yup.string().required("El segundo nombre es requerido."),
  location: Yup.string().required("La locación es requerida."),
  email: Yup.string()
    .required("El correo electrónico es requerido.")
    .email("Ingrese un correo electrónico valido."),
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
