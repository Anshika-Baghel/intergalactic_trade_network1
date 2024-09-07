const express = require('express');
const Cargo = require('../models/cargo');

const router = express.Router();

// Add new cargo
router.post('/', async (req, res) => {
  try {
    const cargo = new Cargo(req.body);
    await cargo.save();
    res.status(201).json(cargo);
  } catch (error) {
    res.status(500).json({ error: 'Failed to add cargo' });
  }
});

// Get all cargo
router.get('/', async (req, res) => {
  try {
    const cargo = await Cargo.find();
    res.status(200).json(cargo);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve cargo' });
  }
});

module.exports = router;
