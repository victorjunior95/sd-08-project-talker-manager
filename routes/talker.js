const express = require('express');

const validationAuthMiddleware = require('../middlewares/validationAuthMiddleware');
const validationNewTalkerMiddleware = require('../middlewares/validationNewTalkerMiddleware');
const readFile = require('../helpers/readFile');
const writeFile = require('../helpers/writeFile');
const modifyFile = require('../helpers/modifyFile');

const app = express();

const data = `${__dirname}/../talker.json`;
const fatalError = 'fatal error';

app.get('/', async (_req, res) => {
    try {
      const array = await readFile(data);      
      res.status(200).json(array); 
    } catch (error) {
      res.status(500).json({ message: fatalError });
    }
  });

  app.get('/:id', async (req, res) => {
    try {
      const array = await readFile(data);
      const filterById = array.find((elememt) => elememt.id === parseInt(req.params.id, 10));

      if (!filterById) {
        res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
      } else {
        res.status(200).json(filterById);
      }
    } catch (error) {
        res.status(500).json({ message: fatalError });
    }
  });

  app.post('/',
  validationAuthMiddleware,
  validationNewTalkerMiddleware.validName,
  validationNewTalkerMiddleware.validAge,
  validationNewTalkerMiddleware.validTalk,
  validationNewTalkerMiddleware.validWatchedAt,
  validationNewTalkerMiddleware.validRate,
  async (req, res) => {
    try {
      const talker = await writeFile(data, req.body);
      res.status(201).json(talker);
    } catch (error) {
      req.status(500).json({ message: fatalError });
    }
  });

  app.put('/:id',
  validationAuthMiddleware,
  validationNewTalkerMiddleware.validName,
  validationNewTalkerMiddleware.validAge,
  validationNewTalkerMiddleware.validTalk,
  validationNewTalkerMiddleware.validWatchedAt,
  validationNewTalkerMiddleware.validRate,
  async (req, res) => {
    try {
      const talker = await modifyFile(data, req.body, req.params.id);
      res.status(200).json(talker);
    } catch (error) {
        req.status(500).json({ message: fatalError });
    }
  });

  app.delete('/:id',
  validationAuthMiddleware,
  async (req, res) => {
    try {
      await modifyFile(data, req.body, req.params.id, true);
      res.status(200).json({ message: 'Pessoa palestrante deletada com sucesso' });
    } catch (error) {
        req.status(500).json({ message: fatalError });
    }
  });

  app.get('/search',
  validationAuthMiddleware,
  async (req, res) => {
    try {
      const { q } = req.query;
      const array = await readFile(data);

      if (!q) return res.status(200).json(array);

      const filterTerm = array.filter((item) => item.name.includes(q));
      res.status(200).json(filterTerm);
    } catch (error) {
        req.status(500).json({ message: fatalError });
    }
  });

module.exports = app;