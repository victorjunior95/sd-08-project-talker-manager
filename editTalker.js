const express = require('express');
const middleware = require('./middlewares');
const getTalkerJson = require('./fs-talkers');
const fsWrite = require('./fsWrite-talker.js');

const router = express.Router();

const editTalker = router.put('/talker/:id', [
  middleware.authorization, 
  middleware.name,
  middleware.age,
  middleware.talk,
  middleware.watchedAt,
  middleware.rate,
  async (req, res) => {
    const content = await getTalkerJson();
    const { id } = req.params;
    const { body } = req;

    const findTalker = content.find((talker) => talker.id === id);

    const updateTalker = {
      id: Number(id),
      name: body.name,
      age: body.age,
      talk: {
        watchedAt: body.talk.watchedAt,
        rate: body.talk.rate },
      };
      content.splice(findTalker, 1, updateTalker);
      await fsWrite(JSON.stringify(content));

    res.status(200).json(updateTalker);
  },
  
]);
module.exports = editTalker;
