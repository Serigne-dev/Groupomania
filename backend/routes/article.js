const express = require('express');
const router = express.Router();

const articleCtrl = require('../controllers/article'); // enregistre le controller user

router.get('/', articleCtrl.getAllArticles);
router.post('/', articleCtrl.createArticle);

module.exports = router;