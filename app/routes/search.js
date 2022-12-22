const express = require('express');
const multer = require ('multer');
const upload = multer ();
const router = express.Router();

const SearchController = require('../controllers/search');

router.post('', upload.none(), SearchController.searchUsers);


module.exports = router;