const User = require ('../models/user');
const jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens


const authenticate = async function(req, res, next) {
	let user = await User.findOne({
		username: req.body.username 
	}).exec();

	if (!user) {
		res.status(404).json({ success: false, message: 'Authentication failed. User not found.' });
	}
	else{
		// check if password matches
		if (user.password != req.body.password) {
			res.status(400).json({ success: false, message: 'Authentication failed. Wrong password.' });
		}
		else{
			user.autenticato=true; 
			// if user is found and password is right create a token
			var payload = {
				username: user.username,
				id: user._id
			}
			var options = {
				expiresIn: 86400 // expires in 24 hours
			}
			var token = jwt.sign(payload, process.env.SUPER_SECRET, options);
			
			res.status(200).json({
				success: true,
				message: 'Enjoy your token!',
				token: token,
				username: user.username,
				id: user._id,
				//self: "authentications/api/" + user._id
			});
		}
	}
};

module.exports = { authenticate };