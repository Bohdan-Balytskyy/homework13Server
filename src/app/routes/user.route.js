const express = require('express');
const router = express.Router();
const passport = require('passport')
const userController = require('../components/controllers/userController');

router.get('/', passport.authenticate('jwt', {session: false}), userController.getAll);
router.post('/', passport.authenticate('jwt', { session: false }), userController.create);
router.get('/:id', passport.authenticate('jwt', { session: false }), userController.getById);
router.put('/:id', passport.authenticate('jwt', { session: false }), userController.update);
router.delete('/:id', passport.authenticate('jwt', {session: false}),userController.delete);

module.exports = router;