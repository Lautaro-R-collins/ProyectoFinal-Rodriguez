import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import CardProduct from '../common/CardProduct.jsx';

import { db } from '../../services/firebaseConfig';
import { collection, getDocs, query, where } from 'firebase/firestore';

const ItemListContainer = ({ mensaje }) => {
  const { categoryId } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const productsRef = collection(db, 'products');
    const q = categoryId ? query(productsRef, where('category', '==', categoryId)) : productsRef;

    setLoading(true);
    getDocs(q)
      .then((resp) => {
        const productsFirebase = resp.docs.map((doc) => {
          return { id: doc.id, ...doc.data() };
        });
        setProducts(productsFirebase);
      })
      .catch((error) => {
        console.error('Error cargando productos:', error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [categoryId]);

  if (loading) return <p>Cargando productos...</p>;

  return (
    <div>
      {mensaje && <h2>{mensaje}</h2>}
      <h3>{categoryId ? `Categoría: ${categoryId}` : 'Todos los productos'}</h3>
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
        {products.map((product) => (
          <CardProduct key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ItemListContainer;
