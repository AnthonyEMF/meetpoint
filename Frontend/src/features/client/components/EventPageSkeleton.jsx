export const EventPageSkeleton = () => {
  return (
    <div className="container mx-auto p-6">
      {/* Información del evento */}
      <div className="bg-white shadow-lg rounded-lg p-6 mb-6 flex animate-pulse">
        {/* Contenedor Izquierdo */}
        <div className="w-full md:w-70">
          <div className="h-8 bg-gray-300 rounded mb-2"></div>
          <div className="h-6 bg-gray-300 rounded mb-4"></div>
          <div className="h-4 bg-gray-300 rounded mb-2 w-1/3"></div>
          <div className="h-4 bg-gray-300 rounded w-1/2"></div>
        </div>
        {/* Contenedor Derecho */}
        <div className="w-full md:w-30 md:pl-4 flex flex-col items-end">
          <div className="h-4 bg-gray-300 rounded mb-2 w-1/2 self-end"></div>
          <div className="flex flex-col space-y-2">
            <div className="h-10 bg-gray-300 rounded-lg w-24"></div>
            <div className="h-10 bg-gray-300 rounded-lg w-24"></div>
          </div>
          <div className="h-8 bg-gray-300 rounded-3xl px-10 py-2 mt-auto w-24"></div>
        </div>
      </div>

      {/* Asistencias */}
      <div className="bg-white shadow-lg rounded-lg p-6 mb-6 animate-pulse">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <div className="col-span-3">
            <div className="h-6 bg-gray-300 rounded mb-4 w-1/3"></div>
          </div>
        </div>
        <div className="mt-4 flex flex-col gap-2">
          <div className="h-6 bg-gray-300 rounded mb-2 w-3/4"></div>
          <div className="flex gap-2">
            <div className="h-10 bg-gray-300 rounded-lg w-24"></div>
            <div className="h-10 bg-gray-300 rounded-lg w-24"></div>
            <div className="h-10 bg-gray-300 rounded-lg w-24"></div>
          </div>
          <div>
            <div className="h-10 bg-gray-300 rounded-lg mt-2 w-36"></div>
          </div>
        </div>
      </div>

      {/* Comentarios */}
      <div className="bg-white shadow-lg rounded-lg p-6 mb-6 animate-pulse">
        <div className="h-6 bg-gray-300 rounded mb-4 w-1/3"></div>
        <ul className="divide-y divide-gray-200">
          <li className="py-4 flex justify-between items-start">
            <div className="flex-1">
              <div className="h-4 bg-gray-300 rounded w-1/2 mb-2"></div>
              <div className="h-4 bg-gray-300 rounded w-3/4"></div>
            </div>
            <div className="flex-none">
              <div className="h-8 bg-gray-300 rounded-lg w-24"></div>
            </div>
          </li>
          <li className="py-4 flex justify-between items-start">
            <div className="flex-1">
              <div className="h-4 bg-gray-300 rounded w-1/2 mb-2"></div>
              <div className="h-4 bg-gray-300 rounded w-3/4"></div>
            </div>
            <div className="flex-none">
              <div className="h-8 bg-gray-300 rounded-lg w-24"></div>
            </div>
          </li>
        </ul>
        <div className="mt-4">
          <div className="h-24 bg-gray-300 rounded"></div>
          <div className="h-8 bg-gray-300 rounded mt-2 w-24"></div>
        </div>
      </div>
    </div>
  )
}
