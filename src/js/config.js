// Load environment variables
require("dotenv").config();

const config = {
  paypal: {
    clientId: process.env.PAYPAL_CLIENT_ID || "",
  },
  server: {
    port: process.env.PORT || 8000,
  },
};

module.exports = config;
