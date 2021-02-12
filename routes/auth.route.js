// Modules
const express = require('express');

const router = express.Router();

// Controllers
const auth_controller = require('../controllers/auth.controller');

router.post('/register', auth_controller.register);
router.post('/login', auth_controller.login);
router.post('/login-admin', auth_controller.loginAdmin);

module.exports = router;