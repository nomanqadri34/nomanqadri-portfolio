const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Blog = require('../models/Blog');
const auth = require('../middleware/auth');

// Middleware to verify JWT token and check admin status
const verifyAdmin = async (req, res, next) => {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '');
        if (!token) {
            return res.status(401).json({ message: 'Authentication required' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (!decoded.isAdmin) {
            return res.status(403).json({ message: 'Admin access required' });
        }

        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({ message: 'Invalid token' });
    }
};

// Get all blogs
router.get('/', async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    res.json(blogs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a new blog
router.post('/', auth, async (req, res) => {
  try {
    const { title, content, authorName, authorImage, featuredImage, tags, status, category } = req.body;
    
    const blog = new Blog({
      title,
      content,
      authorName,
      authorImage,
      featuredImage,
      category,
      tags: tags || [],
      status: status || 'draft'
    });

    const newBlog = await blog.save();
    res.status(201).json(newBlog);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update a blog
router.put('/:id', auth, async (req, res) => {
  try {
    const { title, content, authorName, authorImage, featuredImage, tags, status, category } = req.body;
    
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }

    blog.title = title || blog.title;
    blog.content = content || blog.content;
    blog.authorName = authorName || blog.authorName;
    blog.authorImage = authorImage || blog.authorImage;
    blog.featuredImage = featuredImage || blog.featuredImage;
    blog.category = category || blog.category;
    blog.tags = tags || blog.tags;
    blog.status = status || blog.status;
    blog.updatedAt = Date.now();

    const updatedBlog = await blog.save();
    res.json(updatedBlog);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a blog
router.delete('/:id', auth, async (req, res) => {
  try {
    const blog = await Blog.findByIdAndDelete(req.params.id);
    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }
    res.json({ message: 'Blog deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get a single blog
router.get('/:id', async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }
    res.json(blog);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router; 