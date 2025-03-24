import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import Toast CSS

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import WorkExperience from "./pages/WorkExperience";
import Contact from "./pages/Contact";
import TeamMembers from "./pages/team";
import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import ProtectedRoute from "./components/ProtectedRoute";

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
          
          {/* Blog Routes */}
          <Route path="/blog" element={<Blog />} />
          <Route path="/post/:slug" element={<BlogPost />} />
          
          {/* Auth Routes */}
          <Route path="/login" element={<Login />} />
          <Route 
            path="/admin/*" 
            element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            } 
          />
        </Routes>
      </main>
      
      {/* Toast Notification Container */}
      <ToastContainer position="top-right" autoClose={3000} />
      
      <Footer />
    </Router>
  );
}

export default App;

