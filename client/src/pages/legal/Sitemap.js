import React from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaUser,  FaBlog, FaEnvelope, FaUsers } from 'react-icons/fa';
import './Legal.css';

const Sitemap = () => {
  const siteStructure = [
    {
      title: 'Main Pages',
      icon: <FaHome />,
      links: [
        { to: '/', label: 'Home' },
        { to: '/about', label: 'About' },
        { to: '/contact', label: 'Contact' }
      ]
    },
    
    
    {
      title: 'Blog',
      icon: <FaBlog />,
      links: [
        { to: '/blog', label: 'Blog Home' }
      ]
       
    },
    {
      title: 'Legal',
      icon: <FaUser />,
      links: [
        { to: '/privacy-policy', label: 'Privacy Policy' },
        { to: '/terms-of-service', label: 'Terms of Service' }
      ]
    },
    {
      title: 'Team',
      icon: <FaUsers />,
      links: [
        { to: '/team-member', label: 'Our Team' },
      
      ]
    },
    {
      title: 'Contact',
      icon: <FaEnvelope />,
      links: [
        { to: '/contact', label: 'Contact Us' }
                   
      ]
    }
  ];

  return (
    <div className="legal-page sitemap">
      <div className="legal-header">
        <h1>Sitemap</h1>
        <p>Find everything on our website</p>
      </div>

      <div className="sitemap-content">
        {siteStructure.map((section, index) => (
          <div key={index} className="sitemap-section">
            <div className="section-header">
              <span className="section-icon">{section.icon}</span>
              <h2>{section.title}</h2>
            </div>
            <ul className="sitemap-links">
              {section.links.map((link, linkIndex) => (
                <li key={linkIndex}>
                  <Link to={link.to}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="sitemap-footer">
        <p>Can't find what you're looking for? <Link to="/contact">Contact us</Link></p>
      </div>
    </div>
  );
};

export default Sitemap; 