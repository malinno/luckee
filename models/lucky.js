const mongoose = require('mongoose');

const luckySchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, required: true },
  ticlat_id: { type: mongoose.Schema.Types.ObjectId, required: true },
  prize: { type: String, required: true },
  created_at: { type: Date, required: true },
});

const Lucky = mongoose.model('Lucky', luckySchema);

module.exports = Lucky;
