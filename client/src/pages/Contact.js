import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import emailjs from "@emailjs/browser";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Contact.css";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  // Handle Input Change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle Form Submit
  const handleSubmit = (e) => {
    e.preventDefault();

    const serviceID = "service_yyytigk"; // Replace with your EmailJS Service ID
    const templateID = "template_fd4w20d"; // Replace with your EmailJS Template ID
    const publicKey = "zYu6Ds-u7yBpEi8--"; // Replace with your EmailJS Public Key

    // Send Email via EmailJS
    emailjs
      .send(serviceID, templateID, formData, publicKey)
      .then((response) => {
        console.log("SUCCESS!", response.status, response.text);
        toast.success("Message sent successfully!");
        setFormData({ name: "", email: "", message: "" }); // Reset form
      })
      .catch((err) => {
        console.error("FAILED...", err);
        toast.error("Failed to send message!");
      });
  };

  return (
    <div className="contact">
      {/* SEO Optimization */}
      <Helmet>
        <title>Contact Me - Get in Touch</title>
        <meta 
          name="description" 
          content="Have a project or idea? Contact me now for web development, SEO, and design services. Let's build something amazing together!"
        />
        <meta 
          name="keywords" 
          content="Contact Web Developer, Web Design Inquiry, React Developer, SEO Services, JavaScript, Email Contact"
        />
        <meta name="author" content="Mohd Noman Qadri" />
        <meta property="og:title" content="Contact Me - Web Developer" />
        <meta 
          property="og:description" 
          content="Reach out to discuss web development, SEO, and project collaborations."
        />
        <meta property="og:type" content=" Freelancing website" />
      </Helmet>

      <div className="contact-container">
        <div className="contact-info">
          <h3>Quick Contact</h3>
          <h1>Leave a Message</h1>
          <p>Let’s turn your ideas into a website that clicks! 🖱️💡</p>
        </div>
        <form onSubmit={handleSubmit} className="contact-form">
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            required
            value={formData.name}
            onChange={handleChange}
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            required
            value={formData.email}
            onChange={handleChange}
          />
          <textarea
            name="message"
            placeholder="Your Message"
            required
            value={formData.message}
            onChange={handleChange}
          ></textarea>
          <button type="submit">SUBMIT</button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
