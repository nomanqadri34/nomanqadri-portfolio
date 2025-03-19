import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { notifySubscribersAboutBlogPost } from '../utils/blogNotifications';
import './PostEditor.css';

const PostEditor = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [isPublishing, setIsPublishing] = useState(false);

  const publishPost = async (postData) => {
    // Simulate API call to save the post
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          id: Date.now(),
          ...postData,
          createdAt: new Date().toISOString(),
        });
      }, 2000);
    });
  };

  const handlePublish = async (e) => {
    e.preventDefault();

    // Validate inputs
    if (!title.trim() || !content.trim() || !category.trim() || !excerpt.trim()) {
      toast.error('Please fill in all fields');
      return;
    }

    setIsPublishing(true);

    try {
      const postData = {
        title,
        content,
        category,
        excerpt,
      };

      // Publish the post
      const publishedPost = await publishPost(postData);

      // Notify subscribers about the new post
      await notifySubscribersAboutBlogPost(publishedPost);

      // Show success message
      toast.success('Post published successfully!');

      // Reset form
      setTitle('');
      setContent('');
      setCategory('');
      setExcerpt('');
    } catch (error) {
      console.error('Error publishing post:', error);
      toast.error('Failed to publish post. Please try again.');
    } finally {
      setIsPublishing(false);
    }
  };

  return (
    <div className="post-editor">
      <h2>Create New Post</h2>
      <form onSubmit={handlePublish}>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            disabled={isPublishing}
            placeholder="Enter post title"
          />
        </div>

        <div className="form-group">
          <label htmlFor="category">Category</label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            disabled={isPublishing}
          >
            <option value="">Select a category</option>
            <option value="Web Development">Web Development</option>
            <option value="App Development">App Development</option>
            <option value="UI Design">UI Design</option>
            <option value="Consulting">Consulting</option>
            <option value="Technology">Technology</option>
            <option value="Career">Career</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="excerpt">Excerpt</label>
          <textarea
            id="excerpt"
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value)}
            disabled={isPublishing}
            placeholder="Enter a brief excerpt"
            rows={3}
          />
        </div>

        <div className="form-group">
          <label htmlFor="content">Content</label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            disabled={isPublishing}
            placeholder="Write your post content"
            rows={10}
          />
        </div>

        <button
          type="submit"
          className={`publish-button ${isPublishing ? 'publishing' : ''}`}
          disabled={isPublishing}
        >
          {isPublishing ? 'Publishing...' : 'Publish Post'}
        </button>
      </form>
    </div>
  );
};

export default PostEditor; 