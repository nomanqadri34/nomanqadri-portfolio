import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
// eslint-disable-next-line
import { FaCode, FaLaptopCode, FaMobileAlt, FaServer, FaDatabase, FaCloud, FaRobot, FaPaperPlane, FaTwitter, FaFacebookF, FaLinkedinIn, FaLink } from 'react-icons/fa';
import { toast } from 'react-toastify';
import emailjs from '@emailjs/browser';
import 'react-toastify/dist/ReactToastify.css';
import './Blog.css';
import axios from 'axios';

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [guestBloggerForm, setGuestBloggerForm] = useState({
    name: '',
    email: '',
    topic: '',
    message: ''
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const postsPerPage = 6;

  const categories = ['All', 'Web Development', 'App Development', 'AI'];

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const response = await axios.get('https://alqadridev.onrender.com/api/blogs');
        // Filter only published posts for public view and ensure they have categories
        const publishedPosts = response.data
          .filter(post => post.status === 'published')
          .map(post => ({
            ...post,
            category: post.category || 'Web Development' // Provide default category if missing
          }));
        setPosts(publishedPosts);
        setError(null);
      } catch (error) {
        console.error('Error fetching posts:', error);
        setError('Failed to load blog posts. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  // Function to get category icon based on category name
  const getCategoryIcon = (category) => {
    switch (category) {
      case 'Web Development':
        return <FaLaptopCode />;
      case 'App Development':
        return <FaMobileAlt />;
      case 'AI':
        return <FaRobot />;
      default:
        return <FaCode />;
    }
  };

  // Filter posts by category
  const filteredPosts = selectedCategory === 'All' 
    ? posts 
    : posts.filter(post => post.category && post.category === selectedCategory);

  // Get current posts for pagination
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);

  // Function to calculate read time based on content length
  const calculateReadTime = (content) => {
    return `${(content.length / 1000).toFixed(0)} mins read`;
  };

  // Function to strip HTML tags
  const stripHtmlTags = (html) => {
    if (!html) return '';
    return html.replace(/<[^>]*>/g, '');
  };

  const handleGuestBloggerSubmit = async (e) => {
    e.preventDefault();
    if (!guestBloggerForm.email || !guestBloggerForm.name || !guestBloggerForm.topic) {
      toast.error('Please fill in all required fields');
      return;
    }

    setSubmitting(true);

    try {
      const templateParams = {
        from_name: guestBloggerForm.name,
        from_email: guestBloggerForm.email,
        topic: guestBloggerForm.topic,
        message: guestBloggerForm.message || 'No additional message provided',
        to_name: 'Blog Admin'
      };

      await emailjs.send(
        "service_yyytigk",
        "template_fd4w20d",
        templateParams,
        "zYu6Ds-u7yBpEi8--"
      );

      toast.success('Thank you for your interest in guest blogging!');
      toast.info('Our team will review your request and contact you soon.', {
        delay: 1000
      });

      setGuestBloggerForm({
        name: '',
        email: '',
        topic: '',
        message: ''
      });
    } catch (error) {
      toast.error('Failed to send request. Please try again later.');
      console.error('EmailJS Error:', error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setGuestBloggerForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Category filter handler
  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  // Pagination controls
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleShare = async (platform, post) => {
    const baseUrl = window.location.origin;
    const postUrl = `${baseUrl}/post/${post.slug}`;
    const text = `Check out this article: ${post.title}`;

    switch (platform) {
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(postUrl)}`, '_blank');
        break;
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(postUrl)}`, '_blank');
        break;
      case 'linkedin':
        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(postUrl)}`, '_blank');
        break;
      case 'copy':
        try {
          await navigator.clipboard.writeText(postUrl);
          toast.success('Link copied to clipboard!');
        } catch (err) {
          toast.error('Failed to copy link');
        }
        break;
      default:
        break;
    }
  };

  if (loading) {
    return (
      <div className="blog-container">
        <div className="loading-state">
          <div className="loading-spinner"></div>
          <p>Loading posts...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="blog-container">
        <div className="error-state">
          <p>Error: {error}</p>
          <button onClick={() => window.location.reload()}>Try Again</button>
        </div>
      </div>
    );
  }

  return (
    <div className="blog-container">
      <Helmet>
        <title>Blog | Web Development, App Development, and AI Insights</title>
        <meta name="description" content="Read about web development, app development, AI, and the latest tech trends." />
        <meta name="keywords" content="web development, app development, artificial intelligence, programming blog" />
      </Helmet>

      <div className="blog-hero">
        <div className="hero-content">
          <h1>Exploring Tech Frontiers</h1>
          <p className="hero-subtitle">Dive into expert insights on Web Development, Mobile Apps, and Artificial Intelligence</p>
          <div className="hero-stats">
            <div className="stat-item">
              <span className="stat-number">{posts.length}</span>
              <span className="stat-label">Articles</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">{categories.length - 1}</span>
              <span className="stat-label">Categories</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">Weekly</span>
              <span className="stat-label">Updates</span>
            </div>
          </div>
        </div>
        <div className="hero-overlay"></div>
      </div>

      <div className="category-filter">
        {categories.map(category => (
          <button
            key={category}
            onClick={() => handleCategoryChange(category)}
            className={`category-button ${selectedCategory === category ? 'active' : ''}`}
          >
            {getCategoryIcon(category)} {category}
          </button>
        ))}
      </div>

      <div className="blog-grid">
        {currentPosts.map(post => (
          <article key={post._id} className="blog-card">
            <div className="blog-image">
              <img src={post.featuredImage || post.image} alt={post.title} />
              <div className="blog-category-icon">
                {getCategoryIcon(post.category)}
              </div>
            </div>
            <div className="blog-content">
              <div className="blog-meta">
                <span className="blog-category">
                  {post.category || 'Uncategorized'}
                </span>
                <span className="blog-date">{new Date(post.createdAt).toLocaleDateString()}</span>
                <span className="blog-read-time">{calculateReadTime(stripHtmlTags(post.content))}</span>
              </div>
              <h2>{stripHtmlTags(post.title)}</h2>
              <p>{stripHtmlTags(post.content).substring(0, 150)}...</p>
              <div className="blog-actions">
                <Link to={`/post/${post._id}`} className="read-more">
                  Read More 
                  <span className="arrow">→</span>
                </Link>
                <div className="share-buttons">
                  <button 
                    onClick={() => handleShare('twitter', post)}
                    className="share-button twitter"
                    aria-label="Share on Twitter"
                  >
                    <FaTwitter />
                  </button>
                  <button 
                    onClick={() => handleShare('facebook', post)}
                    className="share-button facebook"
                    aria-label="Share on Facebook"
                  >
                    <FaFacebookF />
                  </button>
                  <button 
                    onClick={() => handleShare('linkedin', post)}
                    className="share-button linkedin"
                    aria-label="Share on LinkedIn"
                  >
                    <FaLinkedinIn />
                  </button>
                  <button 
                    onClick={() => handleShare('copy', post)}
                    className="share-button copy"
                    aria-label="Copy Link"
                  >
                    <FaLink />
                  </button>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Pagination */}
      <div className="pagination">
        <button 
          onClick={() => handlePageChange(currentPage - 1)} 
          disabled={currentPage === 1}
          className="pagination-button"
        >
          Previous
        </button>
        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index + 1}
            onClick={() => handlePageChange(index + 1)}
            className={`pagination-button ${currentPage === index + 1 ? 'active' : ''}`}
          >
            {index + 1}
          </button>
        ))}
        <button 
          onClick={() => handlePageChange(currentPage + 1)} 
          disabled={currentPage === totalPages}
          className="pagination-button"
        >
          Next
        </button>
      </div>

      {/* Guest Blogger Section */}
      <div className="guest-blogger-section">
        <h3>Want to Be a Guest Blogger?</h3>
        <p>Share your expertise with our community. We welcome guest posts on Web Development, App Development, and AI.</p>
        
        <form onSubmit={handleGuestBloggerSubmit} className="guest-blogger-form">
          <div className="form-group">
            <input
              type="text"
              name="name"
              placeholder="Your Name *"
              value={guestBloggerForm.name}
              onChange={handleInputChange}
              required
              disabled={submitting}
            />
          </div>
          <div className="form-group">
            <input
              type="email"
              name="email"
              placeholder="Your Email *"
              value={guestBloggerForm.email}
              onChange={handleInputChange}
              required
              disabled={submitting}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              name="topic"
              placeholder="Proposed Topic *"
              value={guestBloggerForm.topic}
              onChange={handleInputChange}
              required
              disabled={submitting}
            />
          </div>
          <div className="form-group">
            <textarea
              name="message"
              placeholder="Brief description of your blog post idea (optional)"
              value={guestBloggerForm.message}
              onChange={handleInputChange}
              rows="4"
              disabled={submitting}
            ></textarea>
          </div>
          <button 
            type="submit" 
            className={`submit-button ${submitting ? 'submitting' : ''}`}
            disabled={submitting}
          >
            <span className="button-content">
              <FaPaperPlane className="submit-icon" />
              {submitting ? 'Sending...' : 'Submit Guest Post Request'}
            </span>
          </button>
        </form>
      </div>
    </div>
  );
};

export default Blog; 