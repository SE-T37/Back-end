const express = require('express');
const router = express.Router();
const User = require ('../models/user');

const jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
const multiparty = require('multiparty');

const authenticate = async function(req, res, next) {
    //firs check existance in db
    //console.log (req.body.username);
	let user = await User.findOne({
		username: req.body.username 
	}).exec();

	// user not found
	if (!user) {
		//console.log("User not found");
		res.json({ success: false, message: 'Authentication failed. User not found.' });
	}
	else{
		// check if password matches
		if (user.password != req.body.password) {
			res.json({ success: false, message: 'Authentication failed. Wrong password.' });
		}
		else{
			user.autenticato=true;
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
				self: "authentications/api/" + user.username
			});
		}
	}
};

module.exports = { authenticate };