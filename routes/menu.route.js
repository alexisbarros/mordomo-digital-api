// Modules
const express = require('express');

const router = express.Router();

// Controllers
const menu_controllers = require('../controllers/menu.controller');

router.get('/user/:id', menu_controllers.readAll);
router.get('/:id', menu_controllers.readOne);
router.post('/', menu_controllers.create);
router.put('/:id', menu_controllers.update);
router.delete('/:id', menu_controllers.delete);

module.exports = router;