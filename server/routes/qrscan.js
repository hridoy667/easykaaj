const express = require('express');
const multer = require('multer');
const sharp = require('sharp');
const QRReader = require('qrcode-reader');
const router = express.Router();

const upload = multer({ storage: multer.memoryStorage() });

router.post('/scan-qr-image', upload.single('image'), async (req, res) => {
  try {
    console.log('File received:', req.file);

    const buffer = req.file.buffer;

    // Convert input image buffer to raw bitmap data (RGBA) using sharp
    const raw = await sharp(buffer)
      .raw()
      .ensureAlpha() // make sure image has alpha channel
      .toBuffer({ resolveWithObject: true });

    const { data, info } = raw;

    // Create a fake image bitmap object for qrcode-reader
    const imageBitmap = {
      data,
      width: info.width,
      height: info.height,
    };

    const qr = new QRReader();

    qr.callback = function (err, value) {
      if (err || !value) {
        console.error('QR read error:', err);
        return res.status(400).json({ error: 'Error scanning QR code.' });
      }
      return res.json({ data: value.result });
    };

    qr.decode(imageBitmap);
  } catch (error) {
    console.error('Scan error:', error.message);
    return res.status(500).json({ error: 'Error scanning QR code.' });
  }
});

module.exports = router;
