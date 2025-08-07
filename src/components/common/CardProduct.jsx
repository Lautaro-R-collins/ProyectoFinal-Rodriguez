import { Link } from 'react-router-dom';

const CardProduct = ({ product }) => {
  return (
    <div style={styles.card}>
      <img
        src={product.imageUrl || 'https://via.placeholder.com/150'}
        alt={product.title}
        style={styles.image}
      />
      <h3>{product.title}</h3>
      <p>Precio: ${product.price}</p>
      <p>Stock: {product.stock}</p>
      <Link to={`/item/${product.id}`} style={styles.button}>
        Ver detalle
      </Link>
    </div>
  );
};

const styles = {
  card: {
    border: '1px solid #ddd',
    borderRadius: '8px',
    padding: '1rem',
    margin: '1rem',
    maxWidth: '220px',
    boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
    textAlign: 'center',
  },
  image: {
    width: '100%',
    height: '150px',
    objectFit: 'cover',
    borderRadius: '6px',
  },
  button: {
    marginTop: '0.75rem',
    display: 'inline-block',
    padding: '0.5rem 1rem',
    backgroundColor: '#61dafb',
    color: '#000',
    textDecoration: 'none',
    borderRadius: '4px',
    fontWeight: '600',
  },
};

export default CardProduct;
