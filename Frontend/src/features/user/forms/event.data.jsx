import * as Yup from 'yup';

export const eventInitValues = {
    title: '',
    categoryId: '',
    description: '',
    ubication: '',
    date: '',
}

export const eventValidationSchema = Yup.object ({
    title: Yup.string()
        .required('El título es requerido.'),
    categoryId: Yup.string()
        .required('La categoría es requerida.'),
    description: Yup.string()
        .required('La descripción es requerida.'),
    ubication: Yup.string()
        .required('La ubicación es requerida.'),
    date: Yup.date()
        .required('La fecha de realización es requerida.')
        .min(new Date(), 'La fecha debe ser mayor que la fecha actual.')
})