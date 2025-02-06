import { Routes, Route, useLocation } from "react-router-dom";
import { Homepage, AboutPage, ContactsPage, PerfumePage } from "./pages";
import { Header, Footer } from "./components";
import { useEffect } from "react";

function App() {
  const location = useLocation();

  useEffect(() => {
    gtag('event', 'page_view', {
      page_path: location.pathname + location.search,
    });
  }, [location]);

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
