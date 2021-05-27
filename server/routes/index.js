const router = require('express').Router();
const talker = require('./talker');
const raiz = require('./raiz');
const login = require('./login');

router.use('/', raiz);
router.use('/talker', talker);
router.use('/login', login);

module.exports = router;
