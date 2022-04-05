const { Strategy, ExtractJwt } = require('passport-jwt');
const User = require('../models/user.model');

const options = {
	jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
	secretOrKey: process.env.JWT_SECRET,
};

module.exports = new Strategy(options, async (payload, done) => {
	try {
		const user = await User.findById(payload.userId).select('id');

		if (!user) {
			done(null, false);
		}
		done(null, user);
	} catch (e) {
		console.error(e);
	}
});
