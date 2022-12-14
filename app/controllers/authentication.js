const express = require('express');
const router = express.Router();
const user = require ('../models/user');

const jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
const multiparty = require('multiparty');

const authenticate = async function(req, res, next) {
    //firs check existance in db
    //console.log (req.body.username);
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
};

module.exports = { authenticate };