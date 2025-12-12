// backend/server.js
require('dotenv').config();
const path = require('path');
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const mentorRoutes = require('./routes/mentorRoutes');
const sessionRoutes = require('./routes/sessionRoutes');

const app = express();

app.use(cors());
app.use(express.json());

// Ensure uncaught errors are logged and cause a clean exit
process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception! Shutting down...', err);
  process.exit(1);
});

// Connect to DB and start server only after successful connection
const PORT = process.env.PORT || 5000;

async function start() {
  try {
    await connectDB(); // connectDB should throw if MONGO_URI missing/invalid

    // API routes
    app.use('/api/mentors', mentorRoutes);
    app.use('/api/sessions', sessionRoutes);

    // Serve frontend build in production
    if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/dist')));

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/dist/index.html'));
  });
}


    // Friendly root route (useful in non-production or as fallback)
    app.get('/', (req, res) => {
      res.send('Mentoring backend API — visit /api/mentors or /api/sessions');
    });

    const server = app.listen(PORT, () =>
      console.log(`Server running on port ${PORT}`)
    );

    // handle unhandled promise rejections
    process.on('unhandledRejection', (err) => {
      console.error('Unhandled Rejection! Shutting down...', err);
      server.close(() => process.exit(1));
    });

  } catch (err) {
    console.error('Failed to start application:', err);
    process.exit(1);
  }
}

start();
