import Logo from "../../assets/Logo/logoUrban.png";

const Footer = () => {
  return (
    <footer className="bg-black text-white py-8">
      <div className="container mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-6">
        {/* Logo */}
        <div className="flex items-center justify-center sm:justify-start">
          <img src={Logo} alt="Logo" className="h-10 w-auto" />
        </div>

        {/* Derechos */}
        <p className="text-center sm:text-right text-sm text-gray-400">
          © {new Date().getFullYear()} Urban Style. Todos los derechos
          reservados.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
