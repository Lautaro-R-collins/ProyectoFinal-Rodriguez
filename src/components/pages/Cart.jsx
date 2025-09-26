import useCart  from "../../context/useCart";
import { Link } from "react-router-dom";

const Cart = () => {
  const { cart, removeItem, clearCart, } = useCart();

  const totalPrice = cart.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );

  if (cart.length === 0) {
    return (
      <div style={styles.empty}>
        <h2>Tu carrito está vacío</h2>
        <Link to="/">Volver al catálogo</Link>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <h2>Carrito de compras</h2>
      {cart.map((item) => (
        <div key={item.product.id} style={styles.item}>
          <img src={item.product.imageUrl} alt={item.product.title} width={80} />
          <div>
            <h3>{item.product.title}</h3>
            <p>Cantidad: {item.quantity}</p>
            <p>Precio unitario: ${item.product.price}</p>
            <p>Subtotal: ${item.quantity * item.product.price}</p>
            <button onClick={() => removeItem(item.product.id)}>Eliminar</button>
          </div>
        </div>
      ))}
      <hr />
      <h3>Total: ${totalPrice}</h3>
      <div style={styles.buttons}>
        <button onClick={clearCart}>Vaciar carrito</button>
        <Link to="/checkout">
          <button>Finalizar compra</button>
        </Link>
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: "2rem",
    maxWidth: "800px",
    margin: "0 auto",
  },
  item: {
    display: "flex",
    gap: "1rem",
    alignItems: "center",
    marginBottom: "1rem",
    borderBottom: "1px solid #ccc",
    paddingBottom: "1rem",
  },
  buttons: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "1rem",
  },
  empty: {
    textAlign: "center",
    marginTop: "3rem",
  },
};

export default Cart;