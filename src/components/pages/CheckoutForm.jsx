import { useState } from "react";
import { db } from "../../services/firebaseConfig";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import useCart from "../../context/useCart";

const CheckoutForm = () => {
  const { cart, clearCart } = useCart();
  const [buyer, setBuyer] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const [orderId, setOrderId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const totalPrice = cart.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );

  const handleChange = (e) => {
    setBuyer({ ...buyer, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!buyer.name || !buyer.email || !buyer.phone) {
      setError("Por favor completa todos los campos.");
      return;
    }

    setLoading(true);
    setError(null);

    const order = {
      buyer,
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
      clearCart();
    } catch (err) {
      console.error("Error al crear la orden: ", err);
      setError("Hubo un error al procesar la orden. Intenta nuevamente.");
    } finally {
      setLoading(false);
    }
  };

  if (orderId) {
    return (
      <div>
        <h2>Gracias por tu compra!</h2>
        <p>Tu número de orden es: <strong>{orderId}</strong></p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 400, margin: "auto" }}>
      <h2>Finalizar compra</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <label>
        Nombre completo:
        <input
          type="text"
          name="name"
          value={buyer.name}
          onChange={handleChange}
          required
        />
      </label>
      <br />
      <label>
        Email:
        <input
          type="email"
          name="email"
          value={buyer.email}
          onChange={handleChange}
          required
        />
      </label>
      <br />
      <label>
        Teléfono:
        <input
          type="tel"
          name="phone"
          value={buyer.phone}
          onChange={handleChange}
          required
        />
      </label>
      <br />
      <button type="submit" disabled={loading}>
        {loading ? "Procesando..." : "Confirmar compra"}
      </button>
    </form>
  );
};

export default CheckoutForm;
