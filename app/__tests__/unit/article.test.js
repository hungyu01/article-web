const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const ArticleService = require('../../services/articleService');
const Article = require('../../models/article');

describe('Article 單元測試', () => {
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

  describe('文章創建', () => {
    it('應該成功創建文章', async () => {
      const articleData = {
        title: '測試標題',
        content: '測試內容',
        author: '測試作者'
      };

      const article = await ArticleService.createArticle(articleData);

      expect(article.title).toBe(articleData.title);
      expect(article.content).toBe(articleData.content);
      expect(article.author).toBe(articleData.author);

      // 驗證數據是否確實存入數據庫
      const savedArticle = await Article.findById(article._id);
      expect(savedArticle).toBeTruthy();
      expect(savedArticle.title).toBe(articleData.title);
    });

    it('創建文章時缺少必要字段應該拋出錯誤', async () => {
      const invalidArticle = {
        title: '測試標題'
        // 缺少 content 和 author
      };

      await expect(ArticleService.createArticle(invalidArticle))
        .rejects
        .toThrow();
    });
  });

  describe('文章查詢', () => {
    it('應該返回所有文章', async () => {
      const articlesData = [
        { title: '文章1', content: '內容1', author: '作者1' },
        { title: '文章2', content: '內容2', author: '作者2' }
      ];

      // 預先創建測試數據
      await Article.insertMany(articlesData);

      const articles = await ArticleService.getAllArticles();

      expect(articles).toHaveLength(2);
      expect(articles[0].title).toBe('文章1');
      expect(articles[1].title).toBe('文章2');
    });

    it('應該通過 ID 查找特定文章', async () => {
      const articleData = {
        title: '測試文章',
        content: '測試內容',
        author: '測試作者'
      };

      const createdArticle = await Article.create(articleData);
      const foundArticle = await ArticleService.getArticleById(createdArticle._id);

      expect(foundArticle.title).toBe(articleData.title);
      expect(foundArticle.content).toBe(articleData.content);
    });

    it('查找不存在的文章 ID 應該返回 null', async () => {
      const fakeId = new mongoose.Types.ObjectId();
      const article = await ArticleService.getArticleById(fakeId);
      expect(article).toBeNull();
    });
  });

  describe('文章更新', () => {
    it('應該成功更新文章', async () => {
      const article = await Article.create({
        title: '原始標題',
        content: '原始內容',
        author: '原始作者'
      });

      const updateData = {
        title: '更新後的標題',
        content: '更新後的內容'
      };

      const updatedArticle = await ArticleService.updateArticle(article._id, updateData);

      expect(updatedArticle.title).toBe(updateData.title);
      expect(updatedArticle.content).toBe(updateData.content);
      expect(updatedArticle.author).toBe(article.author); // 未更新的字段應保持不變
    });

    it('更新不存在的文章應該返回 null', async () => {
      const fakeId = new mongoose.Types.ObjectId();
      const result = await ArticleService.updateArticle(fakeId, {
        title: '新標題'
      });

      expect(result).toBeNull();
    });
  });

  describe('文章刪除', () => {
    it('應該成功刪除文章', async () => {
      const article = await Article.create({
        title: '要刪除的文章',
        content: '要刪除的內容',
        author: '作者'
      });

      const deletedArticle = await ArticleService.deleteArticle(article._id);
      expect(deletedArticle._id).toEqual(article._id);

      // 驗證文章確實被刪除
      const findArticle = await Article.findById(article._id);
      expect(findArticle).toBeNull();
    });

    it('刪除不存在的文章應該返回 null', async () => {
      const fakeId = new mongoose.Types.ObjectId();
      const result = await ArticleService.deleteArticle(fakeId);
      expect(result).toBeNull();
    });
  });
}); 