const { compare, genSalt, hash } = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

module.exports.login = async (req, res) => {
	const candidate = await User.findOne({ login: req.body.login });

	if (!candidate) {
		res.status(404).json({ message: 'Пользователь не найден' });
	}

	const isCorrectPassword = await compare(req.body.password, candidate.password);
	if (!isCorrectPassword) {
		res.status(401).json({ message: 'Пароль не верный' });
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
		res.status(409).json({ message: 'Такой логин уже занят' });
	}

	const salt = await genSalt(10);

	const user = new User({
		login: req.body.login,
		password: await hash(req.body.password, salt),
	});

	await user.save();
	res.status(201).json({ message: 'Пользователь успешно создан', user });
};
