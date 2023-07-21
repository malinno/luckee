const express = require('express');
const router = express.Router();
const Lucky = require('../models/lucky');

// Middleware để phân tích các request có dạng JSON
router.use(express.json());

// API endpoint để tạo một dữ liệu lucky mới
// Trong API endpoint để tạo một dữ liệu lucky mới
router.post('/', async (req, res) => {
    try {
      const { user_id, ticlat_id, prize, created_at } = req.body;
  
      // Chuyển đổi chuỗi ngày thành đối tượng ngày
      const parsedDate = new Date(created_at);
  
      // Tạo một dữ liệu lucky mới
      const lucky = await Lucky.create({ user_id: mongoose.Types.ObjectId(user_id), ticlat_id: mongoose.Types.ObjectId(ticlat_id), prize, created_at: parsedDate });
      res.json(lucky);
    } catch (error) {
      console.error(error); // In ra lỗi trong console để kiểm tra
      res.status(500).json({ error: 'Không thể tạo dữ liệu lucky.' });
    }
  });
  
  
  
// API endpoint để thực hiện quá trình quay thưởng
router.post('/spin', async (req, res) => {
    try {
      // Thực hiện quá trình quay thưởng ở đây
      // ... viết mã xử lý quay thưởng ...
  
      // Ví dụ: Giả sử người dùng trúng giải thưởng có mã "VOUCHER123"
      const voucherCode = "VOUCHER123";
  
      // Tìm thông tin về giải thưởng trong bảng "vouchers" dựa vào mã giải thưởng
      const voucher = await Voucher.findOne({ code: voucherCode });
  
      // Lưu thông tin về giải thưởng đã trúng thưởng vào bảng "lucky"
      const user_id = "user1Id"; // Đây là user_id của người dùng thực tế
      const ticlat_id = "64b95bc5a894b1e6049a5b5e"; // Đây là ticlat_id của người dùng thực tế
      const prize = voucher ? voucher.prize : "Không trúng giải";
      const created_at = new Date();
      const lucky = await Lucky.create({ user_id, ticlat_id, prize, created_at });
  
      res.json({ message: "Quay thưởng thành công!", lucky });
    } catch (error) {
      console.error(error); // In ra lỗi trong console để kiểm tra
      res.status(500).json({ error: 'Không thể thực hiện quá trình quay thưởng.' });
    }
  });
// API endpoint để lấy danh sách các dữ liệu lucky
router.get('/', async (req, res) => {
  try {
    // Lấy danh sách các dữ liệu lucky từ cơ sở dữ liệu
    const luckyData = await Lucky.find();
    res.json(luckyData);
  } catch (error) {
    res.status(500).json({ error: 'Không thể lấy danh sách dữ liệu lucky.' });
  }
});

module.exports = router;
