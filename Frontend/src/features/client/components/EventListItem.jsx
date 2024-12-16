import { useNavigate } from "react-router-dom";
import { formatDate } from "../../../shared/utils";
import { useAuthStore } from "../../security/store";
import { FaRegCalendarXmark } from "react-icons/fa6";
import { FaRegCalendarCheck } from "react-icons/fa";

// Imágenes por defecto para cada Categoría
const categoryImages = {
  Música:
    "https://images.unsplash.com/photo-1520166012956-add9ba0835cb?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  Deportes:
    "https://images.unsplash.com/photo-1547941126-3d5322b218b0?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "Arte y Cultura":
    "https://plus.unsplash.com/premium_photo-1661894448777-7c94a7d9b0a2?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  Tecnología:
    "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  Social:
    "https://images.unsplash.com/photo-1578357078586-491adf1aa5ba?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "Otros...":
    "https://plus.unsplash.com/premium_photo-1683141020395-7cf0d265ecbc?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
};

export const EventListItem = ({ event }) => {
  const navigate = useNavigate();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  const handleCardClick = () => {
    navigate(`/main/event/${event.id}`);
  };

  return (
    <div
      key={event.id}
      onClick={handleCardClick}
      className="bg-white shadow-lg rounded-lg flex transition-transform transform duration-200 hover:scale-105 hover:cursor-pointer"
    >
      <div className="flex-grow p-6">
        <h3 className="text-xl font-bold mb-2">{event.title}</h3>
        <p className="text-gray-600 mb-1">{formatDate(event.date)}</p>

        {isAuthenticated && ( // Mostrar si esta autenticado
          <p className="text-gray-600 mb-1">{event.ubication}</p>
        )}

        <p className="text-gray-600">{event.categoryName}</p>

        {isAuthenticated && ( // Mostrar si esta autenticado
          <p className="mt-4 inline-block text-blue-800 text-sm">
            Organizado por{" "}
            <span className="font-bold">{event.organizerName}</span>
          </p>
        )}

        {/* Mostrar estado del evento */}
        {new Date(event.date) < new Date() ? (
          <p className="mt-2 font-bold text-base text-red-600">
            <span className="flex">
              <FaRegCalendarXmark size={17} className="mr-1 mt-1" />
              El evento ya ha finalizado
            </span>
          </p>
        ) : (
          <p className="mt-2 font-bold text-base text-green-600">
            <span className="flex">
              <FaRegCalendarCheck size={17} className="mr-1 mt-1" />
              El evento sigue en vigencia
            </span>
          </p>
        )}
      </div>
      <div className="w-20 h-full">
        <img
          src={categoryImages[event.categoryName]}
          alt={event.categoryName}
          className="w-full h-full object-cover rounded-r-lg"
        />
      </div>
    </div>
  );
};
