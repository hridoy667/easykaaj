// routes/currency.js

const express = require('express');
const router = express.Router();
const axios = require('axios');

const API_KEY = process.env.CURRENCY_API_KEY;

router.post('/convert-currency', async (req, res) => {
  const { from, to, amount } = req.body;

  if (!from || !to || !amount) {
    return res.status(400).json({ error: 'from, to, and amount are required.' });
  }

  try {
    const response = await axios.get(`https://v6.exchangerate-api.com/v6/${API_KEY}/pair/${from}/${to}`);
    const rate = response.data.conversion_rate;
    const result = rate * amount;

    res.json({
      from,
      to,
      amount,
      converted: result,
      rate,
    });
  } catch (err) {
    console.error('Currency conversion failed:', err.message);
    res.status(500).json({ error: 'Failed to convert currency.' });
  }
});

module.exports = router;
