const Article = require('../models/article');

class ArticleRepository {
  async create(articleData) {
    return await Article.create(articleData);
  }

  async findAll() {
    return await Article.find();
  }

  async findById(id) {
    return await Article.findById(id);
  }

  async update(id, articleData) {
    return await Article.findByIdAndUpdate(id, articleData, { new: true });
  }

  async delete(id) {
    return await Article.findByIdAndDelete(id);
  }
}

module.exports = new ArticleRepository(); 