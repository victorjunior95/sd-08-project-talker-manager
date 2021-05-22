const express = require('express');
const rescue = require('express-rescue');
const controller = require('../controller/talkerController');

const route = express.Router();

route.get('/', rescue(controller.get));
route.get('/:id', rescue(controller.getTalkerById));

module.exports = route;
