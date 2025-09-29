import { Link } from "react-router-dom";
import { FaHeart } from "react-icons/fa";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useFavorites from "../../context/useFavorites";

const CardProduct = ({ product }) => {
  const { addToFavorites, removeFromFavorites, isFavorite } = useFavorites();
  const hasDiscount =
    product.discountPrice && product.discountPrice < product.price;

  const toggleFavorite = () => {
    if (isFavorite(product.id)) {
      removeFromFavorites(product.id);
      toast.info(`${product.title} removido de favoritos`);
    } else {
      addToFavorites(product);
      toast.success(`${product.title} agregado a favoritos`);
    }
  };

  return (
    <div className="relative bg-white rounded-xl shadow-2xl overflow-hidden max-w-xs w-full flex flex-col">
      {/* Botón corazón */}
      <button
        onClick={toggleFavorite}
        className="absolute top-2 right-2 z-10 text-xl cursor-pointer hover:scale-110 transition-transform duration-200"
      >
        <FaHeart
          className={isFavorite(product.id) ? "text-red-500" : "text-gray-300"}
        />
      </button>

      {/* Imagen */}
      <Link to={`/item/${product.id}`} className="block">
        <img
          src={product.imageUrl || "https://via.placeholder.com/300x200"}
          alt={product.title}
          className="w-full h-full sm:h-56 object-contain bg-gray-100"
        />

        {/* Contenido */}
        <div className="p-4 flex flex-col justify-between flex-1">
          <h3 className="text-lg sm:text-xl font-semibold text-black mb-1">
            {product.title}
          </h3>

          {hasDiscount ? (
            <div className="flex items-center gap-2">
              <p className="text-gray-500 line-through text-sm">
                ${product.price}
              </p>
              <p className="text-green-600 font-bold text-lg">
                ${product.discountPrice}
              </p>
            </div>
          ) : (
            <p className="text-black font-bold text-lg">${product.price}</p>
          )}

          <p className="text-gray-500 text-sm mt-1">Stock: {product.stock}</p>

          <span className="mt-2 py-2 rounded-md font-semibold bg-[#E6CA4D] text-black text-center hover:bg-yellow-400 transition-colors duration-200">
            Ver detalle
          </span>
        </div>
      </Link>
    </div>
  );
};

export default CardProduct;
