const rescue = require('express-rescue');
const { readFileTalker, writeFileTalker } = require('../../data');
const schema = require('../../validation');

const editTalker = rescue(async (req, res, next) => {
  const dataNewTalker = req.body;
  const { error } = schema.talker.validate(dataNewTalker); // Trata possível erro
  if (error) return next(error);

  const { id } = req.params;
  const newTalker = { id: +id, ...dataNewTalker };

  const content = await readFileTalker(); // Trata possível erro

  const newContent = content.map((talker) => {
    if (talker.id === +id) return newTalker;
    return talker;
  });

  await writeFileTalker(newContent);

  res.status(200).send(newTalker);
});

module.exports = editTalker;
