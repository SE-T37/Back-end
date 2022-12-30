const express = require('express');
const multer = require ('multer');
const upload = multer ();
const router = express.Router();

const getViaggiController = require('../controllers/getViaggi');

router.get('', upload.none(), getViaggiController.getViaggi);


module.exports = router;