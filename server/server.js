const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

app.get('/api/ping', (req, res) => {
  res.send("EasyKaaj server is working! ✅");
});

app.post('/api/echo', (req, res) => {
  const { text } = req.body;
  res.json({ echoedText: text });
});

const pdfRoute = require('./routes/pdf');
app.use('/api', pdfRoute);

const qrRoute = require('./routes/qr');
app.use('/api', qrRoute);

const ageRoute = require('./routes/age');
app.use('/api', ageRoute);

const currencyRoute = require('./routes/currency');
app.use('/api', currencyRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
