const { compare, genSalt, hash } = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

module.exports.login = async (req, res) => {
	const candidate = await User.findOne({ login: req.body.login });

	if (!candidate) {
		res.status(404).json({ message: 'User not found' });
	}

	const isCorrectPassword = await compare(req.body.password, candidate.password);
	if (!isCorrectPassword) {
		res.status(401).json({ message: 'The password is incorrect' });
	}

	const token = jwt.sign(
		{
			login: candidate.login,
			userId: candidate._id,
		},
		process.env.JWT_SECRET,
		{ expiresIn: '1h' },
	);

	res.status(200).json({ token });
};

module.exports.createUser = async (req, res) => {
	const candidate = await User.findOne({ login: req.body.login });

	if (candidate) {
		res.status(409).json({ message: 'Such a login is already taken' });
	}

	const salt = await genSalt(10);

	const user = new User({
		login: req.body.login,
		password: await hash(req.body.password, salt),
	});

	await user.save();
	res.status(201).json({ message: 'User successfully created', user });
};
