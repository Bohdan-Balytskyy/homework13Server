const express = require('express');
const router = express.Router();
const userController = require('../components/controllers/userController');
const authenticate = require('../components/my_modules/passport').authenticateJwt;

router.get('/', authenticate, userController.getAll);
router.post('/', authenticate, userController.create);
router.get('/:id', authenticate, userController.getById);
router.delete('/:id', authenticate, userController.delete);
router.put('/:id', authenticate, userController.update);


module.exports = router;