const UserService = require('../../services/userService');
const User = require('../../models/user');
const mongoose = require('mongoose');

describe('User 單元測試', () => {
    beforeEach(async () => {
      // 清除所有使用者資料
      await User.deleteMany({});
    });
  
    afterEach(async () => {
      // 確保每次測試後清理資料庫
      await User.deleteMany({});
    });

  describe('使用者創建', () => {
    it('應該成功創建使用者', async () => {
      const userData = {
        email: 'test@example.com',
        username: 'testuser',
        password: 'password123'
      };

      const user = await UserService.createUser(userData);

      expect(user.email).toBe(userData.email);
      expect(user.username).toBe(userData.username);
      expect(user.password).not.toBe(userData.password); // 密碼應該被加密
    });

    it('創建使用者時缺少必要字段應該拋出錯誤', async () => {
      const invalidUser = {
        email: 'test@example.com'
        // 缺少 username 和 password
      };

      await expect(UserService.createUser(invalidUser))
        .rejects
        .toThrow();
    });
  });

  describe('使用者查詢', () => {
    it('應該返回所有使用者', async () => {
      const usersData = [
        { email: 'user1@example.com', username: 'user1', password: 'pass1' },
        { email: 'user2@example.com', username: 'user2', password: 'pass2' }
      ];

      await User.create(usersData);

      const users = await UserService.getAllUsers();

      expect(users).toHaveLength(2);
      expect(users[0].email).toBe('user1@example.com');
      expect(users[1].email).toBe('user2@example.com');
    });

    it('應該通過 ID 查找特定使用者', async () => {
      const userData = {
        email: 'testuser@example.com',
        username: 'testuser',
        password: 'password123'
      };

      const createdUser = await User.create(userData);
      const foundUser = await UserService.getUserById(createdUser._id);

      expect(foundUser.email).toBe(userData.email);
    });

    it('查找不存在的使用者 ID 應該返回 null', async () => {
      const fakeId = new mongoose.Types.ObjectId();
      const user = await UserService.getUserById(fakeId);
      expect(user).toBeNull();
    });
  });

  describe('使用者更新', () => {
    it('應該成功更新使用者', async () => {
      const user = await User.create({
        email: 'original@example.com',
        username: 'originaluser',
        password: 'originalpass'
      });

      const updateData = {
        username: 'updateduser'
      };

      const updatedUser = await UserService.updateUser(user._id, updateData);

      expect(updatedUser.username).toBe(updateData.username);
      expect(updatedUser.email).toBe(user.email); // 未更新的字段應保持不變
    });

    it('更新不存在的使用者應該返回 null', async () => {
      const fakeId = new mongoose.Types.ObjectId();
      const result = await UserService.updateUser(fakeId, {
        username: 'newuser'
      });

      expect(result).toBeNull();
    });
  });

  describe('使用者刪除', () => {
    it('應該成功刪除使用者', async () => {
      const user = await User.create({
        email: 'todelete@example.com',
        username: 'todeleteuser',
        password: 'todeletepass'
      });

      const deletedUser = await UserService.deleteUser(user._id);
      expect(deletedUser._id).toEqual(user._id);

      // 驗證使用者確實被刪除
      const findUser = await User.findById(user._id);
      expect(findUser).toBeNull();
    });

    it('刪除不存在的使用者應該返回 null', async () => {
      const fakeId = new mongoose.Types.ObjectId();
      const result = await UserService.deleteUser(fakeId);
      expect(result).toBeNull();
    });
  });
});