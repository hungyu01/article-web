const ArticleRepository = require('../repositories/articleRepository');

class ArticleService {
  async createArticle(articleData) {
    return await ArticleRepository.create(articleData);
  }

  async getAllArticles() {
    return await ArticleRepository.findAll();
  }

  async getArticleById(id) {
    return await ArticleRepository.findById(id);
  }

  async updateArticle(id, articleData) {
    return await ArticleRepository.update(id, articleData);
  }

  async deleteArticle(id) {
    return await ArticleRepository.delete(id);
  }
}

module.exports = new ArticleService(); 