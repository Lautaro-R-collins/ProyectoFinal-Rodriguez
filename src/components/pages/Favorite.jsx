import { Link } from "react-router-dom";
import { FaRegHeart } from "react-icons/fa";
import CardProduct from "../../components/common/CardProduct";
import useFavorites from "../../context/useFavorites";

const Favorite = () => {
  const { favorites, clearFavorites } = useFavorites();

  if (favorites.length === 0) {
    // Página sin productos
    return (
      <div>
        {/* Encabezado */}
        <div className="relative mb-10 bg-[url('https://wallpapers.com/images/hd/black-brick-wall-tiles-rc0x6jehi7y9xd0c.jpg')] bg-cover bg-center h-60 flex items-center justify-center">
          <h3 className="font-bold text-white drop-shadow-md font-['Sedgwick_Ave_Display'] text-6xl lg:text-9xl">
            Favoritos
          </h3>
        </div>

        {/* Favorito sin productos */}
        <div className="flex flex-col items-center justify-center text-center py-16 gap-6">
          <FaRegHeart className="text-gray-400 text-7xl" />
          <p className="text-2xl sm:text-3xl font-semibold text-gray-700">
            No tienes productos en favoritos
          </p>
          <p className="text-gray-500 text-base">
            Guarda tus productos preferidos para acceder a ellos fácilmente
          </p>

          {/* Botón volver al catálogo */}
          <Link
            to="/"
            className="mt-4 bg-yellow-400 text-black px-6 py-2 rounded-md font-semibold shadow hover:bg-yellow-500 transition-colors"
          >
            Volver al Catálogo
          </Link>
        </div>
      </div>
    );
  }
  // Página con productos
  return (
    <div>
      {/* Encabezado */}
      <div className="relative mb-10 bg-[url('https://wallpapers.com/images/hd/black-brick-wall-tiles-rc0x6jehi7y9xd0c.jpg')] bg-cover bg-center h-60 flex items-center justify-center">
        <h3 className="font-bold text-white drop-shadow-md font-['Sedgwick_Ave_Display'] text-6xl lg:text-9xl">
          Favoritos
        </h3>
      </div>

      {/* Renderizado de favoritos */}
      <div className="flex flex-wrap justify-center gap-6 px-4 sm:px-6 lg:px-10 mb-6">
        {favorites.map((product) => (
          <CardProduct key={product.id} product={product} />
        ))}
      </div>

      {/* Botón limpiar favoritos */}
      <div className="flex justify-center mt-8 mb-10">
        <button
          onClick={clearFavorites}
          className="bg-[#E6CA4D] cursor-pointer text-black px-6 py-2 rounded-md font-semibold shadow hover:bg-[#f3c910] transition-colors"
        >
          Limpiar Favoritos
        </button>
      </div>
    </div>
  );
};

export default Favorite;
