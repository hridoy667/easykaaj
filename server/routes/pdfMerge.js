const express = require('express');
const router = express.Router();
const multer = require('multer');
const { PDFDocument } = require('pdf-lib');

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post('/merge-pdf', upload.array('pdfs', 10), async (req, res) => {
  try {
    const mergedPdf = await PDFDocument.create();

    for (const file of req.files) {
      const pdf = await PDFDocument.load(file.buffer);
      const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
      copiedPages.forEach((page) => mergedPdf.addPage(page));
    }

    const mergedBuffer = await mergedPdf.save();
    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'attachment; filename=merged.pdf',
    });
    res.send(mergedBuffer);
  } catch (err) {
    console.error('Merge PDF Error:', err);
    res.status(500).json({ error: 'Failed to merge PDFs' });
  }
});

module.exports = router;
