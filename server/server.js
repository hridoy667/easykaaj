const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
require('dotenv').config();
const mongoose = require('mongoose');

const app = express();

// Security Middleware
app.use(helmet());

// CORS setup — adjust origin as per your frontend URL
app.use(cors({
  origin: 'http://localhost:5173',  // Change to your frontend URL in production
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  optionsSuccessStatus: 200,
}));

// Body parser
app.use(express.json());

// Rate Limiter — 10 requests per minute per IP
const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 10,
  message: {
    status: 429,
    error: 'Too many requests from this IP, please try again after a minute.',
  },
});
app.use(limiter);

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ Connected to MongoDB Atlas'))
  .catch((err) => console.error('❌ MongoDB connection error:', err));

// Basic test route
app.get('/api/ping', (req, res) => {
  res.send("EasyKaaj server is working! ✅");
});

app.post('/api/echo', (req, res) => {
  const { text } = req.body;
  res.json({ echoedText: text });
});

// Import routes
const pdfRoute = require('./routes/pdf');
const qrRoute = require('./routes/qr');
const urlShortenerRoute = require('./routes/urlshortener');
const ageRoute = require('./routes/age');
const currencyRoute = require('./routes/currency');
const qrScanRoute = require('./routes/qrscan');
const imageToPdfRoute = require('./routes/imageToPdf');
const pdfCompressRoute = require('./routes/pdfcompress');
const pdfMergeRoute = require('./routes/pdfMerge');
const imageCompressorRouter = require('./routes/imageCompressor');
const pdfExtractRoute = require('./routes/pdfExtract');

// Use routes with proper base paths
app.use('/api/pdf', pdfRoute);
app.use('/api/qr', qrRoute);
app.use('/api/urlshortener', urlShortenerRoute);
app.use('/api/age', ageRoute);
app.use('/api/currency', currencyRoute);
app.use('/api/qrscan', qrScanRoute);
app.use('/api/image-to-pdf', imageToPdfRoute);
app.use('/api/pdf-compress', pdfCompressRoute);
app.use('/api/pdf-merge', pdfMergeRoute);
app.use('/api/image-compressor', imageCompressorRouter);
app.use('/api/pdf-extract', pdfExtractRoute);

// 404 handler for unknown routes
app.use((req, res, next) => {
  res.status(404).json({ error: 'Route not found.' });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('🔥', err.stack);
  res.status(500).json({ error: 'Internal Server Error.' });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
