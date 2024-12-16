import { generateId } from "../../../shared/utils";

const EventItemSkeleton = () => {
    return (
        <div className="flex h-48 bg-white shadow-lg  rounded-lg animate-pulse">
            <div className="flex-grow p-6">
                <div className="h-6 bg-gray-200 mb-2 w-3/4"></div>
                <div className="h-4 bg-gray-200 mb-1 w-48"></div>
                <div className="h-4 bg-gray-200 mb-1 w-32"></div>
                <div className="h-4 bg-gray-200 mb-1 w-32"></div>
                <div className="h-4 mt-4 bg-gray-200 w-20"></div>
            </div>
            <div className="w-20 h-full">
                <div className="w-20 h-full bg-gray-200 rounded-r-lg"></div>
            </div>
        </div>
    );
}

export const EventListSkeleton = ({size = 6}) => {
    return (
        <div className="flex-1">
          <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-6">
            {[...Array(size)].map(() => (
                <EventItemSkeleton key={generateId()}/>
            ))}
          </div>
        </div>
    );
};
