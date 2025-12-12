const express = require('express');
const router = express.Router();
const Session = require('../models/Session');

// GET /api/sessions
router.get('/', async (req, res) => {
  const list = await Session.find().sort({ createdAt: -1 });
  res.json(list);
});

// POST /api/sessions
router.post('/', async (req, res) => {
  const { date, mentorId, menteeId, tag, notes } = req.body;
  if(!date) return res.status(400).json({ message: 'Date is required' });
  const s = new Session({ date, mentorId, menteeId, tag, notes });
  await s.save();
  res.status(201).json(s);
});

// DELETE /api/sessions/:id
router.delete('/:id', async (req, res) => {
  await Session.findByIdAndDelete(req.params.id);
  res.json({ message: 'Deleted' });
});

module.exports = router;
