import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../../services/firebaseConfig";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import useCart from "../../context/useCart";

const CheckoutForm = () => {
  const { cart, clearCart } = useCart();
  const [buyer, setBuyer] = useState({ name: "", email: "", phone: "" });
  const [shipping, setShipping] = useState({
    pais: "",
    codigoPostal: "",
    calle: "",
    numero: "",
    piso: "",
  });
  const [orderId, setOrderId] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const totalPrice = cart.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );

  const handleBuyerChange = (e) => {
    setBuyer({ ...buyer, [e.target.name]: e.target.value });
  };

  const handleShippingChange = (e) => {
    setShipping({ ...shipping, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!buyer.name || !buyer.email || !buyer.phone) {
      setError("Por favor completa todos los datos del comprador.");
      return;
    }
    if (
      !shipping.pais ||
      !shipping.codigoPostal ||
      !shipping.calle ||
      !shipping.numero
    ) {
      setError("Por favor completa todos los datos de envío obligatorios.");
      return;
    }

    setLoading(true);
    setError(null);

    const order = {
      buyer,
      shipping,
      items: cart.map(({ product, quantity }) => ({
        id: product.id,
        title: product.title,
        price: product.price,
        quantity,
      })),
      total: totalPrice,
      createdAt: Timestamp.fromDate(new Date()),
    };

    try {
      const ordersRef = collection(db, "orders");
      const docRef = await addDoc(ordersRef, order);
      setOrderId(docRef.id);
      setModalOpen(true);
      clearCart();
    } catch (err) {
      console.error("Error al crear la orden: ", err);
      setError("Hubo un error al procesar la orden. Intenta nuevamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Formulario */}
      <div className="px-2">
        <form
          onSubmit={handleSubmit}
          className="max-w-lg mx-auto p-6 bg-white rounded-xl shadow-2xl my-10 flex flex-col gap-4"
        >
          <h2 className="text-3xl font-bold text-center mb-4">
            Finalizar compra
          </h2>
          {error && <p className="text-red-500 font-semibold">{error}</p>}

          {/* Datos del comprador */}
          <h3 className="text-xl font-semibold mt-2 mb-1 text-gray-800">
            Datos del comprador
          </h3>

          <input
            type="text"
            name="name"
            value={buyer.name}
            onChange={handleBuyerChange}
            placeholder="Nombre completo"
            className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
            required
          />

          <input
            type="email"
            name="email"
            value={buyer.email}
            onChange={handleBuyerChange}
            placeholder="Correo electrónico"
            className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
            required
          />

          <input
            type="tel"
            name="phone"
            value={buyer.phone}
            onChange={handleBuyerChange}
            placeholder="Teléfono"
            className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
            required
          />

          {/* Datos de envío */}
          <h3 className="text-xl font-semibold mt-4 mb-1 text-gray-800">
            Datos de envío
          </h3>

          <input
            type="text"
            name="pais"
            value={shipping.pais}
            onChange={handleShippingChange}
            placeholder="País"
            className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
            required
          />

          <input
            type="text"
            name="codigoPostal"
            value={shipping.codigoPostal}
            onChange={handleShippingChange}
            placeholder="Código Postal"
            className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
            required
          />

          <input
            type="text"
            name="calle"
            value={shipping.calle}
            onChange={handleShippingChange}
            placeholder="Calle"
            className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
            required
          />

          <div className="flex gap-2">
            <input
              type="text"
              name="numero"
              value={shipping.numero}
              onChange={handleShippingChange}
              placeholder="Número"
              className="w-1/2 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
              required
            />
            <input
              type="text"
              name="piso"
              value={shipping.piso}
              onChange={handleShippingChange}
              placeholder="Piso (opcional)"
              className="w-1/2 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 cursor-pointer bg-yellow-400 text-black rounded-md font-semibold hover:bg-yellow-500 transition-colors"
          >
            {loading ? "Procesando..." : "Confirmar compra"}
          </button>
        </form>
      </div>

      {/* Modal de confirmación */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-8 max-w-sm text-center shadow-lg">
            <h2 className="text-2xl font-bold mb-4">¡Gracias por tu compra!</h2>
            <p className="text-lg mb-6">
              Tu número de orden es:{" "}
              <strong className="bg-amber-400 px-2 py-1 rounded">
                {orderId}
              </strong>
            </p>
            <button
              onClick={() => {
                setModalOpen(false);
                navigate("/");
              }}
              className="px-4 cursor-pointer py-2 bg-yellow-400 text-black rounded-md font-semibold hover:bg-yellow-500 transition-colors"
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default CheckoutForm;
