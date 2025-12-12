const mongoose = require('mongoose');

const MentorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  role: { type: String, enum: ['mentor','mentee'], default: 'mentor' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Mentor', MentorSchema);
