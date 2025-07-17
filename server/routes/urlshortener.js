const express = require('express');
const router = express.Router();
const ShortUrl = require('../models/ShortUrl'); 
const { nanoid } = require('nanoid');

// POST - Create short URL
router.post('/shorten', async (req, res) => {
  const { originalUrl } = req.body;

  if (!originalUrl) {
    return res.status(400).json({ error: 'Original URL is required' });
  }

  try {
    const shortCode = nanoid(6); // Generate a 6-character ID
    const newShort = await ShortUrl.create({ originalUrl, shortCode });

    // Send short URL without /api or /urlshortener prefix, matching global redirect route
    res.json({ shortUrl: `https://easykaaj-backend.onrender.com/${shortCode}` });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Something went wrong' });
  }
});

// Note: No need for /s/:shortCode GET route here because
// global redirect is handled in server.js by app.get('/:shortCode', ...)

module.exports = router;
