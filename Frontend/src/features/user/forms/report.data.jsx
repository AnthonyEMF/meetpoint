import * as Yup from 'yup';

export const reportInitValues = {
    reporterName: '',
    organizerId: '',
    organizerName: '',
    reason: '',
    reportDate: '',
}

export const reportValidationSchema = Yup.object ({
    reason: Yup.string()
        .required('El motivo del reporte es requerido')
        .min(10, 'El motivo del reporte debe tener al menos 10 caracteres'),
})