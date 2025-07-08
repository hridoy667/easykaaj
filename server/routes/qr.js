// routes/qr.js

const express = require('express');
const QRCode = require('qrcode');
const router = express.Router();

router.post('/generate-qr', async (req, res) => {
  const { text } = req.body;

  if (!text) {
    return res.status(400).json({ error: 'Text is required to generate QR code' });
  }

  try {
    const qrDataURL = await QRCode.toDataURL(text);
    res.json({ qrImage: qrDataURL });
  } catch (err) {
    res.status(500).json({ error: 'Failed to generate QR code' });
  }
});

module.exports = router;
