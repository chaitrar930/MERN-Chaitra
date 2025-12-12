require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const mentorRoutes = require('./routes/mentorRoutes');
const sessionRoutes = require('./routes/sessionRoutes');

const app = express();
app.use(cors());
app.use(express.json());

// connect to DB
connectDB();

// routes
app.use('/api/mentors', mentorRoutes);
app.use('/api/sessions', sessionRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
