const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const passportStrategy = require('./middleware/passport-strategy');

const app = express();

// Require API routes
const authRoutes = require('./routes/auth.routes');
const postRoutes = require('./routes/post.routes');
const commentRoutes = require('./routes/comment.routes');

const connectDB = async () => {
	try {
		await mongoose.connect(process.env.MONGO_URI, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});

		console.log('MongoDB connected!!');
	} catch (err) {
		console.log('Failed to connect to MongoDB', err);
	}
};

connectDB();

app.use(passport.initialize());
passport.use(passportStrategy);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Import API Routes
app.use('/auth', authRoutes);
app.use('/post', postRoutes);
app.use('/comment', commentRoutes);

module.exports = app;

if (require.main === module) {
	const port = process.env.PORT || 3001;
	app.listen(port, () => {
		console.log(`API server listening on port ${port}`);
	});
}
