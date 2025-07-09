// routes/qr.js
const express = require('express');
const router = express.Router();
const QRCode = require('qrcode');

router.post('/qr/generate', async (req, res) => {
  const { text } = req.body;

  if (!text) {
    return res.status(400).json({ error: 'Text is required to generate QR code.' });
  }

  try {
    // Generate QR code as a Data URL (base64 image)
    const qrImageUrl = await QRCode.toDataURL(text);
    res.json({ qrImageUrl });
  } catch (err) {
    console.error('QR generation error:', err);
    res.status(500).json({ error: 'Failed to generate QR code.' });
  }
});

module.exports = router;
