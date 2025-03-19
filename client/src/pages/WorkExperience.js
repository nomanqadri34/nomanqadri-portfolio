import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import { 
  FaHtml5, FaCss3Alt, FaJs, FaReact, FaNodeJs, 
  FaGithub, FaSchool, FaGraduationCap, FaUniversity, FaBriefcase 
} from "react-icons/fa";
import { SiExpress, SiMongodb } from "react-icons/si";
import "./WorkExperience.css";

const SkillsExperience = () => {
  const [activeTab, setActiveTab] = useState("experience");

  const skills = [
    { icon: <FaHtml5 size={30} color="#E44D26" />, percent: 95, color: "#E44D26" },
    { icon: <FaCss3Alt size={30} color="#1572B6" />, percent: 85, color: "#1572B6" },
    { icon: <FaJs size={30} color="#F7DF1E" />, percent: 90, color: "#F7DF1E" },
    { icon: <FaReact size={30} color="#61DAFB" />, percent: 90, color: "#61DAFB" },
    { icon: <FaNodeJs size={30} color="#339933" />, percent: 95, color: "#339933" },
    { icon: <SiExpress size={30} color="#000000" />, percent: 85, color: "#000000" },
    { icon: <SiMongodb size={30} color="#47A248" />, percent: 90, color: "#47A248" },
    { icon: <FaGithub size={30} color="#000000" />, percent: 95, color: "#000000" },
   
  ];

  const experiences = [
    {
      icon: <FaBriefcase size={30} color="#ff5733" />,
      title: "Data Annotator",
      company: "Han Digital Solution Pvt Ltd",
      duration: "July 2024 - Sept 2024",
    },
    {
      icon: <FaBriefcase size={30} color="#ff5733" />,
      title: "Web Developer Intern",
      company: "CodeSpaze",
      duration: "Oct 2024 - Dec 2024",
    },
  ];

  const education = [
    { icon: <FaSchool size={30} color="#ff5733" />, degree: "High School", institute: "Stepping Stone Inter College, Gorakhpur", year: "2019" },
    { icon: <FaGraduationCap size={30} color="#ffcc00" />, degree: "12th Grade", institute: "N.S Children Academy, Gorakhpur", year: "2021" },
    { icon: <FaUniversity size={30} color="#7b5fce" />, degree: "B.Sc Computer Science", institute: "Integral University, Lucknow", year: "2024" },
  ];

  return (
    <div className="skills-container">
      {/* SEO Optimization */}
      <Helmet>
        <title>Skills & Experience - Web Developer</title>
        <meta 
          name="description" 
          content="Explore my skills in web development, MERN stack, data annotation, and SEO. View my work experience and educational background in the tech industry."
        />
        <meta 
          name="keywords" 
          content="Web Development, MERN Stack, React, Node.js, MongoDB, SEO, JavaScript, Intern Experience, Data Annotation, Education"
        />
        <meta name="author" content="Mohd Noman Qadri" />
        <meta property="og:title" content="Skills & Experience - Web Developer" />
        <meta 
          property="og:description" 
          content="Showcasing expertise in full-stack web development, education, and work experience in tech."
        />
        <meta property="og:type" content="profile" />
      </Helmet>

      <h2>Skills & Experience</h2>
      <p className="description">
        I have three months of data annotation experience at HAN Digital Solution Pvt. Ltd. and two months of web development experience at CodeSpaze Technologies. 
        I have worked on projects like a Health & Fitness Landing Page, a Learning Management System (MERN stack), and an E-commerce Website with Razorpay integration.
      </p>

      {/* Skills Section */}
      <div className="skills-section">
        <h3>My Skills</h3>
        <div className="skills-list">
          {skills.map((skill, index) => (
            <div key={index} className="skill-item">
              <div className="icon">{skill.icon}</div>
              <span>{skill.percent}%</span>
              <div className="progress-bar">
                <div
                  className="progress"
                  style={{ width: `${skill.percent}%`, backgroundColor: skill.color }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Tabs */}
      <div className="tabs">
        <button className={activeTab === "experience" ? "active" : ""} onClick={() => setActiveTab("experience")}>
          Experience
        </button>
        <button className={activeTab === "education" ? "active" : ""} onClick={() => setActiveTab("education")}>
          Education
        </button>
      </div>

      {/* Experience & Education Sections */}
      <div className="info-section">
        {activeTab === "experience" &&
          experiences.map((exp, index) => (
            <div key={index} className="info-item">
              <div className="icon">{exp.icon}</div>
              <div>
                <h4>{exp.title}</h4>
                <span className="duration">{exp.duration}</span>
                <p className="company">{exp.company}</p>
              </div>
            </div>
          ))}

        {activeTab === "education" &&
          education.map((edu, index) => (
            <div key={index} className="info-item">
              <div className="icon">{edu.icon}</div>
              <div>
                <h4>{edu.degree}</h4>
                <span className="year">{edu.year}</span>
                <p className="institute">{edu.institute}</p>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default SkillsExperience;


