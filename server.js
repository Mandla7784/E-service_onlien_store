require('dotenv').config();
const express = require('express');
const path = require('path');
const app = express();

// Serve static files from the src directory
app.use(express.static(path.join(__dirname, 'src')));

// API endpoint to get PayPal client ID
app.get('/api/config/paypal', (req, res) => {
  res.json({
    clientId: process.env.PAYPAL_CLIENT_ID
  });
});

// Serve the main page for all other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'src', 'index.html'));
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
