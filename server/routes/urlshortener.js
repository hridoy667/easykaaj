const express = require('express');
const router = express.Router();
const ShortUrl = require('../Models/ShortUrl'); // ✅ Matches folder name exactly
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
    res.json({ shortUrl: `http://localhost:5000/s/${shortCode}` });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Something went wrong' });
  }
});

// GET - Redirect
router.get('/s/:shortCode', async (req, res) => {
  try {
    const short = await ShortUrl.findOne({ shortCode: req.params.shortCode });
    if (!short) return res.status(404).send('URL not found');

    res.redirect(short.originalUrl);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

module.exports = router;
