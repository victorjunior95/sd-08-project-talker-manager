const router = require('express').Router();
const get = require('../controlers/raizController');

router.get('/', get);

module.exports = router;