const express = require('express');
const multer = require ('multer');
const upload = multer ();
const router = express.Router();

const getUsersController = require('../controllers/getUsers');

router.get('', upload.none(), getUsersController.getUsers);


module.exports = router;