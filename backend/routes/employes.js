const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/employes'); // enregistre le controller user

router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);
router.delete('/delete', userCtrl.delete);
router.put('/modify', userCtrl.modify);

module.exports = router;