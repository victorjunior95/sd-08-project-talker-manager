const express = require('express');
const rescue = require('express-rescue');
const controller = require('../controller/talkerController');
const { verifyAuth, form: { verifyInfo, verifyTalk } } = require('../middlewere');

const route = express.Router();

route.get('/', rescue(controller.get));
route.get('/:id', rescue(controller.getTalkerById));
route.post('/', verifyAuth, verifyInfo, verifyTalk, rescue(controller.post));
route.put('/:id', verifyAuth, verifyInfo, verifyTalk, rescue(controller.put));
route.delete('/:id', verifyAuth, rescue(controller.delete));

module.exports = route;
