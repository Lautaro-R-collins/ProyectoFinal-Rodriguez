import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { productsMock } from '../../mock/productsMock.js';

const getProducts = (categoryId) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      if (categoryId) {
        resolve(productsMock.filter(product => product.category === categoryId));
      } else {
        resolve(productsMock);
      }
    }, 500);
  });
};

const ItemListContainer = ({ mensaje }) => {
  const { categoryId } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getProducts(categoryId).then((data) => {
      setProducts(data);
      setLoading(false);
    });
  }, [categoryId]);

  if (loading) return <p>Cargando productos...</p>;

  return (
    <div>
      {mensaje && <h2>{mensaje}</h2>}
      <h3>{categoryId ? `Categoría: ${categoryId}` : 'Todos los productos'}</h3>
      <ul>
        {products.map(product => (
          <li key={product.id}>
            <Link to={`/item/${product.id}`}>{product.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ItemListContainer;
