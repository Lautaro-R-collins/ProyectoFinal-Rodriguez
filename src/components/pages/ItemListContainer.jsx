import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CardProduct from "../common/CardProduct.jsx";

import { db } from "../../services/firebaseConfig";
import { collection, getDocs, query, where } from "firebase/firestore";

const ItemListContainer = ({ mensaje }) => {
  const { categoryId } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Paginación
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  useEffect(() => {
    const productsRef = collection(db, "products");
    const q = categoryId
      ? query(productsRef, where("category", "==", categoryId))
      : productsRef;

    setLoading(true);
    getDocs(q)
      .then((resp) => {
        const productsFirebase = resp.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setProducts(productsFirebase);
        setCurrentPage(1); 
      })
      .catch((error) => console.error("Error cargando productos:", error))
      .finally(() => setLoading(false));
  }, [categoryId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[70vh] flex-col gap-8">
        <p className="text-2xl sm:text-4xl text-black font-bold">Cargando Productos</p>
        <div className="w-16 h-16 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  // Cálculo del slice de productos para la página actual
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProducts = products.slice(indexOfFirstItem, indexOfLastItem);

  // Total páginas
  const totalPages = Math.ceil(products.length / itemsPerPage);

  return (
    <div>
      {mensaje && (
        <h2 className="text-xl font-medium text-center mb-6">{mensaje}</h2>
      )}

      <div
        className={`relative mb-10 ${
          categoryId
            ? "bg-[url('https://wallpapers.com/images/hd/black-brick-wall-tiles-rc0x6jehi7y9xd0c.jpg')] bg-cover bg-center h-60 flex items-center justify-center"
            : "bg-gray-100 py-5 px-6"
        }`}
      >
        <h3
          className={`font-bold text-center ${
            categoryId
              ? "text-white drop-shadow-md font-['Sedgwick_Ave_Display'] text-6xl lg:text-9xl"
              : "text-black text-2xl sm:text-3xl lg:text-4xl"
          }`}
        >
          {categoryId ? categoryId : "Nuestro Catálogo"}
        </h3>
      </div>

      {/* renderizado de productos */}
      <div className="flex flex-wrap justify-center gap-6 px-4 sm:px-6 lg:px-10 mb-6">
        {currentProducts.map((product) => (
          <div
            className="w-full sm:w-1/2 lg:w-1/3 xl:w-1/4 2xl:w-1/5 flex justify-center"
            key={product.id}
          >
            <CardProduct product={product} />
          </div>
        ))}
      </div>

      {/* Botones de paginación */}
      {totalPages > 1 && (
        <div className="flex justify-center gap-3 mb-10">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-4 cursor-pointer py-2 rounded ${
                currentPage === i + 1
                  ? "bg-yellow-400 text-black font-bold"
                  : "bg-gray-300 text-black hover:bg-gray-300"
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ItemListContainer;
