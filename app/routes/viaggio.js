const express = require('express');
const multer = require ('multer');
const upload = multer ();
const router = express.Router();

const ViaggioController = require('../controllers/viaggio');

//Creazione nuovo viaggio
router.post('', upload.none(), ViaggioController.newViaggio);

module.exports = router;