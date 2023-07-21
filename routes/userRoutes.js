const express = require('express');
const router = express.Router();
const User = require('../models/user');

// Middleware để phân tích các request có dạng JSON
router.use(express.json());

// API endpoint để tạo một người dùng mới
router.post('/', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const created_at = new Date();

    // Tạo một người dùng mới
    const user = await User.create({ username, email, password, created_at });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Không thể tạo người dùng.' });
  }
});

// API endpoint để lấy danh sách các người dùng
router.get('/', async (req, res) => {
  try {
    // Lấy danh sách các người dùng từ cơ sở dữ liệu
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Không thể lấy danh sách người dùng.' });
  }
});

module.exports = router;
