import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "./components/common/NavBar.jsx";
import MainLayout from "./components/layout/MainLayout.jsx";
import ItemListContainer from "./components/pages/ItemListContainer";
import ItemDetailContainer from "./components/pages/ItemDetailContainer";
import NotFound from "./components/pages/NotFound";
import Cart from "./components/pages/Cart";
import CheckoutForm from "./components/pages/CheckoutForm";
import CarruselText from "./components/common/CarruselText";
import CarruselImg from "./components/common/CarruselImg";
import Features from "./components/common/Features.jsx";
import HomeBanner from "./components/common/HomeBanner.jsx";
import BackFeatures from "./components/common/BackFeatures.jsx";

function App() {
  return (
    <BrowserRouter>
    <CarruselText />
      <NavBar />
      
      <Routes>
        {/* Ruta Home */}
        <Route
          path="/"
          element={
            <MainLayout>
              <CarruselImg />
              <Features />
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

        {/* Ruta 404 */}
        <Route
          path="*"
          element={
            <MainLayout>
              <NotFound />
            </MainLayout>
          }
        />
      </Routes>
      
    </BrowserRouter>
    
  );
}

export default App;
