const rescue = require('express-rescue');
const { lerJson, escreverJson } = require('./fs-utils');

const REMOVIDO = 200;

const cadastra = rescue(async (req, resp) => {
  const { id } = req.params;
  const novoId = parseInt(id, 10);
  const allTalkers = await lerJson();
  const remover = allTalkers.filter((talke) => talke.id !== novoId);
  await escreverJson(remover);
  return resp.status(REMOVIDO).send({ message: 'Pessoa palestrante deletada com sucesso' });
});

module.exports = cadastra;
