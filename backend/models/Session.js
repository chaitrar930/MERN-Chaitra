const mongoose = require('mongoose');

const SessionSchema = new mongoose.Schema({
  date: { type: String, required: true },
  mentorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Mentor' },
  menteeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Mentor' },
  tag: { type: String },
  notes: { type: String },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Session', SessionSchema);
