const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    content: {
        type: String,
        required: true
    },
    authorName: {
        type: String,
        required: true,
        trim: true
    },
    authorImage: {
        type: String,
        required: true
    },
    featuredImage: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true,
        enum: ['Web Development', 'App Development', 'AI'],
        default: 'Web Development'
    },
    tags: [{
        type: String,
        trim: true
    }],
    status: {
        type: String,
        enum: ['draft', 'published'],
        default: 'draft'
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});

// Add text index for search functionality
blogSchema.index({ title: 'text', content: 'text', tags: 'text', category: 'text' });

const Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog; 