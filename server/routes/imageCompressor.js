const express = require('express');
const multer = require('multer');
const sharp = require('sharp');

const router = express.Router();
const upload = multer(); // multer memory storage

router.post('/compress-image', upload.single('image'), async (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'Image file is required.' });

  try {
    // Compress image: resize and lower quality (adjust as needed)
    const compressedBuffer = await sharp(req.file.buffer)
      .resize({ width: 1024 }) // resize max width 1024px (keep aspect ratio)
      .jpeg({ quality: 70 })   // compress jpeg with quality 70%
      .toBuffer();

    res.set({
      'Content-Type': 'image/jpeg',
      'Content-Disposition': 'attachment; filename=compressed.jpg',
      'Content-Length': compressedBuffer.length,
    });

    res.send(compressedBuffer);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to compress image.' });
  }
});

module.exports = router;
