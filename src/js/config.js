// Load environment variables
require('dotenv').config();

const config = {
  paypal: {
    clientId: process.env.PAYPAL_CLIENT_ID || '',
    // Add other PayPal configs here if needed
  },
  server: {
    port: process.env.PORT || 8000,
  },
  // Add other configurations as needed
};

module.exports = config;
