import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "./components/common/NavBar.jsx";
import MainLayout from "./components/layout/MainLayout.jsx";
import DiscountSlider from "./components/common/DiscountSlider.jsx";
import ItemListContainer from "./components/pages/ItemListContainer";
import ItemDetailContainer from "./components/pages/ItemDetailContainer";
import NotFound from "./components/pages/NotFound";
import Cart from "./components/pages/Cart";
import CheckoutForm from "./components/pages/CheckoutForm";
import CarruselText from "./components/common/CarruselText";
import CarruselImg from "./components/common/CarruselImg";
import HomeBanner from "./components/common/HomeBanner.jsx";
import BackFeatures from "./components/common/BackFeatures.jsx";
import Favorite from "./components/pages/Favorite.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <CarruselText />
      <Routes>
        {/* Ruta Home */}
        <Route
          path="/"
          element={
            <MainLayout>
              <CarruselImg />
              <DiscountSlider />
              <ItemListContainer />
              <HomeBanner />
              <BackFeatures />
            </MainLayout>
          }
        />

        {/* Otras rutas */}
        <Route
          path="/category/:categoryId"
          element={
            <MainLayout>
              <ItemListContainer />
              <BackFeatures />
            </MainLayout>
          }
        />

        <Route
          path="/item/:itemId"
          element={
            <MainLayout>
              <ItemDetailContainer />
            </MainLayout>
          }
        />

        <Route
          path="/cart"
          element={
            <MainLayout>
              <Cart />
            </MainLayout>
          }
        />

        <Route
          path="/checkout"
          element={
            <MainLayout>
              <CheckoutForm />
            </MainLayout>
          }
        />

        <Route
          path="/favorites"
          element={
            <MainLayout>
              <Favorite />
            </MainLayout>
          }
        />

        <Route
          path="*"
          element={
            <MainLayout>
              <NotFound />
            </MainLayout>
          }
        />
      </Routes>
      <ToastContainer position="top-right" autoClose={2000} />
    </BrowserRouter>
  );
}

export default App;
