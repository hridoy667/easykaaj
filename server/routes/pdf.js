// routes/pdf.js

const express = require('express');
const PDFDocument = require('pdfkit');
const router = express.Router();

router.post('/convert-pdf', (req, res) => {
  const { text } = req.body;

  if (!text) {
    return res.status(400).json({ error: 'Text is required.' });
  }

  const doc = new PDFDocument();
  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', 'attachment; filename=easykaaj.pdf');

  doc.pipe(res);
  doc.text(text);
  doc.end();
});

module.exports = router;
