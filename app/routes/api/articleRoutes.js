const express = require('express');
const router = express.Router();
const ArticleController = require('../../controllers/articleController');

router.post('/', ArticleController.createArticle.bind(ArticleController));
router.get('/', ArticleController.getAllArticles.bind(ArticleController));
router.get('/:id', ArticleController.getArticleById.bind(ArticleController));
router.put('/:id', ArticleController.updateArticle.bind(ArticleController));
router.delete('/:id', ArticleController.deleteArticle.bind(ArticleController));

module.exports = router; 