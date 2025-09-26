import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { CartProvider } from "./context/CartContext.jsx";
import Footer from "./components/common/Footer.jsx";

createRoot(document.getElementById("root")).render(
  <CartProvider>
    <App />
    <Footer />
  </CartProvider>
);
