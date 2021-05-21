const express = require('express');
const readFile = require('../readFile');

const SUCCESS_STATUS = 200;
const NOT_FOUND_STATUS = 404;

const router = express.Router();
const fileName = 'talker.json';

router.get('/:id', (req, res) => {
  readFile(fileName).then((data) => {
    const filterTalker = data.find(
      (talker) => talker.id === parseInt(req.params.id, 10),
    );
    if (filterTalker) {
      res.status(SUCCESS_STATUS).send(filterTalker);
    }
    res
      .status(NOT_FOUND_STATUS)
      .json({ message: 'Pessoa palestrante não encontrada' });
  });
});

router.get('/', (_req, res) => {
  readFile(fileName).then((data) => {
    res.status(SUCCESS_STATUS).send(data);
  });
});

module.exports = router;
