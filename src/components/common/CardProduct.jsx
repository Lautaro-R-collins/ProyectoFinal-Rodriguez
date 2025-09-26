import { Link } from "react-router-dom";

const CardProduct = ({ product }) => {
  return (
    <div className="bg-white rounded-xl shadow-2xl overflow-hidden max-w-xs w-full flex flex-col">
      <img
        src={product.imageUrl || "https://via.placeholder.com/300x200"}
        alt={product.title}
        className="w-full h-full sm:h-56 object-contain bg-gray-100"
      />
      {/* Contenido */}
      <div className="p-4 flex flex-col justify-between flex-1">
        {/* Título y precio */}
        <div className="mb-4">
          <h3 className="text-lg sm:text-xl font-semibold text-black mb-1">
            {product.title}
          </h3>
          <p className="text-black font-bold text-lg">${product.price}</p>
          <p className="text-gray-500 text-sm mt-1">Stock: {product.stock}</p>
        </div>

        {/* Botón de ver detalle */}
        <Link
          to={`/item/${product.id}`}
          className="py-2 rounded-md font-semibold bg-[#E6CA4D] text-black text-center hover:bg-yellow-400 transition-colors duration-200"
        >
          Ver detalle
        </Link>
      </div>
    </div>
  );
};

export default CardProduct;
