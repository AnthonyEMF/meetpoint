import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import { MdOutlineWorkspacePremium } from "react-icons/md";
import { useMembershipsStore } from "../store/useMembershipsStore";
import { useState } from "react";
import { CustomAlerts } from "../../../shared/components";

export const MembershipsPage = () => {
  const addMembership = useMembershipsStore((state) => state.addMembership);
  const [alert, setAlert] = useState({ show: false, message: "", type: "" });

  const handleApprove = async (membershipType) => {
    try {
      const result = await addMembership({ type: membershipType });
      if (result.status) {
        setAlert({ show: true, message: "Membresía añadida con éxito", type: "success" });
      } else {
        setAlert({ show: true, message: "Error al añadir la membresía", type: "error" });
      }
    } catch (error) {
      console.error("Error al añadir la membresía", error);
      setAlert({ show: true, message: "Error al añadir la membresía", type: "error" });
    }
  };

  const handleCloseAlert = () => {
    setAlert({ show: false, message: "", type: "" });
  };

  return (
    <div className="container mx-auto p-6">
      {alert.show && (
        <CustomAlerts
          message={alert.message}
          type={alert.type}
          onClose={handleCloseAlert}
        />
      )}
      {/* Encabezado */}
      <div className="bg-white shadow-lg rounded-lg p-6 mb-6 px-10">
        <h1 className="text-3xl font-bold mb-4 text-center text-gray-800">
          🎉 MeetPoint te presenta las Membresías Exclusivas 🎉
        </h1>
        <p className="text-lg text-gray-700 mb-6 text-center">
          ¿Eres un apasionado de los eventos? ¿Quieres llevar a otro nivel tu
          experiencia en nuestra red social? ¡Tenemos la solución perfecta para
          ti! Presentamos nuestras Membresías Mensuales y Anuales diseñadas para
          nuestros usuarios más acérrimos.
        </p>
        {/* <ul className="list-disc pl-6 space-y-3 text-gray-700">
            <li>Ya no tienes limites para publicar tus eventos.</li>
            <li>Recomendaciones personalizadas basadas en tus intereses.</li>
            <li>Acceso anticipado a eventos especiales.</li>
            <li>Atención al cliente personalizada y soporte prioritario.</li>
          </ul> */}
      </div>
      {/* Planes */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Plan Mensual */}
        <div className="bg-white shadow-lg rounded-lg p-6 text-center">
          <h2 className="text-2xl flex justify-center items-center font-bold text-gray-800 mb-4">
            Plan Mensual{" "}
            <MdOutlineWorkspacePremium size={35} className="text-yellow-500 ml-1" />
          </h2>
          <p className="text-gray-700 mb-4">Perfecto para empezar a disfrutar de nuestras ventajas.</p>
          <p className="text-3xl font-bold text-gray-800 mb-4">$2.99/mes</p>
          {/* 
            >> Cuenta para pruebas
            Email: sb-umhqq34977525@personal.example.com
            Password: 5#QhuV>P
          */}
          <PayPalScriptProvider options={{ "client-id": "AQRuOtM7ekyhH3LbGALtTcVhiMsyBARJ9USIhXyRPUxLvLCnJ0H8R460ZsyvLFM5jZgdyDvxMSY_Zd5u", currency: "USD" }}>
            <PayPalButtons
              style={{ layout: "vertical" }}
              createOrder={(data, actions) => {
                return actions.order.create({
                  purchase_units: [
                    {
                      amount: {
                        value: "2.99", // Monto del pago
                      },
                    },
                  ],
                });
              }}
              onApprove={async (data, actions) => {
                return actions.order.capture().then(async (details) => {
                  await handleApprove("Mensual");
                });
              }}
            />
          </PayPalScriptProvider>
        </div>
        {/* Plan Anual */}
        <div className="bg-blue-500 text-white shadow-lg rounded-lg p-6 text-center">
          <h2 className="text-2xl flex justify-center items-center font-bold mb-4">
            Plan Anual{" "}
            <MdOutlineWorkspacePremium size={35} className="text-white ml-1" />
          </h2>
          <p className="mb-4">La mejor opción para nuestros usuarios más frecuentes.</p>
          <p className="text-3xl font-bold mb-4">$29.99/año</p>
          <PayPalScriptProvider options={{ "client-id": "AXSM9VtAvRzetSCvsOXkJ9xB8f4B9qc7lnPxj07r65NkLVXEft57W6Cnz4BvLV5MvxYt738ErfHHhG02", currency: "USD" }}>
            <PayPalButtons
              style={{ layout: "vertical" }}
              createOrder={(data, actions) => {
                return actions.order.create({
                  purchase_units: [
                    {
                      amount: {
                        value: "29.99", // Monto del pago
                      },
                    },
                  ],
                });
              }}
              onApprove={async (data, actions) => {
                return actions.order.capture().then(async (details) => {
                  await handleApprove("Anual");
                });
              }}
            />
          </PayPalScriptProvider>
        </div>
      </div>
    </div>
  );
};