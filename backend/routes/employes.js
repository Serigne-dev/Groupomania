const express = require('express');
const router = express.Router();
const multer = require('../middleware/multer-config');

const userCtrl = require('../controllers/employes'); // enregistre le controller user

router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);
router.delete('/delete', userCtrl.delete);
router.put('/modify',multer, userCtrl.modify);
router.post('/profil', userCtrl.getUserById);

module.exports = router;