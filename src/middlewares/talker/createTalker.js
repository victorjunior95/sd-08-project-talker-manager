const rescue = require('express-rescue');
const { readFileTalker, writeFileTalker } = require('../../data');
const schema = require('../../validation');

const createTalker = rescue(async (req, res, next) => {
  const dataNewTalker = req.body;
  const { error } = schema.talker.validate(dataNewTalker);
  if (error) return next(error);

  const content = await readFileTalker(); // Trata possível erro

  let id;
  if (content.length === 0) {
    id = 1;
  } else {
    id = Math.max(...content.map((talker) => talker.id)) + 1;
  }

  const newTalker = { id, ...dataNewTalker };
  const newContent = [...content, newTalker];

  await writeFileTalker(newContent);
  res.status(201).json(newTalker);
});

module.exports = createTalker;
