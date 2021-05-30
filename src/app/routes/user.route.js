const express = require('express');
const router = express.Router();
const userController = require('../components/controllers/userController');
const authenticate = require('../components/my_modules/passport').authenticateJwt;

router.use(authenticate); 
router.get('/', userController.getAll);
router.post('/', userController.create);
router.get('/:id', userController.getById);
router.put('/:id', userController.delete);

module.exports = router;