import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";

import WorkExperience from "./pages/WorkExperience";
import Contact from "./pages/Contact";

import TeamMembers from "./pages/team";

import "./App.css";

function App() {
  return (
    <Router>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          
          <Route path="/work-experience" element={<WorkExperience />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/team-member" element={<TeamMembers />} />
          
   
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
