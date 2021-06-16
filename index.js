const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const NOT_FOUND_STATUS = 404;

const PORT = '3000';
const database = './talker.json';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

// 1 - Crie o endpoint GET `/talker`, que deve retornar um array com todas as pessoas palestrantes cadastradas. Devendo retornar o `status 200`.
app.get('/talker', (req, res) => {
  fs.readFile(database, (err, data) => {
    res.status(HTTP_OK_STATUS).json(JSON.parse(data.toString('utf-8')));
  });
});

app.get('/talker/:id', (req, res) => {
  fs.readFile(database, (err, data) => {
    const { id } = req.params;
    const talkers = JSON.parse(data.toString('utf-8'));
    const talkerFind = talkers.find((talker) => talker.id === id);
    if (talkerFind) {
      return res.status(HTTP_OK_STATUS).json(talkerFind);
    }
    res.status(NOT_FOUND_STATUS).json({ message: 'Pessoa palestrante não encontrada' });
    // res.status(HTTP_OK_STATUS).json(JSON.parse(data.toString('utf-8')));
  });
});

app.listen(PORT, () => {
  console.log('Online');
});
