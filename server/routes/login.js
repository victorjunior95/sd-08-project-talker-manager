const router = require('express').Router();
const loginController = require('../controlers/loginController');
const validation = require('../middlewares/parametersValidation');

router.post('/', validation.ValidateEmail, validation.validPassword, loginController.post);

module.exports = router;