import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { FaCalendar, FaClock, FaTag, FaTwitter, FaFacebookF, FaLinkedinIn, FaLink, FaShare } from 'react-icons/fa';
import { toast } from 'react-toastify';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import 'react-toastify/dist/ReactToastify.css';
import './BlogPost.css';
import axios from 'axios';

// Quill editor modules/formats configuration
const modules = {
  toolbar: false, // Disable toolbar for read-only mode
  clipboard: {
    matchVisual: false
  }
};

const formats = [
  'header',
  'bold', 'italic', 'underline', 'strike',
  'list', 'bullet',
  'link', 'image',
  'color', 'background'
];

const BlogPost = () => {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [relatedPosts, setRelatedPosts] = useState([]);

  useEffect(() => {
    const fetchPost = async () => {
      setLoading(true);
      try {
        // Get all posts
        const response = await axios.get('/api/blogs');
        const allPosts = response.data;
        const currentPost = allPosts.find(p => p._id === slug || p.slug === slug);
        
      if (currentPost) {
          // Ensure post has a category
          setPost({
            ...currentPost,
            category: currentPost.category || 'Web Development'
          });
        // Get related posts based on category (excluding current post)
          const related = allPosts
            .filter(p => 
              p.category === currentPost.category && 
              p._id !== currentPost._id &&
              p.status === 'published'
            )
          .slice(0, 3);
        setRelatedPosts(related);
          setError(null);
      } else {
        setError('Post not found');
        }
      } catch (error) {
        console.error('Error fetching post:', error);
        setError('Failed to load the blog post. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [slug]);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const calculateReadTime = (content) => {
    const wordsPerMinute = 200;
    const words = content.split(/\s+/).length;
    return Math.ceil(words / wordsPerMinute);
  };

  const handleShare = async (platform) => {
    if (!post) return;
    
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
      <div className="blog-post-container">
        <div className="loading-state">
          <div className="loading-spinner"></div>
          <p>Loading post...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="blog-post-container">
        <div className="error-state">
          <p>{error}</p>
          <Link to="/blog" className="back-to-blog">
            Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  if (!post) return null;

  return (
    <div className="blog-post-container">
      <Helmet>
        <title>{post.title} | Blog</title>
        <meta name="description" content={post.content.substring(0, 155)} />
      </Helmet>

      <article className="blog-post">
        <div className="post-header">
          <h1>{post.title}</h1>
          
          <div className="post-meta">
            <div className="meta-left">
              <div className="author-info">
                <img 
                  src={post.authorImage || 'https://via.placeholder.com/40'} 
                  alt={post.authorName || 'Author'} 
                  className="author-avatar"
                />
                <span className="author-name">{post.authorName || 'Anonymous'}</span>
              </div>
              <span className="post-date">
                <FaCalendar /> {formatDate(post.createdAt)}
              </span>
              <span className="post-read-time">
                <FaClock /> {calculateReadTime(post.content)} min read
              </span>
              <span className="post-category">
                <FaTag /> {post.category || 'Uncategorized'}
              </span>
            </div>
            
            <div className="share-section">
              <span className="share-label">
                <FaShare /> Share
              </span>
              <div className="share-buttons">
                <button 
                  onClick={() => handleShare('twitter')}
                  className="share-button twitter"
                  aria-label="Share on Twitter"
                >
                  <FaTwitter />
                </button>
                <button 
                  onClick={() => handleShare('facebook')}
                  className="share-button facebook"
                  aria-label="Share on Facebook"
                >
                  <FaFacebookF />
                </button>
                <button 
                  onClick={() => handleShare('linkedin')}
                  className="share-button linkedin"
                  aria-label="Share on LinkedIn"
                >
                  <FaLinkedinIn />
                </button>
                <button 
                  onClick={() => handleShare('copy')}
                  className="share-button copy"
                  aria-label="Copy Link"
                >
                  <FaLink />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="post-featured-image">
          <img src={post.featuredImage || post.image} alt={post.title} />
        </div>

        <div className="post-content">
          <ReactQuill
            theme="snow"
            value={post.content}
            modules={modules}
            formats={formats}
            readOnly={true}
            style={{ height: 'auto' }}
          />
        </div>
      </article>

      {relatedPosts.length > 0 && (
        <div className="related-posts">
          <h2>Related Posts</h2>
          <div className="related-posts-grid">
            {relatedPosts.map(relatedPost => (
              <Link 
                to={`/post/${relatedPost.slug}`} 
                key={relatedPost._id}
                className="related-post-card"
              >
                <img src={relatedPost.image} alt={relatedPost.title} />
                <div className="related-post-content">
                  <h3>{relatedPost.title}</h3>
                  <p>{relatedPost.content.substring(0, 100)}...</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default BlogPost; 