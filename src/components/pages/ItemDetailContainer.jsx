import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import ItemCount from "../common/ItemCount";
import { db } from "../../services/firebaseConfig";
import {
  doc,
  getDoc,
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import useCart from "../../context/useCart";
import { toast } from "react-toastify";

const ItemDetailContainer = () => {
  const { itemId } = useParams();
  const [product, setProduct] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState("");
  const { addItem } = useCart();

  useEffect(() => {
    const productRef = doc(db, "products", itemId);

    setLoading(true);
    getDoc(productRef)
      .then(async (resp) => {
        if (resp.exists()) {
          const data = { id: resp.id, ...resp.data() };
          setProduct(data);

          // buscar productos relacionados por categoría
          if (data.category) {
            const productsRef = collection(db, "products");
            const q = query(
              productsRef,
              where("category", "==", data.category)
            );
            const relatedSnap = await getDocs(q);
            const relatedProducts = relatedSnap.docs
              .map((doc) => ({ id: doc.id, ...doc.data() }))
              .filter((p) => p.id !== data.id);
            setRelated(relatedProducts);
          }
        } else {
          setProduct(null);
        }
      })
      .catch((error) => {
        console.error("Error cargando producto:", error);
        setProduct(null);
      })
      .finally(() => setLoading(false));
  }, [itemId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[70vh] flex-col gap-8">
        <p className="text-2xl sm:text-4xl text-black font-bold">
          Cargando el producto
        </p>
        <div className="w-16 h-16 border-4 border-[#E6CA4D] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!product)
    return <p className="text-center py-10">Producto no encontrado</p>;

  const handleAddToCart = (quantity) => {
    if (product.sizes && !selectedSize) {
      toast.error("Por favor selecciona un talle");
      return;
    }

    addItem({ ...product, selectedSize }, quantity);
    toast.success(`${product.title} agregado al carrito!`, {
      position: "top-right",
      autoClose: 2000,
    });
  };

  const hasDiscount =
    product.discountPrice && product.discountPrice < product.price;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-10 py-10">
      {/* Título */}
      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center mb-10">
        {product.title}
      </h2>

      {/* Contenedor */}
      <div className="flex flex-col lg:flex-row gap-10 items-start">
        {/* Imagen */}
        <div className="lg:w-1/2 flex justify-center">
          <img
            src={product.imageUrl || "https://via.placeholder.com/400x400"}
            alt={product.title}
            className="w-full max-w-md rounded-xl object-cover"
          />
        </div>

        {/* Detalles */}
        <div className="lg:w-1/2 flex flex-col gap-3">
          <p className="text-gray-700 text-lg">{product.description}</p>

          {/* Precios */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-2">
            {hasDiscount ? (
              <>
                <p className="text-gray-500 line-through text-lg">
                  ${product.price}
                </p>
                <p className="text-2xl font-bold text-green-600">
                  ${product.discountPrice}
                </p>
              </>
            ) : (
              <p className="text-2xl font-bold text-black">${product.price}</p>
            )}
            <p className="text-sm text-green-600 font-bold">
              Stock disponible: {product.stock}
            </p>
          </div>

          {/* Selector de talles */}
          {product.sizes && product.sizes.length > 0 && (
            <div>
              <p className="font-semibold mb-1">Selecciona tu talle:</p>
              <div className="flex gap-2 flex-wrap">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-3 py-1 cursor-pointer border rounded ${
                      selectedSize === size
                        ? "bg-[#E6CA4D] border-[#e0c02f]"
                        : "bg-white border-gray-300 hover:bg-gray-100"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Contador y botón agregar */}
          <div className="mt-4">
            <ItemCount
              stock={product.stock}
              initial={1}
              onAdd={handleAddToCart}
            />
          </div>
        </div>
      </div>

      {/* Productos relacionados */}
      {related.length > 0 && (
        <div className="mt-16">
          <h3 className="text-2xl font-bold text-center mb-8">
            Productos relacionados
          </h3>
          <div className="flex flex-wrap justify-center gap-6">
            {related.slice(0, 4).map((item) => (
              <Link
                to={`/item/${item.id}`}
                key={item.id}
                className="bg-white rounded-xl shadow-md overflow-hidden max-w-[200px] w-full hover:scale-105 transition-transform"
              >
                <img
                  src={item.imageUrl || "https://via.placeholder.com/200"}
                  alt={item.title}
                  className="w-full h-40 object-cover bg-gray-100"
                />
                <div className="p-3 text-center">
                  <h4 className="text-sm font-semibold truncate">
                    {item.title}
                  </h4>
                  {item.discountPrice ? (
                    <div className="flex items-center justify-center gap-2">
                      <p className="text-gray-500 line-through text-xs">
                        ${item.price}
                      </p>
                      <p className="text-sm font-bold text-green-600">
                        ${item.discountPrice}
                      </p>
                    </div>
                  ) : (
                    <p className="text-sm font-bold text-black">
                      ${item.price}
                    </p>
                  )}
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ItemDetailContainer;
