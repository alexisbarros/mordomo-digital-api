// Modules
const express = require('express');

const router = express.Router();

// Controllers
const custom_controllers = require('../controllers/custom.controller');

router.get('/', custom_controllers.readAll);
router.get('/:id', custom_controllers.readOne);
router.post('/', custom_controllers.create);
router.put('/:id', custom_controllers.update);
router.delete('/:id', custom_controllers.delete);

module.exports = router;