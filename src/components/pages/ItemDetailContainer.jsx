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

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[70vh] flex-col gap-8">
        <p className="text-2xl sm:text-4xl text-black font-bold">Cargando el producto</p>
        <div className="w-16 h-16 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }
  if (!product)
    return <p className="text-center py-10">Producto no encontrado</p>;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-10 py-10">
      {/* Título centrado */}
      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center mb-10">
        {product.title}
      </h2>

      {/* Contenedor principal */}
      <div className="flex flex-col lg:flex-row gap-10 items-start">
        {/* Imagen */}
        <div className="lg:w-1/2 flex justify-center">
          <img
            src={product.imageUrl || "https://via.placeholder.com/400x400"}
            alt={product.title}
            className="w-full max-w-md rounded-xl  object-cover"
          />
        </div>

        {/* Detalles */}
        <div className="lg:w-1/2 flex flex-col gap-3">
          <p className="text-gray-700 text-lg">{product.description}</p>
          <p className="text-2xl font-bold text-black">
            Precio: ${product.price}
          </p>
          <p className="text-gray-500 text-xl">
            Stock disponible: {product.stock}
          </p>

          {/* Contador y botón agregar al carrito */}
          <div className="mt-1">
            <ItemCount
              stock={product.stock}
              initial={1}
              onAdd={(quantity) => addItem(product, quantity)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemDetailContainer;
