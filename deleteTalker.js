const express = require('express');
const middleware = require('./middlewares');
const getTalkerJson = require('./fs-talkers');
const fsWrite = require('./fsWrite-talker.js');

const router = express.Router();

const deleteTalker = router.delete('/talker/:id', middleware.authorization, 
  async (req, res) => {
    const content = await getTalkerJson();
    const { id } = req.params;
    const msg = { message: 'Pessoa palestrante deletada com sucesso' };
    const findTalker = content.filter((talker) => talker.id !== Number(id));
    await fsWrite(JSON.stringify(findTalker));
    res.status(200).json(msg);
  });
module.exports = deleteTalker;
