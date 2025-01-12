import React from "react";
import { Routes, Route } from "react-router";
import { Homepage, About, Contacts, Favourite, Parfume } from "./pages";
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
          <Route path="favourite" element={<Favourite />} />
          {/* Dynamic route for parfumes */}
          <Route path="parfumes/:parfume_id" element={<Parfume />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
}

export default App;
