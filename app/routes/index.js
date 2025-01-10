const express = require('express');
const router = express.Router();
const articleRoutes = require('./api/articleRoutes');

// 文章相關路由
router.use('/articles', articleRoutes);

// 404 處理
router.use((req, res) => {
  res.status(404).json({ message: '找不到請求的資源' });
});

module.exports = router;
