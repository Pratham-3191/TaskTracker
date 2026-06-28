const mongoose = require('mongoose');

// ─── Connect to MongoDB ───────────────────────────────────────────────────────
// This function is called once from server.js during startup.
// We intentionally let it throw on failure so server.js can catch it
// and exit the process — no point serving traffic without a database.
const connectDB = async () => {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    throw new Error('MONGODB_URI is not defined in environment variables');
  }

  // ─── Connection Event Listeners ─────────────────────────────────────────
  // Set up listeners before calling connect so we don't miss early events.
  mongoose.connection.on('connected', () => {
    console.log(`✅ MongoDB connected: ${mongoose.connection.host}`);
  });

  mongoose.connection.on('error', (err) => {
    console.error('❌ MongoDB connection error:', err.message);
  });

  mongoose.connection.on('disconnected', () => {
    console.warn('⚠️  MongoDB disconnected');
  });

  await mongoose.connect(uri, {
    // Mongoose 7+ has these on by default, but being explicit is good
    // practice so behavior is predictable regardless of library version.
    serverSelectionTimeoutMS: 5000, // Fail fast if Atlas is unreachable
    socketTimeoutMS: 45000,         // Close idle sockets after 45 seconds
  });
};

module.exports = connectDB;
