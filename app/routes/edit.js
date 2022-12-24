const express = require('express');
const multer = require ('multer');
const upload = multer ();
const router = express.Router();

const editController = require('../controllers/edit');

router.put('', upload.none(), editController.editUser);


module.exports = router;