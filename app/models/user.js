const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true // 確保用戶名是唯一的
  },
  email: {
    type: String,
    required: true,
    unique: true // 確保電子郵件是唯一的
  },
  password: {
    type: String,
    required: true
  }
}, {
  timestamps: true // 自動添加 createdAt 和 updatedAt 時間戳
});

module.exports = mongoose.model('User', UserSchema);