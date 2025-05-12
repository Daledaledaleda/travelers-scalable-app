import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NFTViewer from "./components/NFTViewer";
import NFTGallery from "./components/NFTGallery";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<NFTGallery />} />
        <Route path="/:id" element={<NFTViewer />} />
        <Route path="*" element={<h1 style={{ textAlign: "center", marginTop: "3rem" }}>404 – Page not found</h1>} />
      </Routes>
    </Router>
  );
}

export default App;

