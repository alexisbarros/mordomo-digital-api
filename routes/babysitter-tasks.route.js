// Modules
const express = require('express');

const router = express.Router();

// Controllers
const babysitter_tasks_controllers = require('../controllers/babysitter-tasks.controller');

router.get('/', babysitter_tasks_controllers.readAll);
router.get('/:id', babysitter_tasks_controllers.readOne);
router.post('/', babysitter_tasks_controllers.create);
router.put('/:id', babysitter_tasks_controllers.update);
router.delete('/:id', babysitter_tasks_controllers.delete);

module.exports = router;