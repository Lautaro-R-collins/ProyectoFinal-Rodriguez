import { useState } from "react";
import { Link } from "react-router-dom";
import CartWidget from "./CartWidget";
import CartDrawer from "../pages/Cart";
import logoUrban from "../../assets/Logo/logoUrban.png";
import { FaBars, FaTimes } from "react-icons/fa";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <>
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
                <Link to="/" className="hover:bg-[#E6CA4D] hover:text-black p-4 rounded font-bold">
                  Inicio
                </Link>
              </li>
              <li>
                <Link to="/category/Camisas" className="hover:bg-[#E6CA4D] hover:text-black p-4 rounded font-bold">
                  Camisas
                </Link>
              </li>
              <li>
                <Link to="/category/Remeras" className="hover:bg-[#E6CA4D] hover:text-black p-4 rounded font-bold">
                  Remeras
                </Link>
              </li>
              <li>
                <Link to="/category/Pantalones" className="hover:bg-[#E6CA4D] hover:text-black p-4 rounded font-bold">
                  Pantalones
                </Link>
              </li>
              <li>
                <Link to="/category/Accesorios" className="hover:bg-[#E6CA4D] hover:text-black p-4 rounded font-bold">
                  Accesorios
                </Link>
              </li>
            </ul>
          </div>

          {/* Menú Mobile (hamburguesa + carrito) */}
          <div className="flex items-center gap-4 md:hidden">
            <CartWidget onOpen={() => setIsCartOpen(true)} /> 
            <button className="text-2xl" onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>

          {/* Carrito Desktop */}
          <div className="hidden md:block ml-4">
            <CartWidget onOpen={() => setIsCartOpen(true)} /> 
          </div>
        </div>

        {/* Menú Mobile desplegable */}
        {isOpen && (
          <ul className="md:hidden flex flex-col bg-black px-6 pb-4 text-center">
            <li><Link to="/" onClick={() => setIsOpen(false)} className="hover:text-gray-300 font-bold py-2 block">Inicio</Link></li>
            <li><Link to="/category/Camisas" onClick={() => setIsOpen(false)} className="hover:text-gray-300 font-bold py-2 block">Camisas</Link></li>
            <li><Link to="/category/Remeras" onClick={() => setIsOpen(false)} className="hover:text-gray-300 font-bold py-2 block">Remeras</Link></li>
            <li><Link to="/category/Pantalones" onClick={() => setIsOpen(false)} className="hover:text-gray-300 font-bold py-2 block">Pantalones</Link></li>
            <li><Link to="/category/Accesorios" onClick={() => setIsOpen(false)} className="hover:text-gray-300 font-bold py-2 block">Accesorios</Link></li>
          </ul>
        )}
      </nav>

      {/* Drawer del carrito */}
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
};

export default NavBar;
