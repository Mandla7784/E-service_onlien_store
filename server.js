require("dotenv").config();
const express = require("express");
const path = require("path");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const csrf = require("csurf");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const cors = require("cors");
const { v4: uuidv4 } = require("uuid");
const fs = require("fs");
const https = require("https");
const app = express();

// Security Headers with Helmet
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        frameSrc: [
          "'self'",
          "https://www.sandbox.paypal.com",
          "https://www.paypal.com",
        ],
        scriptSrc: [
          "'self'",
          "'unsafe-inline'",
          "'unsafe-eval'",
          "https://www.paypal.com",
        ],
        scriptSrcAttr: ["'unsafe-inline'", "'unsafe-hashes'"],
        styleSrc: ["'self'", "'unsafe-inline'", "https://cdnjs.cloudflare.com"],
        imgSrc: [
          "'self'",
          "data:",
          "https:",
          "http:",
          "*.amazon.com",
          "*.gadgets360cdn.com",
          "*.philips.com",
          "*.audeze.com",
          "*.dreamstime.com",
          "*.gstatic.com",
          "*.media-amazon.com",
          "*.gadgets360cdn.com",
          "*.philips.com",
          "*.audeze.com",
        ],
        connectSrc: [
          "'self'",
          "https://fakestoreapi.com",
          "https://api.fakestoreapi.com",
          "https://www.sandbox.paypal.com",
          "https://www.paypal.com",
        ],
        fontSrc: ["'self'", "https://cdnjs.cloudflare.com"],
        objectSrc: ["'none'"],
        upgradeInsecureRequests: [],
      },
    },
    hsts: {
      maxAge: 31536000, // 1 year in seconds
      includeSubDomains: true,
      preload: true,
    },
    referrerPolicy: { policy: "same-origin" },
    frameguard: { action: "deny" },
    noSniff: true,
    xssFilter: true,
    hidePoweredBy: true,
  })
);

// CORS Configuration
const corsOptions = {
  origin:
    process.env.NODE_ENV === "production"
      ? process.env.ALLOWED_ORIGINS
        ? process.env.ALLOWED_ORIGINS.split(",")
        : []
      : ["http://localhost:8000", "http://localhost:3000"],
  credentials: true,
  methods: ["GET", "POST", "OPTIONS"],
  allowedHeaders: ["Content-Type", "X-CSRF-Token", "X-Requested-With"],
  exposedHeaders: ["X-CSRF-Token"],
};
app.use(cors(corsOptions));

// Rate limiting configuration
const apiLimiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS || "900000", 10), // 15 minutes by default
  max: parseInt(process.env.RATE_LIMIT_MAX || "100", 10), // 100 requests per window by default
  message: { error: "Too many requests, please try again later." },
  standardHeaders: true,
  legacyHeaders: false,
});

// Apply rate limiting to API routes
app.use("/api/", apiLimiter);

// Body parsing with size limits
app.use(
  bodyParser.json({
    limit: "10kb",
    verify: (req, res, buf) => {
      try {
        JSON.parse(buf);
      } catch (e) {
        throw new Error("Invalid JSON");
      }
    },
  })
);
app.use(
  bodyParser.urlencoded({
    extended: true,
    limit: "10kb",
    parameterLimit: 10, // Limit number of form fields
  })
);

// Cookie security settings
const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "strict",
  maxAge: 3600000, // 1 hour
  path: "/",
  domain: process.env.COOKIE_DOMAIN || undefined,
};

app.use(cookieParser(process.env.SESSION_SECRET || "your-secret-key"));

// CSRF Protection with custom configuration
const csrfProtection = csrf({
  cookie: {
    ...cookieOptions,
    key: "_csrf",
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    httpOnly: true,
  },
  value: (req) => {
    return req.headers["x-csrf-token"] || req.body._csrf || req.query._csrf;
  },
});

// Add security headers
app.use((req, res, next) => {
  // Prevent clickjacking
  res.setHeader("X-Frame-Options", "DENY");

  // Enable XSS protection
  res.setHeader("X-XSS-Protection", "1; mode=block");

  // Prevent MIME type sniffing
  res.setHeader("X-Content-Type-Options", "nosniff");

  // Set Referrer-Policy
  res.setHeader("Referrer-Policy", "same-origin");

  // Set Permissions-Policy
  res.setHeader(
    "Permissions-Policy",
    "geolocation=(), microphone=(), camera=()"
  );

  next();
});

// Generate CSRF token endpoint
app.get("/api/csrf-token", csrfProtection, (req, res) => {
  try {
    const csrfToken = req.csrfToken();
    res.cookie("XSRF-TOKEN", csrfToken, cookieOptions);
    res.json({ csrfToken });
  } catch (error) {
    console.error("CSRF Token Generation Error:", error);
    res.status(403).json({ error: "Failed to generate CSRF token" });
  }
});

// Input validation middleware
const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const validatePhone = (phone) => {
  const phoneRegex = /^[0-9+\-\s()]+$/;
  return phoneRegex.test(phone);
};

// API Routes
app.post("/api/subscribe", csrfProtection, (req, res) => {
  try {
    const { email } = req.body;

    // Validate email
    if (!email || !validateEmail(email)) {
      return res.status(400).json({
        error: "Please provide a valid email address",
      });
    }

    console.log("New subscription:", email);
    setTimeout(() => {
      res.json({
        success: true,
        message: "Thank you for subscribing to our newsletter!",
        timestamp: new Date().toISOString(),
      });
    }, 800);
  } catch (error) {
    console.error("Subscription error:", error);
    res.status(500).json({
      error: "Failed to process subscription",
      details:
        process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
});

app.post("/api/credit-application", csrfProtection, (req, res) => {
  try {
    const { fullName, idNumber, email, phone, income, employment, message } =
      req.body;

    // Validate required fields
    if (!fullName || !idNumber || !email || !phone || !income || !employment) {
      return res.status(400).json({
        error: "Please fill in all required fields",
      });
    }

    // Validate email format
    if (!validateEmail(email)) {
      return res.status(400).json({
        error: "Please provide a valid email address",
      });
    }

    // Validate phone number format
    if (!validatePhone(phone)) {
      return res.status(400).json({
        error: "Please provide a valid phone number",
      });
    }

    console.log("New credit application received");
    console.log("Name:", fullName);
    console.log("Email:", email);
    console.log("Phone:", phone);
    console.log("Employment:", employment);
    console.log("Income:", income);
    console.log("ID Number:", "***" + String(idNumber).slice(-4));

    // Simulate processing delay
    setTimeout(() => {
      res.json({
        success: true,
        message: "Your credit application has been submitted successfully!",
        applicationId: "APP-" + uuidv4().substring(0, 8).toUpperCase(),
        timestamp: new Date().toISOString(),
      });
    }, 1500);
  } catch (error) {
    console.error("Credit application error:", error);
    res.status(500).json({
      error: "Failed to process credit application",
      details:
        process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
});

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    env: process.env.NODE_ENV || "development",
  });
});

// Serve static files from the src directory
app.use(express.static(path.join(__dirname, "src")));

// API endpoint to get PayPal client ID
app.get("/api/config/paypal", (req, res) => {
  res.json({
    clientId: process.env.PAYPAL_CLIENT_ID,
  });
});

// Serve the main page for all other routes
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "src", "index.html"));
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: "Something went wrong!",

    ...(process.env.NODE_ENV === "development" && { details: err.message }),
  });
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  if (process.env.NODE_ENV === "development") {
    console.log(
      "CSRF Protection:",
      process.env.NODE_ENV === "production" ? "Enabled" : "Development mode"
    );
  }
});
