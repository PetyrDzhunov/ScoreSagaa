const { Router } = require('express');
const usersController = require('./src/controllers/users-controller');
const router = Router();
router.use('/users', usersController);

module.exports = router;