import useCart from "../../context/useCart";
import { Link } from "react-router-dom";
import { FaTimes, FaTrashAlt } from "react-icons/fa";

const CartDrawer = ({ isOpen, onClose }) => {
  const { cart, removeItem, clearCart } = useCart();

  // Calculo total 
  const totalPrice = cart.reduce((acc, item) => {
    const priceToUse = item.product.discountPrice || item.product.price;
    return acc + priceToUse * item.quantity;
  }, 0);

  return (
    <>
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-black/40 z-[9998]"
        />
      )}

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-80 bg-white shadow-2xl transform transition-transform duration-300 z-[9999] flex flex-col
        ${isOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-bold">Carrito</h2>
          <button onClick={onClose} className="text-black cursor-pointer">
            <FaTimes size={20} />
          </button>
        </div>

        {/* Contenido */}
        <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4">
          {cart.length === 0 ? (
            <div className="text-center mt-10 flex flex-col gap-4">
              <p className="text-gray-600">Tu carrito está vacío</p>
              <Link
                to="/"
                onClick={onClose}
                className="px-4 py-2 bg-yellow-400 text-black font-bold rounded-md hover:bg-yellow-500 transition-colors"
              >
                Ir al catálogo
              </Link>
            </div>
          ) : (
            cart.map((item) => {
              const priceToUse =
                item.product.discountPrice || item.product.price;
              return (
                <div
                  key={item.product.id}
                  className="flex gap-3 items-center border-b pb-2"
                >
                  <img
                    src={item.product.imageUrl}
                    alt={item.product.title}
                    className="w-16 h-16 object-cover rounded"
                  />
                  <div className="flex-1 flex flex-col">
                    <span className="font-semibold">{item.product.title}</span>
                    <span className="text-gray-500 text-sm">
                      Cantidad: {item.quantity}
                    </span>
                    <div className="flex items-center gap-2">
                      {item.product.discountPrice ? (
                        <>
                          <span className="text-gray-500 line-through text-sm">
                            ${item.product.price * item.quantity}
                          </span>
                          <span className="text-green-600 font-bold">
                            ${priceToUse * item.quantity}
                          </span>
                        </>
                      ) : (
                        <span className="text-gray-700 font-bold">
                          ${priceToUse * item.quantity}
                        </span>
                      )}
                    </div>
                  </div>
                  <button
                    onClick={() => removeItem(item.product.id)}
                    className="text-red-500 hover:text-red-700 font-bold cursor-pointer"
                  >
                    <FaTrashAlt size={20} />
                  </button>
                </div>
              );
            })
          )}
        </div>

        {/* Footer */}
        {cart.length > 0 && (
          <div className="p-4 border-t flex flex-col gap-3">
            <div className="flex justify-between font-bold text-lg">
              <span>Total:</span>
              <span>${totalPrice}</span>
            </div>
            <div className="flex gap-2 flex-wrap">
              <button
                onClick={clearCart}
                className="flex-1 cursor-pointer font-bold px-3 py-1 bg-gray-400 text-white rounded-md hover:bg-gray-500 transition-colors"
              >
                Vaciar carrito
              </button>
              <Link
                to="/checkout"
                onClick={onClose}
                className="flex-1 cursor-pointer font-bold px-3 py-1 bg-yellow-400 text-black rounded-md hover:bg-yellow-500 text-center"
              >
                Finalizar compra
              </Link>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default CartDrawer;
