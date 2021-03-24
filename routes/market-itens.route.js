// Modules
const express = require('express');

const router = express.Router();

// Controllers
const market_itens_controllers = require('../controllers/market-itens.controller');

router.get('/', market_itens_controllers.readAll);
router.get('/:id', market_itens_controllers.readOne);
router.post('/', market_itens_controllers.create);
router.put('/:id', market_itens_controllers.update);
router.delete('/:id', market_itens_controllers.delete);

module.exports = router;