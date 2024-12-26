import { FaRegComment } from "react-icons/fa";
import { MdOutlinePlaylistAddCheck } from "react-icons/md";
import { Link } from "react-router-dom";

export const EventDashboardRowItem = ({ events = [] }) => {
  return (
    <div className="space-y-4">
      {events.map((event) => (
        <div key={event.id}>
          <Link
            to={`/main/event/${event.id}`}
            className="p-4 bg-gray-100 rounded shadow flex justify-between items-center hover:bg-gray-200"
          >
            <div>
              <p className="font-medium max-w-[200px] text-ellipsis overflow-hidden whitespace-nowrap text-gray-700">
                {event.title}
              </p>
              <p className="text-sm max-w-[220px] text-ellipsis text-gray-500">{event.description}</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center text-gray-500 text-sm">
                <FaRegComment className="w-5 h-5 mr-1" />
                {event.commentsCount}
              </div>
              <div className="flex items-center text-gray-500 text-sm">
                <MdOutlinePlaylistAddCheck className="w-5 h-5 mr-1" />
                {event.attendancesCount}
              </div>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
};
