const mongoose = require('mongoose');

const voucherSchema = new mongoose.Schema({
  code: { type: String, required: true, unique: true },
  discount: { type: Number, required: true },
  expiration_date: { type: Date, required: true },
});

const Voucher = mongoose.model('Voucher', voucherSchema);

module.exports = Voucher;
