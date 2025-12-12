const express = require('express');
const router = express.Router();
const Mentor = require('../models/Mentor');

// GET /api/mentors
router.get('/', async (req, res) => {
  const list = await Mentor.find().sort({ createdAt: -1 });
  res.json(list);
});

// POST /api/mentors
router.post('/', async (req, res) => {
  const { name, role } = req.body;
  if(!name) return res.status(400).json({ message: 'Name is required' });
  const m = new Mentor({ name, role });
  await m.save();
  res.status(201).json(m);
});

// DELETE /api/mentors/:id
router.delete('/:id', async (req, res) => {
  await Mentor.findByIdAndDelete(req.params.id);
  res.json({ message: 'Deleted' });
});

module.exports = router;
