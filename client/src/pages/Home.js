import React, { useState, useEffect, useRef } from "react";
import { FaGithub } from "react-icons/fa";
import { Helmet } from "react-helmet-async";
import "./Home.css";

const projects = [
  {
    id: 1,
    title: "Blog-Website",
    category: "web",
    tech: "React.js, Node.js, MongoDB ,Firebase",
    github: "https://github.com/nomanqadri34/alqadriblog",
    video: "/blog1.mp4",
  },
  {
    id: 2,
    title: "Learning-Mangement",
    category: "web",
    tech: "React.js, Node.js, MongoDB",
    github: "https://github.com/nomanqadri34/Lms",
    video: "/l1.mp4",
  },
  

  {
    id: 4,
    title: "Car Rental",
    category: "web",
    tech: "MongoDB,Express,React,Node ",
    github: "https://github.com/nomanqadri34/al-qadri-car-frontend",
    video: "/car11.mp4",
  },
  {
    id: 5,
    title: "Gym Landing page",
    category: "word",
    tech: "HTML,CSS,Javascript ",
    github: "https://github.com/nomanqadri34/Gym-landing-page",
    video: "/gym1.mp4",
  },
  {
    id: 6,
    title: " Personal Portfolio",
    category: "word",
    tech: "HTML,CSS,Javascript ",
    github: "https://github.com/nomanqadri34/al-qadri-portfolio",
    video: "/p1.mp4",
  },
];

 // Function to open WhatsApp chat
 const handleWhatsAppClick = () => {
  const phoneNumber = "+918957582590"; // Replace with your actual WhatsApp number
  const message = encodeURIComponent("Hello! I'm interested in your Profile.");
  window.open(`https://wa.me/${phoneNumber}?text=${message}`, "_blank");
};
const Home = () => {
  const [filter, setFilter] = useState("all");
  const [selectedProject, setSelectedProject] = useState(null);
  const [text, setText] = useState("");

  const phrases = ["Create. Build. Debug Your Website.", "Bring Your Ideas to Life.", "Let's Build Something Great!"];
  const indexRef = useRef(0);
  const charIndexRef = useRef(0);
  const isDeletingRef = useRef(false);

  useEffect(() => {
    const typingEffect = setInterval(() => {
      let currentIndex = indexRef.current;
      let currentCharIndex = charIndexRef.current;
      let isDeleting = isDeletingRef.current;

      if (!isDeleting) {
        setText((prev) => prev + phrases[currentIndex][currentCharIndex]);
        charIndexRef.current++;

        if (charIndexRef.current === phrases[currentIndex].length) {
          isDeletingRef.current = true;
          setTimeout(() => {}, 2000);
        }
      } else {
        setText((prev) => prev.slice(0, -1));
        charIndexRef.current--;

        if (charIndexRef.current === 0) {
          isDeletingRef.current = false;
          indexRef.current = (indexRef.current + 1) % phrases.length;
        }
      }
    }, 100);

    return () => clearInterval(typingEffect);
    // eslint-disable-next-line
  }, []);

  const filteredProjects = filter === "all" ? projects : projects.filter((p) => p.category === filter);

  return (
    <div className="home-container">
      {/* SEO Metadata */}
      <Helmet>
    <title>Al Qadri Dev - Expert Web Development Services</title>

        <title> Freelancing Portfolio | Web & App Development Projects</title>
        <meta name="description" content="Explore my Al Qadri Dev portfolio of web and mobile app development projects." />
        <meta name="keywords" content="Al Qadri Dev portfolio, web development, app development, MERN React, Node.js, projects" />
      </Helmet>

      {/* Welcome Section */}
      <div className="welcome-section">
        <h1>Welcome to My Portfolio & Freelancing Work</h1>
        <p className="typing-text">{text}<span className="cursor"></span></p>
        <button className="hire-me"  onClick={handleWhatsAppClick}>Hire Me</button>
      </div>

      {/* Filter Buttons */}
      <div className="filter-buttons">
        <button onClick={() => setFilter("all")} className={filter === "all" ? "active" : ""}>All Projects</button>
        <button onClick={() => setFilter("web")} className={filter === "web" ? "active" : ""}> MERN Development</button>
       
        <button onClick={() => setFilter("word")} className={filter === "word" ? "active" : ""}>Landing page</button>
      </div>

      {/* Projects Section */}
      <div className="projects-container">
        {filteredProjects.length > 0 ? (
          filteredProjects.map((project) => (
            <div key={project.id} className="project-card" onClick={() => setSelectedProject(project)}>
              <h3>{project.title}</h3>
              <p>{project.tech}</p>
              <a href={project.github} target="_blank" rel="noopener noreferrer" className="github-button">
                <FaGithub size={24} />
              </a>
            </div>
          ))
        ) : (
          <p className="no-projects">No projects found in this category.</p>
        )}
      </div>

      {/* Modal for Video */}
      {selectedProject && (
        <div className="modal">
          <div className="modal-content">
            <h2>{selectedProject.title}</h2>
            <video width="100%" controls autoPlay>
              <source src={selectedProject.video} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <button className="close-button" onClick={() => setSelectedProject(null)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;


