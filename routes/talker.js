const express = require('express');

const middlewares = require('../middlewares');
const verification = require('../middlewares');

const routeTalker = express.Router();

const HTTP_OK_STATUS = 200;
const HTTP_CREATED_STATUS = 201;
const HTTP_NOT_FOUND_STATUS = 404;

routeTalker.get('/', (_req, res) => {
  try {
    const talker = middlewares.readTalker();
    return res.status(HTTP_OK_STATUS).json(talker);
  } catch (err) {
    return res.status(500).send({ err });
  }
});

routeTalker.get('/:id', (req, res) => {
  try {
    const { id } = req.params;
    const talkerById = middlewares.readTalker()
      .find((element) => Number(element.id) === Number(id));
    if (talkerById) {
      return res.status(HTTP_OK_STATUS).json(talkerById);
    }
    return res.status(HTTP_NOT_FOUND_STATUS).json({
      message: 'Pessoa palestrante não encontrada',
    });
  } catch (err) {
    return res.status(500).send({ err });
  }
});

routeTalker.post(
  '/',
  verification.tokenVerification,
  verification.nameVerification,
  verification.ageVerification,
  verification.rateAndWatchedAtVerification,
  verification.talkVerification,
  (req, res) => {
    try {
      const newTalker = req.body;
      const talkerArray = middlewares.readTalker();
      newTalker.id = talkerArray.length + 1;
      talkerArray.push(newTalker);
      middlewares.writeTalker(talkerArray);
      const add = req.body;
      res.status(HTTP_CREATED_STATUS).json(add);
    } catch (err) {
      return res.status(500).send({ err });
    }
  },
);

module.exports = routeTalker;
