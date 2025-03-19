import React from "react";
import { Helmet } from "react-helmet-async";
import "./Services.css";
import { 
  FaMobileAlt, FaLaptopCode, FaHtml5, FaPenNib, 
  FaSearch, FaBug, FaFileAlt, FaDatabase 
} from "react-icons/fa"; 
import { FaNodeJs, FaReact } from "react-icons/fa";
import { SiMongodb, SiExpress } from "react-icons/si";
const Services = () => {
  return (
    <section className="services">
      
      {/* SEO Optimization */}
      <Helmet>
        <title>My Services - Web Development & SEO</title>
        <meta 
          name="description" 
          content="Explore professional services including web development, app design, SEO, bug fixing, content writing, and more. Expert solutions for your digital needs."
        />
        <meta 
          name="keywords" 
          content="Web Development, App Design, SEO Services, Bug Fixing, Logo Design, Content Writing, Data Annotation, HTML, CSS, JavaScript"
        />
        <meta name="author" content="Mohd Noman Qadri" />
        <meta property="og:title" content="My Services - Web Development & SEO" />
        <meta 
          property="og:description" 
          content="Offering professional services in website development, SEO optimization, bug fixing, content writing, and more."
        />
        <meta property="og:type" content="website" />
      </Helmet>

      <h2>
        <span>My</span> Services
      </h2>
      
      <div className="service-container">
        <div className="service-card">
          <FaMobileAlt className="service-icon" />
          <h3>App Design</h3>
        </div>
        <div className="service-card">
          <FaLaptopCode className="service-icon" />
          <h3>Website Design</h3>
        </div>
        <div className="service-card">
          <FaHtml5 className="service-icon" />
          <h3>HTML & CSS</h3>
        </div>
        <div className="service-card">
      <div className="service-icons">
        <SiMongodb className="mern-icon mongodb" title="MongoDB" />
        <SiExpress className="mern-icon express" title="Express.js" />
        <FaReact className="mern-icon react" title="React.js" />
        <FaNodeJs className="mern-icon node" title="Node.js" />
      </div>
      <h3>MERN Stack</h3>
    </div>
        <div className="service-card">
          <FaPenNib className="service-icon" />
          <h3>Logo Designing</h3>
        </div>
        <div className="service-card">
          <FaSearch className="service-icon" />
          <h3>SEO in Website</h3>
        </div>
        <div className="service-card">
          <FaBug className="service-icon" />
          <h3>Bug Fixing</h3>
        </div>
        <div className="service-card">
          <FaFileAlt className="service-icon" />
          <h3>Content Writing</h3>
        </div>
        <div className="service-card">
          <FaDatabase className="service-icon" />
          <h3>Data Annotation</h3>
        </div>
      </div>
    </section>
  );
};

export default Services;
