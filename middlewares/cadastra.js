const rescue = require('express-rescue');
const { lerJson, escreverJson } = require('./fs-utils');

const CADASTRADA = 201;

const cadastra = rescue(async (req, resp) => {
  const allTalkers = await lerJson();
  const novoTalker = req.body;
  const addTalker = {
    id: allTalkers[allTalkers.length - 1].id + 1,
    ...novoTalker,
  };
  allTalkers.push(addTalker);
  await escreverJson(allTalkers);
  return resp.status(CADASTRADA).json(addTalker);
});

module.exports = cadastra;
