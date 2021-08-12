const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

const articleCtrl = require('../controllers/article'); // enregistre le controller user

router.get('/', articleCtrl.getAllArticles);
router.post('/',multer, articleCtrl.createArticle);
router.post('/comment',articleCtrl.createCommentaire);

module.exports = router;