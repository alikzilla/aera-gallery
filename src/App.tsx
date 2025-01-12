import React from "react";
import { Routes, Route } from "react-router";
import { Homepage, About, Contacts, Favourite, Parfume } from "./pages";
import { Header, Footer } from "./components";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route index element={<Homepage />} />
        <Route path="about" element={<About />} />
        <Route path="contacts" element={<Contacts />} />
        <Route path="favourite" element={<Favourite />} />
        {/* Dynamic route for parfumes */}
        <Route path="parfumes/:parfume_id" element={<Parfume />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
