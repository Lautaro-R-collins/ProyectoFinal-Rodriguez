import { FaShoppingCart } from "react-icons/fa";
import useCart from "../../context/useCart";

const CartWidget = ({ onOpen }) => {
  const { totalQuantity } = useCart();

  return (
    <div onClick={onOpen} className="relative cursor-pointer">
      <FaShoppingCart size={22} />
      {totalQuantity > 0 && (
        <span className="absolute -top-3 -right-3 bg-[#E6CA4D] text-black font-bold rounded-full px-1.5 py-0.5 text-xs">
          {totalQuantity}
        </span>
      )}
    </div>
  );
};

export default CartWidget;
