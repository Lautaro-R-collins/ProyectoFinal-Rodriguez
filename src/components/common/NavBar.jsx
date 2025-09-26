import { useState } from "react";
import { Link } from "react-router-dom";
import CartWidget from "./CartWidget";
import logoUrban from "../../assets/Logo/logoUrban.png";
import { FaBars, FaTimes } from "react-icons/fa";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-black text-white shadow-md">
      <div className="flex items-center justify-between h-20 px-6">
        {/* Logo */}
        <Link to="/">
          <img src={logoUrban} alt="Mi Tienda" className="h-12 w-auto" />
        </Link>

        {/* Menú Desktop */}
        <div className="hidden md:flex items-center flex-1 justify-center">
          <ul className="flex gap-2 list-none m-0 p-0">
            <li>
              <Link
                to="/"
                className="hover:bg-[#E6CA4D] hover:text-black p-4 rounded transition-colors font-bold"
              >
                Inicio
              </Link>
            </li>
            <li>
              <Link
                to="/category/Camisas"
                className="hover:bg-[#E6CA4D] hover:text-black p-4 rounded transition-colors font-bold"
              >
                Camisas
              </Link>
            </li>
            <li>
              <Link
                to="/category/Remeras"
                className="hover:bg-[#E6CA4D] hover:text-black p-4 rounded transition-colors font-bold"
              >
                Remeras
              </Link>
            </li>
            <li>
              <Link
                to="/category/Pantalones"
                className="hover:bg-[#E6CA4D] hover:text-black p-4 rounded transition-colors font-bold"
              >
                Pantalones
              </Link>
            </li>
            <li>
              <Link
                to="/category/Accesorios"
                className="hover:bg-[#E6CA4D] hover:text-black p-4 rounded transition-colors font-bold"
              >
                Accesorios
              </Link>
            </li>
          </ul>
        </div>

        {/* Menú Mobile (hamburguesa + carrito) */}
        <div className="flex items-center gap-4 md:hidden">
          <CartWidget />
          <button className="text-2xl" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* Carrito Desktop */}
        <div className="hidden md:block ml-4">
          <CartWidget />
        </div>
      </div>

      {/* Menú Mobile desplegable */}
      {isOpen && (
        <ul className="md:hidden flex flex-col bg-black px-6 pb-4 text-center">
          <li>
            <Link
              to="/"
              className="hover:text-gray-300 font-medium py-2 block"
              onClick={() => setIsOpen(false)}
            >
              Inicio
            </Link>
          </li>
          <li>
            <Link
              to="/category/Camisas"
              className="hover:text-gray-300 font-medium py-2 block"
              onClick={() => setIsOpen(false)}
            >
              Camisas
            </Link>
          </li>
          <li>
            <Link
              to="/category/Remeras"
              className="hover:text-gray-300 font-medium py-2 block"
              onClick={() => setIsOpen(false)}
            >
              Remeras
            </Link>
          </li>
          <li>
            <Link
              to="/category/Pantalones"
              className="hover:text-gray-300 font-medium py-2 block"
              onClick={() => setIsOpen(false)}
            >
              Pantalones
            </Link>
          </li>
          <li>
            <Link
              to="/category/Accesorios"
              className="hover:text-gray-300 font-medium py-2 block"
              onClick={() => setIsOpen(false)}
            >
              Accesorios
            </Link>
          </li>
        </ul>
      )}
    </nav>
  );
};

export default NavBar;
