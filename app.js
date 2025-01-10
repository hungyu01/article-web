const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

// 載入環境變數
dotenv.config();

// 建立 Express 應用程式
const app = express();

// 解析 JSON 請求體
app.use(express.json());

// 連接 MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('成功連接到 MongoDB'))
  .catch(err => console.error('MongoDB 連接錯誤:', err));

// 載入路由
const routes = require('./routes');

// 使用路由
app.use('/api', routes);

// 錯誤處理中間件
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: '伺服器發生錯誤' });
});

// 設定伺服器監聽端口
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`伺服器運行在端口 ${PORT}`);
});

module.exports = app;
