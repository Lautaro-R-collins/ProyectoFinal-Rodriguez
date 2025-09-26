import { useState } from "react";

const ItemCount = ({ stock, initial = 1, onAdd }) => {
  const [count, setCount] = useState(initial);
  const [added, setAdded] = useState(false);

  const increment = () => {
    if (count < stock) setCount(count + 1);
  };

  const decrement = () => {
    if (count > 1) setCount(count - 1);
  };

  const handleAdd = () => {
    onAdd(count);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="mt-4 flex flex-col items-start gap-3">
      {/* Controles */}
      <div className="flex items-center gap-4">
        <button
          onClick={decrement}
          className="bg-gray-200 text-gray-800 font-bold px-3 py-1 rounded hover:bg-gray-300 transition-colors cursor-pointer"
        >
          -
        </button>
        <span className="text-lg font-semibold">{count}</span>
        <button
          onClick={increment}
          className="bg-gray-200 text-gray-800 font-bold px-3 py-1 rounded hover:bg-gray-300 transition-colors cursor-pointer"
        >
          +
        </button>
      </div>

      {/* Botón agregar al carrito */}
      <button
        onClick={handleAdd}
        disabled={stock === 0}
        className={`px-4 py-2 font-semibold rounded-md transition-colors ${
          stock === 0
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-[#E6CA4D] hover:bg-yellow-500 text-black cursor-pointer"
        }`}
      >
        Agregar al carrito
      </button>

      {/* Mensaje de confirmación */}
      {added && (
        <p className="text-green-600 font-bold mt-2 animate-pulse">
          ¡Producto agregado al carrito!
        </p>
      )}
    </div>
  );
};

export default ItemCount;
