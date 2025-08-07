import { Link } from 'react-router-dom';
import CartWidget from '../common/CartWidget';

const NavBar = () => {
  return (
    <nav style={styles.nav}>
      <div style={styles.logo}>
        <h1>Mi Tienda</h1>
      </div>
      <ul style={styles.menu}>
        <li style={styles.menuItem}><Link to="/" style={styles.link}>Inicio</Link></li>
        <li style={styles.menuItem}><Link to="/category/electronica" style={styles.link}>Electrónica</Link></li>
        <li style={styles.menuItem}><Link to="/category/ropa" style={styles.link}>Ropa</Link></li>
        <li style={styles.menuItem}><Link to="/category/juguetes" style={styles.link}>Juguetes</Link></li>
      </ul>
      <div style={styles.cart}>
        <CartWidget />
      </div>
    </nav>
  );
};

const styles = {
    nav: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0 2rem',
    height: '60px',
    borderBottom: '1px solid #ddd',
    position: 'sticky',
    top: 0,
    width: '100%',       // ocupa todo el ancho
    margin: '0 auto',    // centra horizontalmente si maxWidth se aplica
    zIndex: 1000,
  },
  logo: {
    flex: '0 0 auto',
  },
  menu: {
    listStyle: 'none',
    display: 'flex',
    gap: '1.5rem',
    margin: 0,
    padding: 0,
    flex: '1 1 auto',
    justifyContent: 'center',
  },
  menuItem: {},
  link: {
    textDecoration: 'none',
    color: '#fff',
    fontWeight: '500',
  },
  cart: {
    flex: '0 0 auto',
  },
};

export default NavBar;
