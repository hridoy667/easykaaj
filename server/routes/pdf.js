const express = require('express');
const PDFDocument = require('pdfkit');
const multer = require('multer');
const fs = require('fs');
const router = express.Router();

// multer setup for memory storage (no file saving on disk)
const upload = multer({ storage: multer.memoryStorage() });

router.post('/convert-pdf', upload.single('txtFile'), (req, res) => {
  // txtFile will be in req.file if uploaded
  // text from input will be in req.body.text

  let textContent = req.body.text || '';

  if (req.file) {
    // Check uploaded file extension (basic validation)
    if (!req.file.originalname.endsWith('.txt')) {
      return res.status(400).json({ error: 'Only .txt files are supported.' });
    }

    // Read file content from buffer
    textContent = req.file.buffer.toString('utf-8');
  }

  if (!textContent.trim()) {
    return res.status(400).json({ error: 'No text provided or empty file.' });
  }

  const doc = new PDFDocument();
  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', 'attachment; filename=easykaaj.pdf');

  doc.pipe(res);
  doc.text(textContent);
  doc.end();
});

module.exports = router;
