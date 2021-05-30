const express = require('express');
const middleware = require('./middlewares');
const getTalkerJson = require('./fs-talkers');
const fsWrite = require('./fsWrite-talker.js');

const router = express.Router();

const newTalker = router.post('/talker', [
  middleware.authorization, 
  middleware.name,
  middleware.age,
  middleware.talk,
  middleware.watchedAt,
  middleware.rate,
  async (req, res) => {
    const content = await getTalkerJson();
    const newUser = req.body;
    console.log(newUser);

    newUser.id = content.length + 1;
    content.push(newUser);
    await fsWrite(JSON.stringify(content));
    res.status(201).json(newUser);
  },
]);
module.exports = newTalker;
