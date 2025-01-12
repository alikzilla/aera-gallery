import React from "react";
import { Routes, Route } from "react-router-dom"; 
import { Homepage, About, Contacts, Parfume } from "./pages";
import { Header, Footer } from "./components";
import Catalog from "./components/catalog/catalog";
import ProductPage from "./components/product-page/product-page";

function App() {
  return (
    <>
      <Header />
      <div className="pt-[60px]">
        <Routes>
          <Route index element={<Homepage />} />
          <Route path="about" element={<About />} />
          <Route path="contacts" element={<Contacts />} />
          <Route path="catalog" element={<Catalog />} />
          <Route path="parfumes/:parfume_id" element={<Parfume />} />
          <Route path="product/:id" element={<ProductPage />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
}

export default App;
