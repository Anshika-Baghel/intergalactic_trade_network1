const mongoose = require('mongoose');

const inventorySchema = new mongoose.Schema({
  station: { type: String, required: true },
  cargoItems: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Cargo' }],
  capacity: { type: Number, required: true },
  occupied: { type: Number, required: true }
});

module.exports = mongoose.model('Inventory', inventorySchema);
