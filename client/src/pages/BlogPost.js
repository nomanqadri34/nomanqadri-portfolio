import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { FaCalendar, FaClock, FaTag, FaTwitter, FaFacebookF, FaLinkedinIn, FaLink, FaShare, FaArrowLeft } from 'react-icons/fa';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import './BlogPost.css';

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
        // First, try to fetch the specific post directly using the ID/slug
        const postResponse = await axios.get(`https://alqadridev.onrender.com/api/blogs/${slug}`);
        
        if (postResponse.data) {
          const currentPost = postResponse.data;
          setPost({
            ...currentPost,
            category: currentPost.category || 'Web Development'
          });
          
          // Then fetch related posts
          const allPostsResponse = await axios.get('https://alqadridev.onrender.com/api/blogs');
          const allPosts = allPostsResponse.data;
          
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
      } catch (postError) {
        console.error('Error fetching specific post:', postError);
        
        // Fallback: Try to find the post in all posts
        try {
          const allPostsResponse = await axios.get('https://alqadridev.onrender.com/api/blogs');
          const allPosts = allPostsResponse.data;
          const currentPost = allPosts.find(p => p._id === slug || p.slug === slug);
          
          if (currentPost) {
            setPost({
              ...currentPost,
              category: currentPost.category || 'Web Development'
            });

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
          if (error.response) {
            setError(`Server error: ${error.response.status}`);
          } else if (error.request) {
            setError('No response from server. Please check your connection.');
          } else {
            setError(`Error: ${error.message}`);
          }
        }
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchPost();
    } else {
      setError('Invalid post identifier');
      setLoading(false);
    }
  }, [slug]);

  const formatDate = (dateString) => {
    if (!dateString) return 'Unknown date';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const calculateReadTime = (content) => {
    if (!content) return 1;
    const wordsPerMinute = 200;
    const words = content.split(/\s+/).length;
    return Math.ceil(words / wordsPerMinute);
  };

  const handleShare = async (platform) => {
    if (!post) return;
    
    const baseUrl = window.location.origin;
    
    // Make sure we have a valid identifier (slug or _id) for the URL
    const postIdentifier = post.slug || post._id;
    if (!postIdentifier) {
      toast.error('Could not generate a valid link for this post');
      return;
    }
    
    const postUrl = `${baseUrl}/post/${postIdentifier}`;
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
          // Modern clipboard API
          await navigator.clipboard.writeText(postUrl);
          toast.success('Link copied to clipboard!');
          console.log('Copied URL:', postUrl); // For debugging
        } catch (err) {
          console.error('Clipboard API error:', err);
          
          // Fallback clipboard method
          try {
            const textArea = document.createElement('textarea');
            textArea.value = postUrl;
            document.body.appendChild(textArea);
            textArea.focus();
            textArea.select();
            const successful = document.execCommand('copy');
            document.body.removeChild(textArea);
            
            if (successful) {
              toast.success('Link copied to clipboard!');
            } else {
              toast.error('Failed to copy link');
            }
          } catch (fallbackErr) {
            console.error('Fallback clipboard error:', fallbackErr);
            toast.error('Failed to copy link');
          }
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
            <FaArrowLeft /> Back to Blog
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
        <meta name="description" content={post.content?.substring(0, 155) || post.title} />
      </Helmet>

      <article className="blog-post">
        <div className="post-header">
          <Link to="/blog" className="back-to-blog">
            <FaArrowLeft /> Back to Blog
          </Link>
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
                <button onClick={() => handleShare('twitter')} className="share-button twitter">
                  <FaTwitter />
                </button>
                <button onClick={() => handleShare('facebook')} className="share-button facebook">
                  <FaFacebookF />
                </button>
                <button onClick={() => handleShare('linkedin')} className="share-button linkedin">
                  <FaLinkedinIn />
                </button>
                <button onClick={() => handleShare('copy')} className="share-button copy">
                  <FaLink />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="post-featured-image">
          <img 
            src={post.featuredImage || post.image || 'https://via.placeholder.com/800x400'} 
            alt={post.title} 
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = 'https://via.placeholder.com/800x400?text=Image+Not+Available';
            }}
          />
        </div>

        <div className="post-content">
          <div className="content-wrapper" dangerouslySetInnerHTML={{ __html: post.content || '<p>No content available</p>' }} />
        </div>

        {relatedPosts.length > 0 && (
          <div className="related-posts">
            <h2>Related Posts</h2>
            <div className="related-posts-grid">
              {relatedPosts.map((related) => (
                <Link to={`/post/${related.slug || related._id}`} key={related._id} className="related-post-card">
                  <img 
                    src={related.featuredImage || related.image || 'https://via.placeholder.com/300x200'} 
                    alt={related.title}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = 'https://via.placeholder.com/300x200?text=Image+Not+Available';
                    }}
                  />
                  <div className="related-post-content">
                    <h3>{related.title}</h3>
                    <span className="related-post-date">
                      <FaCalendar /> {formatDate(related.createdAt)}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </article>
    </div>
  );
};

export default BlogPost;
