import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NavBar from './components/layout/NavBar';
import ItemListContainer from './components/pages/ItemListContainer';
import ItemDetailContainer from './components/pages/ItemDetailContainer';
import NotFound from './components/pages/NotFound';

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<ItemListContainer mensaje="Bienvenidos a nuestra tienda online" />} />
        <Route path="/category/:categoryId" element={<ItemListContainer />} />
        <Route path="/item/:itemId" element={<ItemDetailContainer />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
