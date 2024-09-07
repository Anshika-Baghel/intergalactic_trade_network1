const express = require('express');
const Inventory = require('../models/inventory');

const router = express.Router();

// Fetch inventory levels by station_id
router.get('/:station_id', async (req, res) => {
  try {
    const stationId = req.params.station_id;
    const inventory = await Inventory.findOne({ station: stationId }); // Assuming 'station' is a unique identifier

    if (!inventory) {
      return res.status(404).json({ error: 'Station inventory not found' });
    }

    // Return relevant inventory data (capacity and occupied levels)
    res.status(200).json({
      station: inventory.station,
      capacity: inventory.capacity,
      occupied: inventory.occupied,
      available: inventory.capacity - inventory.occupied  // Calculate available space
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch inventory levels' });
  }
});




// Create new inventory for a station
router.post('/', async (req, res) => {
    try {
      const { station, cargoItems, capacity, occupied } = req.body;
  
      const inventory = new Inventory({
        station,
        cargoItems,
        capacity,
        occupied
      });
  
      await inventory.save();
      res.status(201).json(inventory);
    } catch (error) {
      console.error('Error creating inventory:', error);
      res.status(500).json({ error: 'Failed to create inventory' });
    }
  });
  
  
  

module.exports = router;
