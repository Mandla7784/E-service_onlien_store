require('dotenv').config();
const express = require('express');
const path = require('path');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const csrf = require('csurf');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');
const app = express();

// Security Middleware
app.use(helmet());
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? 'https://yourdomain.com' 
    : 'http://localhost:8000',
  credentials: true
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
app.use(limiter);

// Body parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

// CSRF Protection
const csrfProtection = csrf({ 
  cookie: {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 3600 // 1 hour
  }
});

// Generate CSRF token endpoint
app.get('/api/csrf-token', (req, res) => {
  const csrfToken = req.csrfToken();
  res.cookie('XSRF-TOKEN', csrfToken, { 
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    sameSite: 'strict'
  });
  res.json({ csrfToken });
});

// Form Submission Endpoints
app.post('/api/subscribe', csrfProtection, (req, res) => {
  try {
    const { email } = req.body;
    
    // Basic validation
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({ error: 'Please provide a valid email address' });
    }
    
    // In a real app, you would save this to a database
    console.log('New subscription:', email);
    
    res.status(200).json({ 
      success: true, 
      message: 'Thank you for subscribing!',
      subscriptionId: uuidv4()
    });
  } catch (error) {
    console.error('Subscription error:', error);
    res.status(500).json({ error: 'Failed to process subscription' });
  }
});

app.post('/api/credit-application', csrfProtection, (req, res) => {
  try {
    const { fullName, idNumber, email, phone, income, employment, message } = req.body;
    
    // Basic validation
    if (!fullName || !idNumber || !email || !phone || !income || !employment) {
      return res.status(400).json({ error: 'All fields are required' });
    }
    
    // In a real app, you would save this to a database
    console.log('New credit application:', { 
      fullName, 
      idNumber: '***' + idNumber.slice(-4), // Don't log full ID
      email,
      phone,
      income,
      employment,
      message: message || 'No additional information'
    });
    
    res.status(200).json({ 
      success: true, 
      message: 'Application submitted successfully!',
      applicationId: uuidv4()
    });
  } catch (error) {
    console.error('Credit application error:', error);
    res.status(500).json({ error: 'Failed to process application' });
  }
});

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

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    error: 'Something went wrong!',
    // Only show full error in development
    ...(process.env.NODE_ENV === 'development' && { details: err.message })
  });
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  if (process.env.NODE_ENV === 'development') {
    console.log('CSRF Protection:', process.env.NODE_ENV === 'production' ? 'Enabled' : 'Development mode');
  }
});
