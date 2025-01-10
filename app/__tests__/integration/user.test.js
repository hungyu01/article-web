const request = require('supertest');
const app = require('../../app');
const User = require('../../models/user');

describe('User API 整合測試', () => {
  beforeEach(() => {
    User.clearAll();
  });

  describe('POST /api/users', () => {
    it('應該創建新使用者', async () => {
      const userData = {
        email: 'test@example.com',
        username: 'testuser',
        password: 'password123'
      };

      const response = await request(app)
        .post('/api/users')
        .send(userData)
        .expect(201);

      expect(response.body.email).toBe(userData.email);
      expect(response.body.username).toBe(userData.username);
      expect(response.body.password).not.toBe(userData.password); // 密碼應該被加密
    });

    it('缺少必要字段時應該返回 400', async () => {
      const invalidUser = {
        email: 'test@example.com'
        // 缺少 username 和 password
      };

      await request(app)
        .post('/api/users')
        .send(invalidUser)
        .expect(400);
    });
  });

  // 其他 CRUD 和搜尋測試...
}); 