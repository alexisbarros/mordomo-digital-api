// Modules
const express = require('express');

const router = express.Router();

// Controllers
const room_tasks_controllers = require('../controllers/room-tasks.controller');

router.get('/', room_tasks_controllers.readAll);
router.get('/:id', room_tasks_controllers.readOne);
router.post('/', room_tasks_controllers.uploadImg, room_tasks_controllers.create);
router.put('/:id', room_tasks_controllers.uploadImg, room_tasks_controllers.update);
router.delete('/:id', room_tasks_controllers.delete);

module.exports = router;