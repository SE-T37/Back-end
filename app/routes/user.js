const express = require('express');

const router = express.Router();

const UserController = require('../controllers/user');

router.post('/user', UserController.newUser);

module.exports = router;