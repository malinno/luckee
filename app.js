const express = require('express');
const mongoose = require('mongoose');
const spinWheelRoutes = require('./routes/spinWheelRoutes');
const userRoutes = require('./routes/userRoutes');
const luckyRoutes = require('./routes/luckyRoutes');
const voucherRoutes = require('./routes/voucherRoutes');
const app = express();
const PORT = 3000;

// Kết nối tới cơ sở dữ liệu MongoDB
mongoose.connect('mongodb+srv://malino:nO8ygOXFvUTJOrAA@cluster0.7fe7ypy.mongodb.net/', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Đã kết nối thành công đến MongoDB!'))
  .catch((error) => console.error('Kết nối đến MongoDB thất bại:', error));

// Sử dụng router cho API endpoint vòng quay may mắn
app.use('/api/spinwheels', spinWheelRoutes);
app.use('/api/users', userRoutes);
app.use('/api/lucky',luckyRoutes);
app.use('/api/vouchers', voucherRoutes);
app.listen(PORT, () => console.log(`Server đang lắng nghe tại cổng ${PORT}`));
