const express = require('express');
const middleware = require('../middleware');

const route = express.Router();

route.get('/', middleware.talker.getTalker);

module.exports = route;