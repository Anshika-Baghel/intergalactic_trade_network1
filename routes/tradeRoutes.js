const express = require('express');
const Trade = require('../models/trade');

const router = express.Router();

module.exports = function (io) {
  // Create new trade
//   router.post('/', async (req, res) => {
//     try {
//       const trade = new Trade(req.body);
//       await trade.save();

//       // Emit a real-time event to clients for new trade
//       io.emit('tradeCreated', trade);
//       res.status(201).json(trade);
//     } catch (error) {
//       res.status(500).json({ error: 'Failed to create trade' });
//     }
//   });
router.post('/', async (req, res) => {
    console.log(req.body); // Add this to inspect the body content
    try {
      const trade = new Trade(req.body);
      await trade.save();
  
      io.emit('tradeCreated', trade);
      res.status(201).json(trade);
    } catch (error) {
      console.error('Error creating trade:', error); // Log detailed error
      res.status(500).json({ error: 'Failed to create trade' });
    }
  });

  router.get('/:transaction_id', async (req, res) => {
    try {
      const transactionId = req.params.transaction_id;
      const trade = await Trade.findOne({ _id: transactionId }); // Assuming transaction_id is stored as _id

      if (!trade) {
        return res.status(404).json({ error: 'Trade not found' });
      }

      res.status(200).json(trade);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to fetch trade' });
    }
  });


  // Update trade status
//   router.put('/:id', async (req, res) => {
//     try {
//       const trade = await Trade.findByIdAndUpdate(req.params.id, req.body, { new: true });
      
//       // Emit an update event
//       io.emit('tradeUpdated', trade);
//       res.status(200).json(trade);
//     } catch (error) {
//       res.status(500).json({ error: 'Failed to update trade' });
//     }
//   });



// // Update trade status
// router.post('/update', async (req, res) => {
//     try {
//       const { tradeId, newStatus } = req.body;
//       const trade = await Trade.findById(tradeId);
  
//       if (!trade) {
//         return res.status(404).json({ error: 'Trade not found' });
//       }
  
//       trade.status = newStatus;
//       await trade.save();
  
//       // Emit update to clients
//       req.app.get('io').emit('update', {
//         type: 'trade',
//         tradeId,
//         status: newStatus
//       });
  
//       res.status(200).json(trade);
//     } catch (error) {
//       console.error('Error updating trade:', error);
//       res.status(500).json({ error: 'Failed to update trade' });
//     }
//   });
  
  

  return router;
};
