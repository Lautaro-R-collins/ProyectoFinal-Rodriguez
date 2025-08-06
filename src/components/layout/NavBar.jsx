// src/components/layout/NavBar.jsx
import { Link } from 'react-router-dom';
import CartWidget from '../common/CartWidget';

const NavBar = () => {
  return (
    <nav>
      <div>
        <h1>Mi Tienda</h1> 
      </div>
      <ul>
        <li><Link to="/">Inicio</Link></li>
        <li><Link to="/category/electronica">Electrónica</Link></li>
        <li><Link to="/category/ropa">Ropa</Link></li>
        <li><Link to="/category/juguetes">Juguetes</Link></li>
      </ul>
      <CartWidget />
    </nav>
  );
};

export default NavBar;
