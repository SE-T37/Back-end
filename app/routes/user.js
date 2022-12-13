const express = require('express');
const multer = require ('multer');
const upload = multer ();
const router = express.Router();

const UserController = require('../controllers/user');

router.post('/signup', upload.none(), UserController.newUser);

module.exports = router;