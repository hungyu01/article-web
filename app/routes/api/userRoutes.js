const express = require('express');
const router = express.Router();
const UserController = require('../../controllers/userController');

// 創建新用戶
router.post('/', UserController.createUser.bind(UserController));

// 獲取所有用戶
router.get('/', UserController.getAllUsers.bind(UserController));

// 根據ID獲取用戶
router.get('/:id', UserController.getUserById.bind(UserController));

// 更新用戶信息
router.put('/:id', UserController.updateUser.bind(UserController));

// 刪除用戶
router.delete('/:id', UserController.deleteUser.bind(UserController));

module.exports = router;