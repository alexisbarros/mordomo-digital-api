// Modules
const express = require('express');

const router = express.Router();

// Controllers
const market_cart_controllers = require('../controllers/market-cart.controller');

router.get('/user/:id', market_cart_controllers.readAll);
router.get('/:id', market_cart_controllers.readOne);
router.post('/', market_cart_controllers.create);
router.put('/:id', market_cart_controllers.update);
router.delete('/:id', market_cart_controllers.delete);

module.exports = router;