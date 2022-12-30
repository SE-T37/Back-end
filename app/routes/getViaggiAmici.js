const express = require('express');
const multer = require ('multer');
const upload = multer ();
const router = express.Router();

const getViaggiAmiciController = require('../controllers/getViaggiAmiciS');

router.get('', upload.none(), getViaggiAmiciController.getViaggiAmici);


module.exports = router;