import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ItemCount from "../common/ItemCount";
import { db } from "../../services/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import useCart from "../../context/useCart";

const ItemDetailContainer = () => {
  const { itemId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const { addItem } = useCart();

  useEffect(() => {
    const productRef = doc(db, "products", itemId);

    setLoading(true);
    getDoc(productRef)
      .then((resp) => {
        if (resp.exists()) {
          setProduct({ id: resp.id, ...resp.data() });
        } else {
          setProduct(null);
        }
      })
      .catch((error) => {
        console.error("Error cargando producto:", error);
        setProduct(null);
      })
      .finally(() => {
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
      <ItemCount
        stock={product.stock}
        initial={1}
        onAdd={(quantity) => {
          addItem(product, quantity);
        }}
      />
    </div>
  );
};

export default ItemDetailContainer;
