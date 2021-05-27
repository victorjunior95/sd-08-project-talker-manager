const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs').promises;

// const login = require('./utils');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

// Requisito 02 -----------------------------------------------------
app.get('/talker/:id', async (req, res) => {
  const { id } = req.params; 
  const data = await fs.readFile('./talker.json', 'utf8');
  const talkers = JSON.parse(data);
  const findTalker = talkers.find((talker) => talker.id === parseInt(id, 10));
      if (!findTalker) {
       return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
    } 
     return res.status(200).json(findTalker);
 });

// Requisito 01 -----------------------------------------------------
app.get('/talker', async (_req, res) => {
  const data = await fs.readFile('./talker.json', 'utf8');
  res.status(200).json(JSON.parse(data));
});

// Requisito 03 -----------------------------------------------------
// app.post('/login', async (_req, res) => {
//   const data = await fs.readFile('./talker.json', 'utf8');
//   if (data) return res.status(200).json(JSON.parse(data));
//    res.status(200).json(JSON.parse(data));
// });

app.listen(PORT, () => {
  console.log('Online');
});
