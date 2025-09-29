import { FaHeart } from "react-icons/fa";
import { Link } from "react-router-dom";
import useFavorites from "../../context/useFavorites";

const FavoritesWidget = ({ className }) => {
  const { favorites } = useFavorites();

  return (
    <Link to="/favorites" className={`relative cursor-pointer ${className}`}>
      <FaHeart className="text-xl text-white" />
      {favorites.length > 0 && (
        <span className="absolute -top-3 -right-3 bg-[#E6CA4D] text-black font-bold rounded-full px-1.5 py-0.5 text-xs">
          {favorites.length}
        </span>
      )}
    </Link>
  );
};

export default FavoritesWidget;
