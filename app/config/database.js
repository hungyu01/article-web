const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB 連接成功');
  } catch (error) {
    console.error('MongoDB 連接失敗:', error);
    process.exit(1);
  }
};

module.exports = connectDB; 