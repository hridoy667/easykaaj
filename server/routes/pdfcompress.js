const express = require('express');
const multer = require('multer');
const { PDFDocument } = require('pdf-lib');

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post('/compress-pdf', upload.single('pdf'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'PDF file is required' });
    }

    const pdfDoc = await PDFDocument.load(req.file.buffer);

    // Resave PDF - simple optimization
    const compressedPdfBytes = await pdfDoc.save({ useObjectStreams: false });

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=compressed.pdf');
    res.send(Buffer.from(compressedPdfBytes));
  } catch (error) {
    console.error('PDF Compression error:', error);
    res.status(500).json({ error: 'Failed to compress PDF' });
  }
});

module.exports = router;
