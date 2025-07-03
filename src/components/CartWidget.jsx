import { FaShoppingCart } from 'react-icons/fa';

const CartWidget = () => {
  return (
    <div>
      <FaShoppingCart size={24} />
      <span>0</span> {/* La burbuja con cantidad */}
    </div>
  );
};

export default CartWidget;
