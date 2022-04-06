const Post = require('../models/post.model');

module.exports.createPost = async (req, res) => {
	const post = new Post({
		title: req.body.title,
		text: req.body.text,
		imageUrl: `/${req.file.filename}`,
	});

	try {
		await post.save();
		res.status(201).json({ message: 'Пост успешно создан', post });
	} catch (err) {
		res.status(500).json(err);
	}
};
module.exports.getAllPosts = async (req, res) => {
	try {
		const posts = await Post.find().sort({ date: -1 });
		res.json(posts);
	} catch (err) {
		res.status(500).json(err);
	}
};
module.exports.getPostById = async (req, res) => {
	try {
		await Post.findById(req.params.id)
			.populate('comments')
			.exec((error, post) => {
				console.log(error);
				res.json(post);
			});
	} catch (err) {
		res.status(500).json(err);
	}
};
module.exports.updatePostById = async (req, res) => {
	const $set = {
		text: req.body.text,
	};
	try {
		const post = await Post.findOneAndUpdate({ _id: req.params.id }, { $set }, { new: true });
		res.json(post);
	} catch (err) {
		res.status(500).json(err);
	}
};
module.exports.removePostById = async (req, res) => {
	try {
		await Post.deleteOne({ _id: req.params.id });
		res.status(200).json({ message: 'Пост успешно удален' });
	} catch (err) {
		res.status(500).json(err);
	}
};
module.exports.addView = async (req, res) => {
	const $set = {
		views: ++req.body.views,
	};
	try {
		await Post.findOneAndUpdate({ _id: req.params.id }, { $set });
		res.status(204).json();
	} catch (err) {
		res.status(500).json(err);
	}
};
