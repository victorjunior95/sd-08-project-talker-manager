const express = require('express');
const rescue = require('express-rescue');
const controller = require('../controller/talkerController');
const { verifyAuth, form: { verifyForm } } = require('../Middlewares');

const route = express.Router();

route.get('/search', verifyAuth, rescue(controller.getTalkByName));
route.get('/:id', rescue(controller.getTalkerById));
route.get('/', rescue(controller.get));
route.post('/', verifyAuth, verifyForm, rescue(controller.post));
route.put('/:id', verifyAuth, verifyForm, rescue(controller.put));
route.delete('/:id', verifyAuth, rescue(controller.delete));

module.exports = route;
