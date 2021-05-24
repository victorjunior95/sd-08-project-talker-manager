const express = require('express');
const rescue = require('express-rescue');
const controller = require('../controller/talkerController');
const { verifyAuth, form: { verifyInfo, verifyTalk } } = require('../middlewere');

const route = express.Router();

route.get('/', rescue(controller.get));
route.get('/:id', rescue(controller.getTalkerById));
route.post('/', verifyAuth, verifyInfo, verifyTalk, rescue(controller.post));

module.exports = route;
