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


router.get('/:shipment_id', async (req, res) => {
    try {
      const shipmentId = req.params.shipment_id;
      const cargo = await Cargo.findOne({ _id: shipmentId }); // Assuming shipment_id is stored as _id
  
      if (!cargo) {
        return res.status(404).json({ error: 'Cargo not found' });
      }
  
      res.status(200).json(cargo);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to fetch cargo' });
    }
  });



  

// Update cargo status
// router.post('/update', async (req, res) => {
//     try {
//       const { cargoId, newStatus } = req.body;
//       const cargo = await Cargo.findById(cargoId);
  
//       if (!cargo) {
//         return res.status(404).json({ error: 'Cargo not found' });
//       }
  
//       cargo.status = newStatus;
//       await cargo.save();
  
//       // Emit update to clients
//       req.app.get('io').emit('update', {
//         type: 'cargo',
//         cargoId,
//         status: newStatus
//       });
  
//       res.status(200).json(cargo);
//     } catch (error) {
//       console.error('Error updating cargo:', error);
//       res.status(500).json({ error: 'Failed to update cargo' });
//     }
//   });
  
  
  

module.exports = router;
