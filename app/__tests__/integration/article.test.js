const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const request = require('supertest');
const app = require('../../app');
const Article = require('../../models/article');

describe('Article API 整合測試', () => {
  let mongoServer;

  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const mongoUri = mongoServer.getUri();
    await mongoose.connect(mongoUri);
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
  });

  beforeEach(async () => {
    await Article.deleteMany({});
  });

  describe('POST /api/articles', () => {
    it('應該創建新文章', async () => {
      const articleData = {
        title: '測試標題',
        content: '測試內容',
        author: '測試作者'
      };

      const response = await request(app)
        .post('/api/articles')
        .send(articleData)
        .expect(201);

      expect(response.body.title).toBe(articleData.title);
      expect(response.body.content).toBe(articleData.content);
      expect(response.body.author).toBe(articleData.author);

      // 驗證數據庫
      const article = await Article.findById(response.body._id);
      expect(article).toBeTruthy();
      expect(article.title).toBe(articleData.title);
    });

    it('缺少必要字段時應該返回 400', async () => {
      const invalidArticle = {
        title: '測試標題'
        // 缺少 content 和 author
      };

      await request(app)
        .post('/api/articles')
        .send(invalidArticle)
        .expect(500); // 或 400，取決於你的錯誤處理方式
    });
  });

  describe('GET /api/articles', () => {
    it('應該獲取所有文章', async () => {
      // 預先創建測試數據
      const articles = [
        { title: '文章1', content: '內容1', author: '作者1' },
        { title: '文章2', content: '內容2', author: '作者2' }
      ];
      await Article.insertMany(articles);

      const response = await request(app)
        .get('/api/articles')
        .expect(200);

      expect(response.body).toHaveLength(2);
      expect(response.body[0].title).toBe('文章1');
      expect(response.body[1].title).toBe('文章2');
    });
  });

  describe('GET /api/articles/:id', () => {
    it('應該通過 ID 獲取特定文章', async () => {
      const article = await Article.create({
        title: '測試文章',
        content: '測試內容',
        author: '測試作者'
      });

      const response = await request(app)
        .get(`/api/articles/${article._id}`)
        .expect(200);

      expect(response.body.title).toBe('測試文章');
    });

    it('不存在的 ID 應該返回 404', async () => {
      const fakeId = new mongoose.Types.ObjectId();
      await request(app)
        .get(`/api/articles/${fakeId}`)
        .expect(404);
    });
  });
}); 