require('dotenv').config();

const app = require('./app');
const connectDB = require('./config/db');

const PORT = process.env.PORT || 5000;

// ─── STARTUP ──────────────────────────────────────────────────────────────────
// Connect to MongoDB first, then start the HTTP server.
// If the DB connection fails, we don't want to accept traffic.
const startServer = async () => {
  try {
    await connectDB();

    const server = app.listen(PORT, () => {
      console.log(`✅ Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
    });

    // ─── GRACEFUL SHUTDOWN ─────────────────────────────────────────────────
    // On SIGTERM (Render sends this before restarting), finish in-flight
    // requests then close cleanly instead of killing the process immediately.
    process.on('SIGTERM', () => {
      console.log('⚠️  SIGTERM received. Shutting down gracefully...');
      server.close(() => {
        console.log('✅ HTTP server closed.');
        process.exit(0);
      });
    });

    process.on('SIGINT', () => {
      console.log('⚠️  SIGINT received. Shutting down gracefully...');
      server.close(() => {
        console.log('✅ HTTP server closed.');
        process.exit(0);
      });
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error.message);
    process.exit(1);
  }
};

// ─── UNHANDLED REJECTIONS ─────────────────────────────────────────────────────
// Catch any promise that rejects without a .catch() — log it and exit.
process.on('unhandledRejection', (reason) => {
  console.error('❌ Unhandled Promise Rejection:', reason);
  process.exit(1);
});

startServer();
