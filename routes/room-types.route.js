// Modules
const express = require('express');

const router = express.Router();

// Controllers
const room_types_controllers = require('../controllers/room-types.controller');

router.get('/', room_types_controllers.readAll);
router.get('/:id', room_types_controllers.readOne);
router.post('/', room_types_controllers.uploadImg, room_types_controllers.create);
router.put('/:id', room_types_controllers.uploadImg, room_types_controllers.update);
router.delete('/:id', room_types_controllers.delete);

module.exports = router;