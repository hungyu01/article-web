const ArticleService = require('../services/articleService');

class ArticleController {
  async createArticle(req, res) {
    try {
      const article = await ArticleService.createArticle(req.body);
      res.status(201).json(article);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async getAllArticles(req, res) {
    try {
      const articles = await ArticleService.getAllArticles();
      res.json(articles);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async getArticleById(req, res) {
    try {
      const article = await ArticleService.getArticleById(req.params.id);
      if (!article) {
        return res.status(404).json({ message: '文章未找到' });
      }
      res.json(article);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async updateArticle(req, res) {
    try {
      const article = await ArticleService.updateArticle(req.params.id, req.body);
      if (!article) {
        return res.status(404).json({ message: '文章未找到' });
      }
      res.json(article);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async deleteArticle(req, res) {
    try {
      const article = await ArticleService.deleteArticle(req.params.id);
      if (!article) {
        return res.status(404).json({ message: '文章未找到' });
      }
      res.json({ message: '文章已刪除' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}

module.exports = new ArticleController(); 