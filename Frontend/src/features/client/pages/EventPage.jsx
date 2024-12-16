import { formatDate } from "../../../shared/utils";
import { useEvents } from "../hooks";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Attendances, Comments, EventPageSkeleton } from "../components";
import { useAuthStore } from "../../security/store";
import { CustomAlerts, ProtectedComponent } from "../../../shared/components";
import { FaRegCalendarXmark } from "react-icons/fa6";
import { FaRegCalendarCheck } from "react-icons/fa";
import { rolesListConstant } from "../../../shared/constants";
import { RiDeleteBin5Fill, RiEdit2Fill } from "react-icons/ri";

export const EventPage = () => {
  const { id } = useParams();
  const { event, loadEventById, deleteEvent, isLoading } = useEvents();
  const [fetching, setFetching] = useState(true);
  const navigate = useNavigate();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  // Obtener id del usuario en sesión
  const getUserId = useAuthStore((state) => state.getUserId);
  const loggedUserId = getUserId();

  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    if (fetching) {
      if (id) {
        loadEventById(id);
        setFetching(false);
      }
    }
  }, [fetching]);
  
  if (!event || !event.data) {
    return <div>Evento no encontrado.</div>;
  }
  
  // Verificar si el usuario en sesión es el organizador del evento
  const isOrganizer = loggedUserId === event.data.organizerId;
  

  // Editar el evento
  const handleEditEvent = () => {
    navigate(`/main/event/edit/${id}`);
  };

  // Eliminación del evento
  const handleDeleteEvent = async () => {
    setShowAlert(true); // Mostrar alerta personalizada
  };

  const confirmDeleteEvent = async () => {
    await deleteEvent(event.data.id);
    setShowAlert(false); // Ocultar alerta
    navigate("/main");
  };

  const handleAttendancesChange = async () => {
    await loadEventById(id);
  };

  const handleCommentsChange = async () => {
    await loadEventById(id);
  };

  return (
    <div className="container mx-auto p-6">
      {showAlert && (
        <CustomAlerts
          message="¿Está seguro de que desea eliminar este evento?"
          type="warning"
          onConfirm={confirmDeleteEvent}
          onClose={() => setShowAlert(false)}
        />
      )}

      {/* Información del Evento */}
      {isLoading ? (
        <EventPageSkeleton />
      ) : (
        <div className="bg-white shadow-lg rounded-lg p-6 mb-6 flex">
          {/* Contenedor Izquierdo */}
          <div className="w-full md:w-70">
            <h1 className="text-3xl font-bold mb-2">{event.data.title}</h1>
            <p className="text-xl mb-4">{event.data.description}</p>
            {isAuthenticated && (
              <p className="mb-2">
                <span className="font-bold">Ubicación:</span>{" "}
                {event.data.ubication}
              </p>
            )}
            <p>
              <span className="font-bold">Fecha del Evento:</span>{" "}
              {formatDate(event.data.date)}
            </p>
            {/* Mostrar estado del evento */}
            {new Date(event.data.date) < new Date() ? (
              <p className="mt-2 font-bold text-lg text-red-600">
                <span className="flex">
                  <FaRegCalendarXmark size={20} className="mr-1 mt-1" />
                  El evento ya ha finalizado
                </span>
              </p>
            ) : (
              <p className="mt-2 font-bold text-lg text-green-600">
                <span className="flex">
                  <FaRegCalendarCheck size={20} className="mr-1 mt-1" />
                  El evento sigue en vigencia
                </span>
              </p>
            )}
          </div>
          {/* Contenedor Derecho */}
          <div className="w-full md:w-30 md:pl-4 flex flex-col items-end">
            {isAuthenticated && (
              <p className="mb-1 self-end">
                Organizado por{" "}
                <Link to={event.data.organizerId === loggedUserId ? "/user" : `/user/view/${event.data.organizerId}`}>
                  <span className="font-bold">{event.data.organizerName}</span>
                </Link>
                {/* Rating de estrellas */}
                {/* <div className="flex justify-center items-center">
                  <StarRating rating={user?.data?.averageRating || 0} />
                  <IoStatsChart size={14} className="text-gray-700 mt-1 mx-1" />
                  <span className="text-base text-gray-700">({user?.data?.ratingsCount})</span>
                </div> */}
              </p>
            )}

            {/* Mostrar botones para el organizador */}
            {isOrganizer && (
              <div>
                <button
                  className="flex items-center justify-center w-full my-2 mr-2 px-14 py-2 bg-blue-600 text-white rounded hover:bg-blue-500"
                  onClick={handleEditEvent}
                >
                  <RiEdit2Fill className="mr-2" size={18} />
                  Editar Evento
                </button>
                <button
                  className="flex items-center justify-center w-full my-2 px-14 py-2 bg-red-600 text-white rounded hover:bg-red-500"
                  onClick={handleDeleteEvent}
                >
                  <RiDeleteBin5Fill className="mr-2" size={18} />
                  Eliminar Evento
                </button>
              </div>
            )}

            {/* Mostrar botones para el administrador */}
            <ProtectedComponent requiredRoles={[rolesListConstant.ADMIN]}>
              {!isOrganizer && (
                <div>
                  <button
                    className="flex items-center justify-center w-full my-2 mr-2 px-14 py-2 bg-blue-600 text-white rounded hover:bg-blue-500"
                    onClick={handleEditEvent}
                  >
                    <RiEdit2Fill className="mr-2" size={18} />
                    Editar Evento
                  </button>
                  <button
                    className="flex items-center justify-center w-full my-2 px-14 py-2 bg-red-600 text-white rounded hover:bg-red-500"
                    onClick={handleDeleteEvent}
                  >
                    <RiDeleteBin5Fill className="mr-2" size={18} />
                    Eliminar Evento
                  </button>
                </div>
              )}
            </ProtectedComponent>

            <div className="text-white bg-orange-500 rounded-3xl px-10 py-2 mt-auto">
              {event.data.categoryName}
            </div>
          </div>
        </div>
      )}

      {/* Lista de Asistentes */}
      <Attendances
        event={event}
        handleAttendancesChange={handleAttendancesChange}
      />

      {/* Sección de Comentarios */}
      <Comments event={event} handleCommentsChange={handleCommentsChange} />
    </div>
  );
};
