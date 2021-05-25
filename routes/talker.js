const express = require('express');

const readFile = require('../helpers/readFile');

const app = express();

const data = `${__dirname}/../talker.json`;

app.get('/', async (_req, res) => {
    try {
      const array = await readFile(data);      
      res.status(200).json(array); 
    } catch (error) {
      res.status(500).json({ message: 'fatal error' });
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
        res.status(500).json({ message: 'fatal error' });
    }
  });

module.exports = app;