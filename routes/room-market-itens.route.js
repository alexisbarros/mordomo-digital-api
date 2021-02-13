// Modules
const express = require('express');

const router = express.Router();

// Controllers
const room_market_itens_controllers = require('../controllers/room-market-itens.controller');

router.get('/', room_market_itens_controllers.readAll);
router.get('/:id', room_market_itens_controllers.readOne);
router.post('/', room_market_itens_controllers.create);
router.put('/:id', room_market_itens_controllers.update);
router.delete('/:id', room_market_itens_controllers.delete);

module.exports = router;