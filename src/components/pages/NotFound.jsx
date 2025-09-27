import { TbFaceIdError } from "react-icons/tb";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center px-4">
      <h1 className="text-5xl font-bold text-gray-800 mb-2">
        Página no encontrada
      </h1>
      <p className="text-gray-600 mb-6">
        Lo sentimos, no pudimos encontrar la página que buscabas.
      </p>
      <TbFaceIdError className="text-yellow-500 text-7xl mb-4" />
      <Link
        to="/"
        className="px-6 py-3 bg-yellow-400 text-black rounded-md font-semibold hover:bg-yellow-500 transition-colors"
      >
        Volver al catálogo
      </Link>
    </div>
  );
};

export default NotFound;
