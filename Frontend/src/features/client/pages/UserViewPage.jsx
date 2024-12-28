import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { formatDate } from "../../../shared/utils";
import { useAuthStore } from "../../security/store";
import { ProtectedComponent, StarRating } from "../../../shared/components";
import { rolesListConstant } from "../../../shared/constants";
import { IoStatsChart } from "react-icons/io5";
import { useUsersStore } from "../../admin/store/useUsersStore";
import { RiDeleteBin5Fill, RiEdit2Fill } from "react-icons/ri";
import { MdOutlineWorkspacePremium } from "react-icons/md";
import { useReportsStore } from "../store/useReportsStore";
import { IoMdInformationCircleOutline } from "react-icons/io";
import { useFormik } from "formik";
import { reportInitValues, reportValidationSchema } from "../forms/report.data";
import Swal from "sweetalert2";

export const UserViewPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [fetching, setFetching] = useState(true);

  // Funciones de usuarios y reportes
  const { user, loadUserById } = useUsersStore();
  const { deleteUser } = useUsersStore();
  const { createReport, isSubmitting } = useReportsStore();
  const getUserId = useAuthStore((state) => state.getUserId);
  const loggedUserId = getUserId(); // id del usuario en sesión

  useEffect(() => {
    if (fetching) {
      loadUserById(id);
      setFetching(false);
    }
  }, [fetching, loadUserById, loggedUserId]);

  // Verificar si el usuario en sesión ya ha reportado al usuario
  const hasReported = user?.data?.reports?.some(
    (report) => report.reporterId === loggedUserId
  );

  // Eliminar usuario
  const handleDeleteUser = async () => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "Esta acción eliminará el usuario de forma permanente",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "No, cancelar",
      reverseButtons: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deleteUser(id); // Llamada al servicio de eliminación
          Swal.fire({
            title: "¡Eliminado!",
            text: "El usuario ha sido eliminado correctamente",
            icon: "success",
            confirmButtonText: "OK",
          });
          navigate("/administration/users-list");
        } catch (error) {
          Swal.fire({
            title: "Error",
            text: "No se pudo eliminar el usuario. Intenta nuevamente",
            icon: "error",
            confirmButtonText: "OK",
          });
        }
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire({
          title: "Cancelado",
          text: "El usuario no fue eliminado",
          icon: "info",
          confirmButtonText: "OK",
        });
      }
    });
  };

  // Manejo del formulario con Formik (Reportes)
  const formik = useFormik({
    initialValues: reportInitValues,
    validationSchema: reportValidationSchema,
    validateOnChange: true,
    onSubmit: async (formValues) => {
      // Asignar id del usuario que esta siendo reportado
      formValues.organizerId = id;

      // Crear el nuevo reporte
      await createReport(formValues);
      Swal.fire({
        title: "Usuario reportado correctamente",
        text: "Los administradores se encargarán de atender tu reporte",
        icon: "success",
        confirmButtonText: "OK",
      }).then(() => {
        loadUserById(id);
      });

      validateAuthentication();
    },
  });

  return (
    <div className="container mx-auto p-6">
      {/* Información de Usuario */}
      <div className="bg-white shadow-lg rounded-lg p-6 mb-4 flex items-center justify-between">
        <div className="flex items-center">
          <div className="mr-8">
            <img
              className="w-32 h-32 rounded-full"
              src="https://static.vecteezy.com/system/resources/previews/009/292/244/non_2x/default-avatar-icon-of-social-media-user-vector.jpg"
              alt="Profile"
            />
          </div>
          <div>
            <h2 className="text-2xl flex font-semibold">
              {user?.data?.firstName} {user?.data?.lastName}
              {user?.data?.membership && ( // Mostrar insignia de usuario premium
                <MdOutlineWorkspacePremium
                  size={32}
                  className="text-yellow-500 ml-1"
                />
              )}
            </h2>
            <p className="py-1 text-gray-700">{user?.data?.email}</p>
            <p className="text-gray-700">{user?.data?.location}</p>
            <div className="mt-2 flex items-center">
              <StarRating rating={user?.data?.averageRating || 0} />
              <IoStatsChart size={14} className="text-gray-700 mt-1 mx-1" />
              <span className="text-base text-gray-700">
                ({user?.data?.ratingsCount})
              </span>
            </div>
          </div>
        </div>
        <div className="ml-auto">
          {/* Restringir botones de eliminar y editar solo para administración */}
          <ProtectedComponent requiredRoles={[rolesListConstant.ADMIN]}>
            <Link to={`/administration/user/edit/${id}`}>
              <button className="flex items-center justify-center bg-blue-600 text-white w-full my-1 mb-4 py-2 px-10 rounded hover:bg-blue-500">
                <RiEdit2Fill className="mr-2" size={18} />
                Editar Usuario
              </button>
            </Link>
            {loggedUserId != id && (
              <button
                className="flex items-center justify-center bg-red-600 text-white w-full my-1 py-2 px-10 rounded hover:bg-red-500"
                onClick={handleDeleteUser}
              >
                <RiDeleteBin5Fill className="mr-2" size={18} />
                Eliminar Usuario
              </button>
            )}
          </ProtectedComponent>
        </div>
      </div>

      {/* Eventos */}
      <div className="flex justify-between gap-4">
        {/* Eventos Organizados */}
        <div className="w-full">
          <h2 className="text-2xl text-white mb-4 font-semibold">
            Eventos Organizados
          </h2>
          <div className="bg-white shadow-lg rounded-lg p-4">
            {user?.data?.organizedEvents?.length > 0 ? (
              user.data.organizedEvents.map((event) => (
                <Link
                  to={`/main/event/${event.id}`}
                  key={event.id}
                  className="flex justify-between p-3 rounded-md transition-colors duration-200 hover:text-white hover:bg-gray-600"
                >
                  <div className="flex-1">
                    <h3 className="text-xl font-bold">{event.title}</h3>
                    <p>{event.categoryName}</p>
                  </div>
                  <div className="flex-1 text-right">
                    <p>{formatDate(event.date)}</p>
                  </div>
                </Link>
              ))
            ) : (
              <p className="text-center text-gray-600">
                No hay eventos organizados aún.
              </p>
            )}
          </div>
        </div>

        {/* Eventos Registrados (Asistencias) */}
        <div className="w-full">
          <h2 className="text-2xl text-white mb-4 font-semibold">
            Eventos Registrados
          </h2>
          <div className="bg-white shadow-lg rounded-lg p-4">
            {user?.data?.attendances?.length > 0 ? (
              user.data.attendances.map((attendance) => (
                <Link
                  to={`/main/event/${attendance.eventId}`}
                  key={attendance.id}
                  className="flex justify-between p-3 rounded-md transition-colors duration-200 hover:text-white hover:bg-gray-600"
                >
                  <div className="flex-1">
                    <h3 className="text-xl font-bold">
                      {attendance.eventTitle}
                    </h3>
                  </div>
                  <div className="flex text-right">
                    <div
                      className={`font-bold rounded-2xl px-3 py-1 text-white ${
                        attendance.state === "CONFIRMADO"
                          ? "bg-green-500"
                          : attendance.state === "PENDIENTE"
                          ? "bg-yellow-500"
                          : "bg-red-500"
                      }`}
                    >
                      {attendance.state}
                    </div>
                  </div>
                </Link>
              ))
            ) : (
              <p className="text-center text-gray-600">
                No estás registrado en ningún evento.
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Sección para reportar usuario */}
      {loggedUserId !== id && ( // Validar que no se pueda reportar a si mismo
        <div>
          {hasReported ? (
            <h2 className="flex items-center justify-center text-xl py-2 mt-6 font-semibold rounded-lg bg-red-500 text-center text-white">
              <IoMdInformationCircleOutline size={23} className="mr-1" />
              El usuario ha sido reportado, pronto tomaremos acciones al
              respecto
            </h2>
          ) : (
            <form onSubmit={formik.handleSubmit}>
              <h2 className="text-2xl text-white mt-4 font-semibold">
                Reportar usuario
              </h2>
              <div>
                {/* Motivo del reporte */}
                <textarea
                  className="w-full p-4 border rounded-lg mt-4 outline-none"
                  placeholder="Escribe el motivo del reporte..."
                  rows="4"
                  id="reason"
                  name="reason"
                  value={formik.values.reason}
                  onChange={formik.handleChange}
                />
                {/* Botón de reportar */}
                <div className="flex items-center">
                <button
                  className="w-1/5 my-2 py-2 px-4 font-semibold bg-red-500 text-white rounded-lg hover:bg-red-700"
                  type="submit"
                  disabled={isSubmitting}
                >
                  Reportar
                </button>
                {formik.touched.reason && formik.errors.reason && (
                  <div className="flex items-center justify-center bg-red-500 px-2 py-1 ml-2 rounded-full text-white font-semibold">
                    <IoMdInformationCircleOutline size={18} className="mr-1" />
                    {formik.errors.reason}
                  </div>
                )}
                </div>
              </div>
            </form>
          )}
        </div>
      )}
    </div>
  );
};
