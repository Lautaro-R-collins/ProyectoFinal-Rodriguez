import { FaShoppingCart } from "react-icons/fa";
import useCart from "../../context/useCart"; 
import { Link } from "react-router-dom";

const CartWidget = () => {
  const { totalQuantity } = useCart();

  return (
    <Link to="/cart" style={styles.link}>
      <div style={styles.container}>
        <FaShoppingCart size={22} />
        {totalQuantity > 0 && (
          <span style={styles.badge}>{totalQuantity}</span>
        )}
      </div>
    </Link>
  );
};

const styles = {
  link: {
    textDecoration: "none",
    color: "inherit",
  },
  container: {
    position: "relative",
    display: "inline-block",
    cursor: "pointer",
  },
  badge: {
    position: "absolute",
    top: "-12px",
    right: "-12px",
    backgroundColor: "#FA8072",
    color: "white",
    borderRadius: "50%",
    padding: "1px 6px",
    fontSize: "12px",
  },
};

export default CartWidget;
