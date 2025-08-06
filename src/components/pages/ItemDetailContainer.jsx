import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { productsMock } from '../../mock/productsMock.js';

const getProductById = (id) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const product = productsMock.find(p => p.id === id);
      resolve(product);
    }, 500);
  });
};

const ItemDetailContainer = () => {
  const { itemId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getProductById(itemId).then((prod) => {
      setProduct(prod);
      setLoading(false);
    });
  }, [itemId]);

  if (loading) return <p>Cargando detalle del producto...</p>;
  if (!product) return <p>Producto no encontrado</p>;

  return (
    <div>
      <h2>{product.title}</h2>
      <img src={product.imageUrl} alt={product.title} width={200} />
      <p>{product.description}</p>
      <p>Precio: ${product.price}</p>
      <p>Stock disponible: {product.stock}</p>
    </div>
  );
};

export default ItemDetailContainer;
