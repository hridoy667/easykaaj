const express = require('express');
const multer = require('multer');
const sharp = require('sharp');
const { PDFDocument } = require('pdf-lib');

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post('/image-to-pdf', upload.array('images'), async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ error: 'No images uploaded' });
    }

    const pdfDoc = await PDFDocument.create();

    for (const file of req.files) {
      const format = file.mimetype.split('/')[1]; // e.g., 'jpeg' or 'png'
      const imageBuffer = await sharp(file.buffer).resize({ width: 800 }).toBuffer();

      let embeddedImage;
      if (format === 'jpeg' || format === 'jpg') {
        embeddedImage = await pdfDoc.embedJpg(imageBuffer);
      } else if (format === 'png') {
        embeddedImage = await pdfDoc.embedPng(imageBuffer);
      } else {
        return res.status(400).json({ error: 'Unsupported image format. Use JPG or PNG.' });
      }

      const page = pdfDoc.addPage([embeddedImage.width, embeddedImage.height]);
      page.drawImage(embeddedImage, {
        x: 0,
        y: 0,
        width: embeddedImage.width,
        height: embeddedImage.height
      });
    }

    const pdfBytes = await pdfDoc.save();
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=converted.pdf');
    res.send(pdfBytes);
  } catch (err) {
    console.error('❌ Image to PDF conversion error:', err);
    res.status(500).json({ error: 'Failed to convert images to PDF' });
  }
});

module.exports = router;
