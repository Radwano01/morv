import { Routes, Route } from "react-router-dom";
import MainPage from "./pages/MainPage";
import Contact from "./pages/Contact";
import Services from "./pages/Services";
import Service from "./pages/Service";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Navbar from "./components/Navbar";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/services" element={<Services />} />
        <Route path="/service/:id" element={<Service />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
      </Routes>
    </>
  );
}

export default App;
