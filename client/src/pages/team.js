import React from "react";
import { Helmet } from "react-helmet-async";
import "./TeamMembers.css"; // Import CSS file
import johnImage from "../assest/so1.png";
import shradha from "../assest/sh1.png";

const teamMembers = [

  {
    name: "Shoib Ahmed",
    course: "Flutter Developer",
    skills: ["Flutter", "Dart", "Firebase", "MySQL", "Android Studio"],
    linkedin: "https://www.linkedin.com/in/shoib-ahmad-788096219/",
    image: johnImage,
  },
  {
    name: "Shraddha Mishra",
    course: "WordPress Developer & SEO Expert",
    skills: ["WordPress", "SEO (On & Off Page)", "Digital Marketing", "HTML", "CSS", "Figma"],
    linkedin: "http://www.linkedin.com/in/shraddha-22bb31298",
    image: shradha,
  },
];

const TeamMembers = () => {
  return (
    <section className="team-section">
      {/* SEO Optimization */}
      <Helmet>
        <title>Meet Our Expert Team - Developers & SEO Experts</title>
        <meta 
          name="description" 
          content="Meet our expert team of developers, SEO specialists, and designers. From Frontend to Flutter development, we bring innovative solutions to your projects."
        />
        <meta 
          name="keywords" 
          content="Our Team, Web Developers, Flutter Developers, SEO Experts, WordPress Developers, Frontend Developers"
        />
        <meta name="author" content="Mohd Noman Qadri" />
        <meta property="og:title" content="Meet Our Expert Team" />
        <meta 
          property="og:description" 
          content="Discover our talented team of developers and SEO specialists."
        />
        <meta property="og:type" content="website" />
      </Helmet>

      <h2 className="team-title">Our Team Members</h2>
      <div className="team-container">
        {teamMembers.map((member, index) => (
          <div key={index} className="team-card">
            <img src={member.image} alt={member.name} className="team-image" />
            <div className="team-overlay">
              <h3>{member.name}</h3>
              <p>{member.course}</p>
              <p className="skills">{member.skills.join(", ")}</p>
              <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="linkedin-btn">
                <img src="https://cdn-icons-png.flaticon.com/512/174/174857.png" alt="LinkedIn" className="linkedin-icon" /> LinkedIn
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TeamMembers;
