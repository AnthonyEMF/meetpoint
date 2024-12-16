import { generateId } from "../utils";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

export const Pagination = ({
    totalPages,
    handleCurrentPage,
    currentPage,
    handlePreviousPage = () => {},
    hasPreviousPage,
    handleNextPage = () => {},
    hasNextPage
}) => {
  return (
    <div className="flex justify-end space-x-2">
      {/* Anterior */}
      <button
        onClick={handlePreviousPage}
        disabled={!hasPreviousPage}
        className={`bg-gray-600 text-white px-4 py-2 rounded
          ${!hasPreviousPage ? "cursor-not-allowed" : "hover:bg-gray-500"}`}
      >
          <FaArrowLeft />
      </button>

      {/* Numeración */}
      {[...Array(totalPages)].map((value, index) => (
        <button
          key={generateId()}
          onClick={() => handleCurrentPage(index + 1)}
          className={`text-white px-4 py-2 rounded
            ${currentPage === index + 1 ? "bg-gray-600 text-white" : "hover:bg-gray-500"}`}
        >
          {index + 1}
        </button>
      ))}

      {/* Siguiente */}
      <button
        onClick={handleNextPage}
        disabled={!hasNextPage}
        className={`bg-gray-600 text-white px-4 py-2 rounded
          ${!hasNextPage ? "cursor-not-allowed" : "hover:bg-gray-500"}`}
      >
        <FaArrowRight />
      </button>
    </div>
  );
};
