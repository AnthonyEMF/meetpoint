import { FaCheckCircle, FaExclamationCircle, FaInfoCircle } from "react-icons/fa";

export const CustomAlerts = ({ message, type = "info", onConfirm, onClose }) => {
    const alertStyles = {
      success: "bg-green-100 border-green-500 text-green-700",
      error: "bg-red-100 border-red-500 text-red-700",
      warning: "bg-yellow-100 border-yellow-500 text-yellow-700",
      info: "bg-blue-100 border-blue-500 text-blue-700",
    };

    const alertIcons = {
        success: <FaCheckCircle className="text-green-500" />,
        error: <FaExclamationCircle className="text-red-500" />,
        warning: <FaExclamationCircle className="text-yellow-500" />,
        info: <FaInfoCircle className="text-blue-500" />,
      };
  
    return (
      <div
        className={`flex items-center border-l-4 p-4 mb-4 rounded ${alertStyles[type]}`}
        role="alert"
      >
        {alertIcons[type]}
        <p className="ml-2">{message}</p>
        <div className="ml-auto flex space-x-4">
        {onConfirm && (
          <button
            onClick={onConfirm}
            className="px-4 py-2 text-sm text-white bg-green-500 rounded hover:bg-green-700"
          >
            Confirmar
          </button>
        )}
        {onClose && (
          <button
            onClick={onClose}
            className="ml-4 text-sm text-blue-500 hover:underline"
          >
            Cerrar
          </button>
         )}
        </div>
      </div>
  );
};