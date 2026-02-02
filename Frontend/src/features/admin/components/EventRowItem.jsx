import { FaRegComment } from "react-icons/fa";
import { MdOutlinePlaylistAddCheck } from "react-icons/md";
import { Link } from "react-router-dom";
import { formatDateShort } from "../../../shared/utils";

export const EventRowItem = ({ event }) => {
  return (
    <tr key={event.id}>
      <td className="px-6 py-4 text-sm font-medium text-gray-900">
        {event.title}
      </td>
      <td className="px-6 py-4 text-sm text-gray-500">{event.categoryName}</td>
      <td className="px-6 py-4 text-sm text-gray-500">{event.organizerName}</td>
      <td className="px-6 py-4 text-sm text-gray-500">
        {formatDateShort(event.date)}
      </td>
      <td className="px-6 py-4 text-sm text-gray-500 ">
        <div className="flex justify-center">
          <FaRegComment className="mt-1 mr-1" /> {event.commentsCount}
        </div>
      </td>
      <td className="px-6 py-4 text-sm text-gray-500 ">
        <div className="flex justify-center">
          <MdOutlinePlaylistAddCheck size={17} className="mt-1 mr-1" />{" "}
          {event.attendancesCount}
        </div>
      </td>
      <td className="px-6 py-4 text-sm font-medium">
        <Link
          to={`/main/event/${event.id}`}
          className="text-blue-600 hover:text-blue-800"
        >
          Ver detalles
        </Link>
      </td>
    </tr>
  );
};
