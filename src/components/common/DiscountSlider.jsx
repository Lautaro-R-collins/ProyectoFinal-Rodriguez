// src/components/home/DiscountSlider.jsx
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { db } from "../../services/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";

// Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

const DiscountSlider = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const productsRef = collection(db, "products");

    getDocs(productsRef)
      .then((resp) => {
        const discounted = resp.docs
          .map((doc) => ({ id: doc.id, ...doc.data() }))
          .filter((p) => p.discountPrice); // filtrar solo productos con descuento
        setProducts(discounted);
      })
      .catch((error) =>
        console.error("Error cargando productos con descuento:", error)
      );
  }, []);

  if (products.length === 0) return null;

  return (
    <div className="relative my-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-10">
      <h2 className="text-3xl text-black font-bold text-center mb-6">
        Ofertas del dia
      </h2>

      <div className="relative max-w-6xl mx-auto bg-white rounded-2xl shadow-md p-6 md:p-10">
        <Swiper
          modules={[Navigation]}
          spaceBetween={14}
          navigation
          loop={true}
          centeredSlides={false}
          breakpoints={{
            320: { slidesPerView: 1.2 },
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
            1440: { slidesPerView: 4 },
          }}
        >
          {products.map((product) => (
            <SwiperSlide key={product.id} className="flex justify-center">
              <div className="bg-white rounded-xl shadow-md overflow-hidden max-w-[220px] w-full">
                <img
                  src={product.imageUrl || "https://via.placeholder.com/200"}
                  alt={product.title}
                  className="w-full h-40 object-cover bg-gray-100"
                />
                <div className="p-3 flex flex-col gap-2">
                  <h3 className="text-sm font-semibold truncate text-center">
                    {product.title}
                  </h3>
                  <div className="flex items-center justify-center gap-2">
                    <p className="text-gray-500 text-sm line-through">
                      ${product.price}
                    </p>
                    <p className="text-lg font-bold text-green-600">
                      ${product.discountPrice}
                    </p>
                  </div>
                  <Link
                    to={`/item/${product.id}`}
                    className="mt-2 text-center bg-yellow-400 text-black text-sm py-1 px-2 rounded-md font-semibold hover:bg-yellow-500 transition-colors"
                  >
                    Ver detalle
                  </Link>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default DiscountSlider;
