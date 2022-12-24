const express = require('express');
const multer = require ('multer');
const upload = multer ();
const router = express.Router();

const SeguiController = require('../controllers/segui');

router.put('', upload.none(), SeguiController.seguiUser);


module.exports = router;