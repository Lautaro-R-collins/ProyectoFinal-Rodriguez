const HomeBanner = () => {
  return (
    <div className="bg-black bg-opacity-50 p-6 text-center">
      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#E6CA4D] mb-4">
        ¡Descubre nuestra nueva colección de verano!
      </h2>
      <p className="text-white mb-6">
        Ropa cómoda y moderna para toda la familia. Aprovecha los descuentos
        exclusivos.
      </p>
      <a
        href="/category/Verano"
        className="inline-block px-6 py-3 bg-[#E6CA4D] text-black font-semibold rounded-md hover:bg-yellow-500 transition-colors duration-200"
      >
        Ver colección
      </a>
    </div>
  );
};

export default HomeBanner;
