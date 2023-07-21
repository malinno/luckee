const express = require('express');
const router = express.Router();
const Voucher = require('../models/voucher');

// Middleware để phân tích các request có dạng JSON
router.use(express.json());

// API endpoint để tạo một dữ liệu voucher mới
// Trong API endpoint để tạo một dữ liệu voucher mới
router.post('/', async (req, res) => {
    try {
      const { code, discount, expiration_date } = req.body;
  
      // Chuyển đổi chuỗi ngày thành đối tượng ngày
      const parsedDate = new Date(expiration_date);
  
      // Tạo một dữ liệu voucher mới
      const voucher = await Voucher.create({ code, discount, expiration_date: parsedDate });
      res.json(voucher);
    } catch (error) {
      res.status(500).json({ error: 'Không thể tạo dữ liệu voucher.' });
    }
  });
  

// API endpoint để lấy danh sách các dữ liệu voucher
router.get('/', async (req, res) => {
  try {
    // Lấy danh sách các dữ liệu voucher từ cơ sở dữ liệu
    const vouchers = await Voucher.find();
    res.json(vouchers);
  } catch (error) {
    res.status(500).json({ error: 'Không thể lấy danh sách dữ liệu voucher.' });
  }
});

module.exports = router;
