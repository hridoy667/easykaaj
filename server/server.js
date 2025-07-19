const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

// === Middleware ===

// Security HTTP headers
app.use(helmet({
  crossOriginResourcePolicy: { policy: "cross-origin" }
}));

// Enable CORS for frontend
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  optionsSuccessStatus: 200,
}));

// JSON body parser
app.use(express.json());

// Rate limiter: 40 requests per minute
const limiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 40,
  message: {
    status: 429,
    error: 'Too many requests from this IP, please try again after a minute.',
  },
});
app.use(limiter);

// === MongoDB Connection ===
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ Connected to MongoDB Atlas'))
  .catch((err) => console.error('❌ MongoDB connection error:', err));


// === Test Routes ===
app.get('/api/ping', (req, res) => {
  res.send("EasyKaaj server is working! ✅");
});

app.post('/api/echo', (req, res) => {
  const { text } = req.body;
  res.json({ echoedText: text });
});

// === Route Imports ===
const routes = {
  '/api/pdf': require('./routes/pdf'),
  '/api/qr': require('./routes/qr'),
  '/api/urlshortener': require('./routes/urlshortener'),
  '/api/age': require('./routes/age'),
  '/api/currency': require('./routes/currency'),
  '/api/qrscan': require('./routes/qrscan'),
  '/api/image-to-pdf': require('./routes/imageToPdf'),
  '/api/pdf-compress': require('./routes/pdfcompress'),
  '/api/pdf-merge': require('./routes/pdfMerge'),
  '/api/image-compressor': require('./routes/imageCompressor'),
  '/api/pdf-extract': require('./routes/pdfExtract'),
  '/api': require('./routes/feedback')
};

// === Register Routes ===
for (const [path, handler] of Object.entries(routes)) {
  app.use(path, handler);
}

// === Global Redirect for Short URLs ===
const ShortUrl = require('./models/ShortUrl');
app.get('/:shortCode', async (req, res) => {
  try {
    const short = await ShortUrl.findOne({ shortCode: req.params.shortCode });
    if (!short) return res.status(404).send('URL not found');
    res.redirect(short.originalUrl);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

// === 404 Not Found ===
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found.' });
});

// === Global Error Handler ===
app.use((err, req, res, next) => {
  console.error('🔥 Internal Error:', err.stack);
  res.status(500).json({ error: 'Internal Server Error.' });
});

// === Start Server ===
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
