const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const compression = require('compression');

const taskRoutes = require('./routes/taskRoutes');
const notFound = require('./middleware/notFound');
const errorHandler = require('./middleware/errorHandler');

const app = express();

// ─── HTTP SECURITY HEADERS ───────────────────────────────────────────────────
// Sets secure HTTP headers to mitigate cross-site scripting (XSS), clickjacking, etc.
app.use(helmet());

// ─── RESPONSE COMPRESSION ─────────────────────────────────────────────────────
// Compresses response bodies for all requests to optimize network speed
app.use(compression());

// ─── CORS ─────────────────────────────────────────────────────────────────────
const allowedOrigins = [
  process.env.CLIENT_URL || 'http://localhost:5173',
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) return callback(null, true);
      callback(new Error(`CORS policy: origin ${origin} not allowed`));
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  })
);

// ─── RATE LIMITING ────────────────────────────────────────────────────────────
// Protects the server from DDoS or brute-force requests.
// 100 requests per 15 minutes window.
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per `window`
  message: {
    success: false,
    message: 'Too many requests from this IP, please try again after 15 minutes',
  },
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

app.use('/api', apiLimiter);

// ─── BODY PARSING ─────────────────────────────────────────────────────────────
app.use(express.json({ limit: '10kb' })); // Safety size limit
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

// ─── HTTP REQUEST LOGGING ────────────────────────────────────────────────────
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// ─── HEALTH CHECK ─────────────────────────────────────────────────────────────
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'ok', message: 'Task Tracker API is running' });
});

// ─── API ROUTES ───────────────────────────────────────────────────────────────
app.use('/api/tasks', taskRoutes);

// ─── 404 HANDLER ─────────────────────────────────────────────────────────────
app.use(notFound);

// ─── GLOBAL ERROR HANDLER ─────────────────────────────────────────────────────
app.use(errorHandler);

module.exports = app;
