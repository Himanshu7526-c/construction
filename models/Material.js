
const mongoose = require('mongoose');

const usageSchema = new mongoose.Schema({
  amount: Number,
  usedAt: { type: Date, default: Date.now }
});

const materialSchema = new mongoose.Schema({
  type: String,
  quantity: Number,
  site: String,
  usage: [usageSchema]
});

module.exports = mongoose.model('Material', materialSchema);
