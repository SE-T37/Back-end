const express = require('express');
const multer = require ('multer');
const upload = multer ();
const router = express.Router();

const AuthenticationController = require('../controllers/authentication.js');

router.post('/api', upload.none(), AuthenticationController.authenticate);

module.exports = router;