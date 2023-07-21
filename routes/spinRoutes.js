// Trong file spinRoutes.js
const express = require('express');
const router = express.Router();

// Định nghĩa thông tin vòng quay may mắn (Bạn có thể lấy thông tin này từ cơ sở dữ liệu hoặc định nghĩa trực tiếp tùy ý)
const spinWheelInfo = {
  options: [
    { prize: "Giải thưởng 1", probability: 0.3 },
    { prize: "Giải thưởng 2", probability: 0.4 },
    { prize: "Giải thưởng 3", probability: 0.3 }
  ]
};

// API endpoint để thực hiện việc quay vòng quay may mắn
router.post('/', (req, res) => {
  // Thực hiện quay vòng quay may mắn và xử lý phần thưởng
  const spinResult = spinWheel();
  res.json({ prize: spinResult });
});

// Hàm thực hiện quay vòng quay may mắn và trả về phần thưởng
function spinWheel() {
  const random = Math.random(); // Số ngẫu nhiên từ 0 đến 1
  let cumulativeProbability = 0;

  // Xác định phần thưởng dựa trên xác suất của mỗi phần thưởng trong vòng quay
  for (const option of spinWheelInfo.options) {
    cumulativeProbability += option.probability;
    if (random < cumulativeProbability) {
      return option.prize;
    }
  }

  // Nếu không tìm thấy phần thưởng (ví dụ: tổng xác suất không bằng 1)
  return "Không có phần thưởng";
}

module.exports = router;
