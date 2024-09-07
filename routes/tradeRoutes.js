const express = require('express');
const Trade = require('../models/trade');

const router = express.Router();

module.exports = function (io) {
  // Create new trade
  router.post('/', async (req, res) => {
    try {
      const trade = new Trade(req.body);
      await trade.save();

      // Emit a real-time event to clients for new trade
      io.emit('tradeCreated', trade);
      res.status(201).json(trade);
    } catch (error) {
      res.status(500).json({ error: 'Failed to create trade' });
    }
  });

  // Update trade status
  router.put('/:id', async (req, res) => {
    try {
      const trade = await Trade.findByIdAndUpdate(req.params.id, req.body, { new: true });
      
      // Emit an update event
      io.emit('tradeUpdated', trade);
      res.status(200).json(trade);
    } catch (error) {
      res.status(500).json({ error: 'Failed to update trade' });
    }
  });

  return router;
};
