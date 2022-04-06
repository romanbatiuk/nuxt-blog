const passport = require('passport');
const { Router } = require('express');
const upload = require('../middleware/upload');

const {
	createPost,
	getAllPosts,
	getPostById,
	updatePostById,
	removePostById,
	addView,
} = require('../controllers/post.controller');

const router = Router();

// /api/post/admin/
router.post(
	'/admin',
	passport.authenticate('jwt', { session: false }),
	upload.single('image'),
	createPost,
);
router.get('/admin', passport.authenticate('jwt', { session: false }), getAllPosts);
router.get('/admin/:id', passport.authenticate('jwt', { session: false }), getPostById);
router.put('/admin/:id', passport.authenticate('jwt', { session: false }), updatePostById);
router.delete('/admin/:id', passport.authenticate('jwt', { session: false }), removePostById);

// /api/post/
router.get('/', getAllPosts);
router.get('/:id', getPostById);
router.put('/:id', addView);

router.module.exports = router;
