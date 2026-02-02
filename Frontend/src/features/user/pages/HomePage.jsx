import { Link } from "react-router-dom";

export const HomePage = () => {
  return (
    <div className="flex flex-col items-center content-center w-full">
      {/* Hero Section */}
      <header className="bg-cover bg-center h-64 mt-6 text-white flex items-center justify-center w-full">
        <div className="flex-shrink-0 mr-8">
            <img className="w-64 h-64" src="/meetpoint-logo-outline.svg" alt="meetpoint" />
        </div>
        <div className="text-left">
          <h1 className="text-4xl font-bold mb-4">Bienvenido a MeetPoint</h1>
          <p className="text-xl mb-6">Eventos, convivencia y reuniones.</p>
          <Link className="rounded bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4" to="/main">
            Publicaciones
          </Link>
        </div>
      </header>

      {/* Sobre MeetPoint */}
      <div className="container mx-auto flex-1 py-8 px-8">
        <div className="bg-gray-600 p-6 rounded">
          <h2 className="text-3xl text-white font-bold text-center mb-8">Sobre MeetPoint</h2>
          <p className="text-white">
            En MeetPoint, te ofrecemos una plataforma dinámica para descubrir, organizar y compartir eventos sociales 
            que te interesan. Desde conciertos y talleres hasta fiestas y eventos comunitarios, nuestra app te ayuda a 
            encontrar y participar en actividades que enriquecen tu vida social.
          </p>
        </div>
      </div>
    </div>
  );
}
