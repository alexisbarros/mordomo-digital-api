// Modules
const express = require('express');

const router = express.Router();

// Controllers
const users_controller = require('../controllers/users.controller');

// Routes
router.post('/', users_controller.create);
router.get('/', users_controller.readAll);
router.get('/:id', users_controller.readOne);
router.put('/:id', users_controller.update);
router.delete('/:id', users_controller.delete);

module.exports = router;