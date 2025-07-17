const express = require('express');
const router = express.Router();
const Feedback = require('../models/Feedback');

// POST /api/feedback
router.post('/feedback', async (req, res) => {
  try {
    const { feedback } = req.body;
    if (!feedback || feedback.trim() === '') {
      return res.status(400).json({ error: 'Feedback is required' });
    }

    const newFeedback = new Feedback({ message: feedback });
    await newFeedback.save();

    res.status(200).json({ success: true, message: 'Feedback saved successfully' });
  } catch (error) {
    console.error('Error saving feedback:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
