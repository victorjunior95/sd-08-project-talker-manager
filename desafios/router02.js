const express = require('express');
const rescue = require('express-rescue');

const router = express.Router();

const desafio02 = require('./desafio2');

const HTTP_OK_STATUS = 200;

router.get('/:id',
  rescue(async (req, res) => {
    const { id } = req.params;
    if (id === 0 || id > 4) throw Error('Não existem palestrantes com esse id!');

    const idTalker = Number(id);
    const searchTalker = await desafio02(idTalker);

    res.status(HTTP_OK_STATUS).send(searchTalker);
  }));

router.use((_err, _req, res, _next) => {
  res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
});

module.exports = router;
