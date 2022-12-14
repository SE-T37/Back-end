const express = require('express');
const router = express.Router();
const user = require('../models/user'); // get our mongoose model
const jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
const multiparty = require('multiparty');

// ---------------------------------------------------------
// route to authenticate and get a new token
// --------------------------------------------------------
router.post('', async function (req, res) {	// find the user
	/*
	let form = new multiparty.Form();
	form.parse(req, function(err, fields, files) {
		Object.keys(fields).forEach(function(name) {
			console.log('got field named ' + name);
		});
	});
	*/
	//console.log(req.body.username);
	let User = await user.findOne({
		username: req.body.username 
	}).exec();

	// user not found
	if (!User) {
		console.log("UTENTE NON TROVATO");
		res.json({ success: false, message: 'Authentication failed. User not found.' });
	}
	else{
		// check if password matches
		if (User.password != req.body.password) {
			res.json({ success: false, message: 'Authentication failed. Wrong password.' });
		}

		// if user is found and password is right create a token
		var payload = {
			username: user.username,
			id: user._id
			// other data encrypted in the token	
		}
		var options = {
			expiresIn: 86400 // expires in 24 hours
		}
		var token = jwt.sign(payload, process.env.SUPER_SECRET, options);

		res.json({
			success: true,
			message: 'Enjoy your token!',
			token: token,
			username: user.username,
			id: user._id,
			self: "authentications/" + user._id
		});
	}
});



module.exports = router;