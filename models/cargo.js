const mongoose = require('mongoose');

const cargoSchema = new mongoose.Schema({
  name: { type: String, required: true },
  weight: { type: Number, required: true },
  category: { type: String, required: true },
  tradeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Trade' }
});

module.exports = mongoose.model('Cargo', cargoSchema);
