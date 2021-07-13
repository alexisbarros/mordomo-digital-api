// Modules
const express = require('express');

const router = express.Router();

// Controllers
const menu_options_controllers = require('../controllers/menu-options.controller');

router.get('/user/:userId', menu_options_controllers.readAll);
router.get('/:id', menu_options_controllers.readOne);
router.post('/', menu_options_controllers.create);
router.put('/:id', menu_options_controllers.update);
router.delete('/:id', menu_options_controllers.delete);

module.exports = router;