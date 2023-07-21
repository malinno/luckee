const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// Định nghĩa schema cho dữ liệu vòng quay may mắn
const spinWheelSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  options: [{
    prize: { type: String, required: true },
    probability: { type: Number, required: true },
  }],
  created_at: { type: Date, required: true },
  spin_count: { type: Number, default: 0 }, // Thêm trường spin_count
});

// Tạo model từ schema
const SpinWheel = mongoose.model('SpinWheel', spinWheelSchema);

// Middleware để phân tích các request có dạng JSON
router.use(express.json());

// API endpoint để tạo một vòng quay may mắn mới
router.post('/', async (req, res) => {
  try {
    const { name, description, options } = req.body;
    const created_at = new Date();

    // Tạo một vòng quay may mắn mới
    const spinWheel = await SpinWheel.create({ name, description, options, created_at });
    res.json(spinWheel);
  } catch (error) {
    res.status(500).json({ error: 'Không thể tạo vòng quay may mắn.' });
  }
});

// API endpoint để lấy danh sách các vòng quay may mắn
router.get('/', async (req, res) => {
  try {
    // Lấy danh sách các vòng quay may mắn từ cơ sở dữ liệu
    const spinWheels = await SpinWheel.find();
    res.json(spinWheels);
  } catch (error) {
    res.status(500).json({ error: 'Không thể lấy danh sách vòng quay may mắn.' });
  }
});

// API endpoint để cập nhật số lần quay của một vòng quay may mắn cụ thể
router.put('/:id/spin_count', async (req, res) => {
  try {
    const { spin_count } = req.body;
    // Tìm vòng quay may mắn cần cập nhật
    const spinWheel = await SpinWheel.findById(req.params.id);
    if (!spinWheel) {
      return res.status(404).json({ error: 'Vòng quay may mắn không tồn tại.' });
    }
    // Cập nhật số lần quay của vòng quay may mắn
    spinWheel.spin_count = spin_count;
    await spinWheel.save();
    res.json(spinWheel);
  } catch (error) {
    res.status(500).json({ error: 'Không thể cập nhật số lần quay của vòng quay may mắn.' });
  }
});

module.exports = router;
