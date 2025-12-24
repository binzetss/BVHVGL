import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import FloatingContact from "./components/FloatingContact/FloatingContact";
import "./styles/responsive.css";

import Home from "./pages/Home/Home";

function App() {
  return (
    <Router>
      {/* HEADER */}
      <Header />
     <FloatingContact /> 
      {/* PAGE CONTENT */}
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>

      {/* FOOTER */}
      <Footer />
    </Router>
  );
}

export default App;
