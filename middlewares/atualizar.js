const rescue = require('express-rescue');
const { lerJson, escreverJson } = require('./fs-utils');

const ATUALIZADA = 200;

const cadastra = rescue(async (req, resp) => {
  const { id } = req.params;
  const novoId = parseInt(id, 10);
  const allTalkers = await lerJson();
  const novoTalker = req.body;
  const addTalker = { id: novoId, ...novoTalker };
  const atualizados = allTalkers.map((talke) => {
    if (talke.id === novoId) return addTalker;
    return talke;
  });
  await escreverJson(atualizados);
  return resp.status(ATUALIZADA).json(addTalker);
});

module.exports = cadastra;
