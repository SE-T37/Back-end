const express = require('express');
const multer = require ('multer');
const upload = multer ();
const router = express.Router();

const SearchController = require('../controllers/searchViaggio');

router.get('', upload.none(), SearchController.searchViaggio);


module.exports = router;