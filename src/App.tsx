import { Routes, Route } from "react-router-dom";
import { Homepage, AboutPage, ContactsPage, PerfumePage } from "./pages";
import { Header, Footer } from "./components";

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <div className="flex-grow pt-[60px]">
        <Routes>
          <Route index element={<Homepage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="contacts" element={<ContactsPage />} />
          <Route path="perfumes/:sheetName/:id" element={<PerfumePage />} />
        </Routes>
      </div>

      <Footer />
    </div>
  );
}

export default App;
