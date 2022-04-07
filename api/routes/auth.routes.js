const passport = require('passport');
const { Router } = require('express');
const { login, createUser } = require('../controllers/auth.controller');
const router = Router();

router.post('/admin/login', login);

router.post('/admin/create', passport.authenticate('jwt', { session: false }), createUser);

module.exports = router;
