// Modules
const express = require('express');

const router = express.Router();

// Controllers
const market_item_groups_controllers = require('../controllers/market-item-groups.controller');

router.get('/', market_item_groups_controllers.readAll);
router.get('/:id', market_item_groups_controllers.readOne);
router.post('/', market_item_groups_controllers.uploadImg, market_item_groups_controllers.create);
router.put('/:id', market_item_groups_controllers.uploadImg, market_item_groups_controllers.update);
router.delete('/:id', market_item_groups_controllers.delete);

module.exports = router;