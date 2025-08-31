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
    setTimeout(() => setAdded(false), 2000); // el mensaje dura 2 segundos
  };

  return (
    <div style={styles.container}>
      <div style={styles.controls}>
        <button onClick={decrement}>-</button>
        <span>{count}</span>
        <button onClick={increment}>+</button>
      </div>
      <button
        onClick={handleAdd}
        disabled={stock === 0}
        style={styles.addButton}
      >
        Agregar al carrito
      </button>
      {added && <p style={styles.confirmMessage}>¡Producto agregado al carrito!</p>}
    </div>
  );
};

const styles = {
  container: { marginTop: "1rem" },
  controls: {
    display: "flex",
    gap: "1rem",
    marginBottom: "0.5rem",
  },
  addButton: {
    padding: "0.5rem 1rem",
    backgroundColor: "#61dafb34",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
  confirmMessage: {
    marginTop: "0.5rem",
    color: "green",
    fontWeight: "bold",
  },
};

export default ItemCount;
