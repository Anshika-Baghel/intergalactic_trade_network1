const mongoose = require('mongoose');

const tradeSchema = new mongoose.Schema({
  origin: { type: String, required: true },
  destination: { type: String, required: true },
  cargo: { type: mongoose.Schema.Types.ObjectId, ref: 'Cargo', required: true },
  status: { type: String, enum: ['initiated', 'in-transit', 'completed'], default: 'initiated' },
  timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Trade', tradeSchema);
