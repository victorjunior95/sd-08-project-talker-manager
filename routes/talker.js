const express = require('express');
const readFile = require('../readFile');
const writeFile = require('../writeFile');
const updateFile = require('../updateFile');
const authToken = require('../middlewares/authToken');
const validateName = require('../middlewares/validateName');
const validateAge = require('../middlewares/validateAge');
const validateTalk = require('../middlewares/validateTalk');
const validateRate = require('../middlewares/validateRate');

const SUCCESS_STATUS = 200;
const REQUEST_SUCCESS_STATUS = 201;
const UPDATE_SUCCESS_STATUS = 200;
const NOT_FOUND_STATUS = 404;

const router = express.Router();
const fileName = 'talker.json';

router.get('/:id', (req, res) => {
  readFile(fileName).then((data) => {
    const filterTalker = data.find(
      (talker) => talker.id === parseInt(req.params.id, 10),
    );
    if (filterTalker) {
      return res.status(SUCCESS_STATUS).send(filterTalker);
    }
    return res
      .status(NOT_FOUND_STATUS)
      .json({ message: 'Pessoa palestrante não encontrada' });
  });
});

router.put(
  '/:id',
  authToken,
  validateName,
  validateAge,
  validateTalk,
  validateRate,
  (req, res) => {
    const { id } = req.params;
    const infoToUpdate = req.body;
    readFile(fileName).then((data) => {
      const updatadedTalkers = data.map((talker) => {
        if (talker.id === parseInt(id, 10)) {
          infoToUpdate.id = parseInt(id, 10);
          return infoToUpdate;
        }
        return talker;
      });
      updateFile(fileName, updatadedTalkers, parseInt(id, 10)).then((response) => {
        res.status(UPDATE_SUCCESS_STATUS).json(response);
      });
    });
  },
);

router.post(
  '/',
  authToken,
  validateName,
  validateAge,
  validateTalk,
  validateRate,
  (req, res) => {
    writeFile(fileName, req.body).then((data) => {
      res.status(REQUEST_SUCCESS_STATUS).json(data);
    });
  },
);

router.get('/', (_req, res) => {
  readFile(fileName).then((data) => {
    res.status(SUCCESS_STATUS).send(data);
  });
});

module.exports = router;
