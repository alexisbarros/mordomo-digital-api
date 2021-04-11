// Modules
const express = require('express');

const router = express.Router();

// Controllers
const babysitter_controllers = require('../controllers/babysitter.controller');

router.get('/user/:id', babysitter_controllers.readAll);
router.get('/:id', babysitter_controllers.readOne);
router.get('/user/:id/:fullDate', babysitter_controllers.readOneByFullDate);
router.post('/', babysitter_controllers.create);
router.put('/:id', babysitter_controllers.update);
router.delete('/:id', babysitter_controllers.delete);

module.exports = router;