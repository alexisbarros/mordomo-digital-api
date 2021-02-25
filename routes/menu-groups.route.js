// Modules
const express = require('express');

const router = express.Router();

// Controllers
const menu_groups_controllers = require('../controllers/menu-groups.controller');

router.get('/', menu_groups_controllers.readAll);
router.get('/:id', menu_groups_controllers.readOne);
router.post('/', menu_groups_controllers.create);
router.put('/:id', menu_groups_controllers.update);
router.delete('/:id', menu_groups_controllers.delete);

module.exports = router;