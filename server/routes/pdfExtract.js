const express = require('express');
const multer = require('multer');
const pdfParse = require('pdf-parse');

const router = express.Router();
const upload = multer();

router.post('/extract-text', upload.single('pdf'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No PDF file uploaded.' });
    }

    const dataBuffer = req.file.buffer;
    const data = await pdfParse(dataBuffer);

    res.json({ text: data.text });
  } catch (error) {
    console.error('PDF extraction error:', error);
    res.status(500).json({ error: 'Failed to extract text from PDF.' });
  }
});

module.exports = router;
