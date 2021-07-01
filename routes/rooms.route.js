// Modules
const express = require('express');

const router = express.Router();

// Controllers
const rooms_controllers = require('../controllers/rooms.controller');

router.get('/user/:id', rooms_controllers.readAll);
router.get('/:id', rooms_controllers.readOne);
router.post('/', rooms_controllers.create);
router.post('/many/', rooms_controllers.createMany);
router.put('/:id', rooms_controllers.update);
router.delete('/:id', rooms_controllers.delete);

module.exports = router;