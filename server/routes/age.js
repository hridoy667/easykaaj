// routes/age.js

const express = require('express');
const router = express.Router();

router.post('/calculate-age', (req, res) => {
  const { birthdate } = req.body;

  if (!birthdate) {
    return res.status(400).json({ error: 'Birthdate is required' });
  }

  const birth = new Date(birthdate);
  const today = new Date();

  let ageYears = today.getFullYear() - birth.getFullYear();
  let ageMonths = today.getMonth() - birth.getMonth();
  let ageDays = today.getDate() - birth.getDate();

  if (ageDays < 0) {
    ageMonths--;
    ageDays += new Date(today.getFullYear(), today.getMonth(), 0).getDate();
  }

  if (ageMonths < 0) {
    ageYears--;
    ageMonths += 12;
  }

  res.json({
    age: `${ageYears} years, ${ageMonths} months, ${ageDays} days`,
    years: ageYears,
    months: ageMonths,
    days: ageDays,
  });
});

module.exports = router;
