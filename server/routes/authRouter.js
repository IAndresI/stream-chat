const Router = require('express');
const router = new Router();
const authController = require('../controllers/authController');

router.post('/signup', authController.signUp);
router.post('/login', authController.login);

module.exports = router;