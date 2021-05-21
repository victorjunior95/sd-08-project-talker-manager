const express = require('express');
const rescue = require('express-rescue');
const controller = require('../controller/talkerController');
const middlewere = require('../middlewere');

const route = express.Router();

route.get('/', rescue(controller.get));
route.get('/:id', rescue(controller.getTalkerById));
route.post('/', middlewere.signIn, rescue(controller.getTalkerById));

module.exports = route;
