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

console.log("NODE_ENV is:", process.env.NODE_ENV);

// connect to DB and start server
const PORT = process.env.PORT || 5000;

async function start() {
  try {
    await connectDB();

    // API routes
    app.use('/api/mentors', mentorRoutes);
    app.use('/api/sessions', sessionRoutes);

    // ⭐ Serve Vite frontend in production
    // ⭐ Serve Vite frontend in production
if (process.env.NODE_ENV === 'production') {
  const frontendPath = path.resolve(__dirname, '../frontend/dist');
  console.log("Serving frontend from:", frontendPath);

  app.use(express.static(frontendPath));

  app.get('*', (req, res) => {
    res.sendFile(path.join(frontendPath, 'index.html'));
  });
}


    // DO NOT override frontend with this.
    // If you want a root route, only use in dev:
    if (process.env.NODE_ENV !== 'production') {
      app.get('/', (req, res) => {
        res.send('API running. Try /api/mentors or /api/sessions');
      });
    }

    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

  } catch (err) {
    console.error('Failed to start server:', err);
    process.exit(1);
  }
}

start();
