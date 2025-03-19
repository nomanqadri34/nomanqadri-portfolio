import React from "react";
import { Helmet } from "react-helmet-async";
import "./About.css";
import cvFile from "../assest/CV2.pdf"; // Place your CV in the assets folder
import profileImage from "../assest/noman1.jpg";

const AboutMe = () => {
  return (
    <section className="about-me">
      {/* SEO Optimization */}
      <Helmet>
        <title>About Me - Mohd Noman Qadri</title>
        <meta name="description" content="Learn more about Mohd Noman Qadri, a passionate web developer from India. Skilled in MERN stack, data annotation, and web development projects." />
        <meta name="keywords" content="Mohd Noman Qadri, Web Developer, MERN Stack, Portfolio, Integral University, PW Skills, CodeSpaze Technologies, Data Annotation" />
        <meta name="author" content="Mohd Noman Qadri" />
        <meta property="og:title" content="About Me - Mohd Noman Qadri" />
        <meta property="og:description" content="Explore the journey of Mohd Noman Qadri, a web developer passionate about building applications with MERN stack and more." />
        <meta property="og:image" content={profileImage} />
        <meta property="og:type" content="website" />
      </Helmet>

      <div className="about-container">
        
        {/* Profile Image on Top */}
        <div className="about-image">
          <img src={profileImage} alt="Profile" />
        </div>

        {/* Content Section */}
        <div className="about-content">
          <h4>Who Am I ?</h4>
          <h2>About <span>Me</span></h2>
          <p>
            My name is Mohd Noman Qadri, and I am from Gorakhpur, India. I completed my B.Sc. in Computer Science from Integral University, Lucknow. 
            I have 3 months of experience in data annotation at HAN Digital Solutions Private Limited and 2 months of experience in web development at 
            CodeSpaze Technologies. My first project was a Health & Fitness Landing Page using HTML & CSS, followed by a Learning Management System (LMS) 
            built with the MERN stack during my learning journey at PW Skills. My third project was a full-fledged E-commerce website using MERN stack, 
            which included user authentication, an admin panel, and Razorpay payment integration. I am passionate about web development and always eager 
            to learn and build innovative applications.
          </p>
          <a href={cvFile} download="CV2.pdf" className="download-btn">
            Download CV
          </a>
        </div>

      </div>
    </section>
  );
};

export default AboutMe;


