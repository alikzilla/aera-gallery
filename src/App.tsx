import React from "react";
import { Routes, Route } from "react-router-dom";
import { Homepage, About, Contacts, PerfumePage } from "./pages";
import { Header, Footer } from "./components";
import { FavoriteProvider } from "./components/favorites/favorites";

function App() {
  return (
    <FavoriteProvider>
      <Header />
      <div className="pt-[60px]">
        <Routes>
          <Route index element={<Homepage />} />
          <Route path="about" element={<About />} />
          <Route path="contacts" element={<Contacts />} />
          <Route
            path="perfumes/:sheetName/:id"
            element={<PerfumePage />}
          />
        </Routes>
      </div>
      <Footer />
    </FavoriteProvider>
  );
}

export default App;
