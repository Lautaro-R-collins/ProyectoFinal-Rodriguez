import CartWidget from './CartWidget';

const NavBar = () => {
  return (
    <nav>
      <div>
        <h1>Mi Tienda</h1> 
      </div>
      <ul>
        <li><a href="#inicio">Inicio</a></li>
        <li><a href="#productos">Productos</a></li>
        <li><a href="#contacto">Contacto</a></li>
      </ul>
      <CartWidget />
    </nav>
  );
};

export default NavBar;
