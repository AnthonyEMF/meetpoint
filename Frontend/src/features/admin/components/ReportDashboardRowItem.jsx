import { formatDate } from "../../../shared/utils";
import { useState } from "react";
import { useReportsStore } from "../../user/store/useReportsStore";

export const ReportDashboardRowItem = ({ report, handleReportsChange }) => {
  const { deleteReport, isSubmitting } = useReportsStore();
  const [showConfirmAlert, setShowConfirmAlert] = useState(false);
  const [alertData, setAlertData] = useState({
    message: "",
    type: "",
    show: false,
  });

  // Manejar eliminación del reporte
  const handleDeleteReport = async () => {
    setShowConfirmAlert(true); // Mostrar alerta de confirmación
  };

  const confirmDeleteReport = async () => {
    try {
      await deleteReport(report.id);
      setAlertData({
        message: "Reporte eliminado correctamente.",
        type: "success",
        show: true,
      });
      setShowConfirmAlert(false); // Ocultar alerta de confirmación
      if (handleReportsChange) handleReportsChange();
    } catch (error) {
      setAlertData({
        message: "Error al eliminar el reporte.",
        type: "error",
        show: true,
      });
      console.error("Error al eliminar el reporte:", error);
    }
  };

  return (
    <>
      {alertData.show && (
        <li className="p-4 bg-red-100 text-red-800 text-center rounded shadow mb-2">
          <div className="flex justify-between items-center">
            <span>{alertData.message}</span>
            <button
              className="text-red-600 hover:text-red-800 font-bold"
              onClick={() => setAlertData((prev) => ({ ...prev, show: false }))}
            >
              Cerrar
            </button>
          </div>
        </li>
      )}

      {showConfirmAlert && (
        <li className="p-4 bg-yellow-100 text-yellow-800 text-center rounded shadow mb-2">
          <div className="flex justify-between items-center">
            <span>¿Está seguro de que desea eliminar este reporte?</span>
            <div className="flex space-x-4">
              <button
                className="bg-green-500 text-white px-4 py-1 rounded hover:bg-green-700 font-bold"
                onClick={confirmDeleteReport}
              >
                Confirmar
              </button>
              <button
                className="bg-gray-500 text-white px-4 py-1 rounded hover:bg-gray-700 font-bold"
                onClick={() => setShowConfirmAlert(false)}
              >
                Cancelar
              </button>
            </div>
          </div>
        </li>
      )}

      <li className="p-4 bg-gray-200 rounded shadow flex justify-between items-center">
        <div className="w-1/5">
          <p className="font-bold text-gray-700">
            Para: {report.organizerName}
          </p>
          <p className="text-sm text-gray-700">De: {report.reporterName}</p>
        </div>
        <div className="w-3/5">
          <p className="font-medium text-gray-700">
            <span className="font-bold">Motivo:</span> {report.reason}
          </p>
          <p className="font-bold text-gray-700">
            {formatDate(report.reportDate)}
          </p>
        </div>
        <div className="w-1/5 text-right">
          <button
            className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-700"
            onClick={() => handleDeleteReport(report.id)}
            disabled={isSubmitting}
          >
            Eliminar
          </button>
        </div>
      </li>
    </>
  );
};
