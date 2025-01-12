import React from "react";
import { Routes, Route } from "react-router-dom"; 
import { Homepage, About, Contacts, ProductPage } from "./pages";
import { Header, Footer } from "./components";

function App() {
  return (
    <>
      <Header />
      <div className="pt-[60px]">
        <Routes>
          <Route index element={<Homepage />} />
          <Route path="about" element={<About />} />
          <Route path="contacts" element={<Contacts />} />
          <Route path="perfumes/:id" element={<ProductPage />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
}

export default App;
