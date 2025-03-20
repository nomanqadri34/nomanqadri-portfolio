require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const authRoutes = require('./routes/auth');
const blogRoutes = require('./routes/blog');

const app = express();

// ✅ Corrected CORS Configuration
const allowedOrigins = [
    'https://www.alqadridev.in', // Main frontend domain
    'https://nomanqadri-portfolio-1x9l.vercel.app', // Vercel deployment
    'http://localhost:3000' // For local development
];

app.use(cors({
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('CORS not allowed for this origin'));
        }
    },
    credentials: true
}));

app.use(express.json());

// ✅ Welcome Route
app.get('/', (req, res) => {
    res.send(`
        <html>
            <head>
                <title>Welcome to My Portfolio API</title>
                <style>
                    body {
                        font-family: Arial, sans-serif;
                        max-width: 800px;
                        margin: 40px auto;
                        padding: 20px;
                        text-align: center;
                        background-color: #f5f5f5;
                    }
                    h1 {
                        color: #2c3e50;
                        margin-bottom: 20px;
                    }
                    p {
                        color: #34495e;
                        line-height: 1.6;
                    }
                    .endpoints {
                        background-color: #fff;
                        padding: 20px;
                        border-radius: 8px;
                        box-shadow: 0 2px 4px rgba(0,0,0,0.1);
                        margin-top: 20px;
                    }
                    .endpoint {
                        margin: 10px 0;
                        padding: 10px;
                        background-color: #f8f9fa;
                        border-radius: 4px;
                    }
                </style>
            </head>
            <body>
                <h1>Welcome to My Portfolio API</h1>
                <p>This is the backend server for my portfolio application.</p>
                <div class="endpoints">
                    <h2>Available Endpoints:</h2>
                    <div class="endpoint">/api/auth - Authentication endpoints</div>
                    <div class="endpoint">/api/blogs - Blog management endpoints</div>
                </div>
            </body>
        </html>
    `);
});

// ✅ MongoDB Connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/blog-admin', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('✅ Connected to MongoDB');
}).catch(err => {
    console.error('❌ MongoDB connection error:', err);
});

// ✅ Routes
app.use('/api/auth', authRoutes);
app.use('/api/blogs', blogRoutes);

// ✅ Health Check Route
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'ok' });
});

// ✅ Improved Error Handling Middleware
app.use((err, req, res, next) => {
    console.error('❌ Error:', err.stack);
    res.status(500).json({ message: 'Something went wrong!' });
    next(); // Ensure Express doesn't hang
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
});

