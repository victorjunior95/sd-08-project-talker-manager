const express = require('express');
const bodyParser = require('body-parser');
const rescue = require('express-rescue');

const middlewares = require('./middlewares');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';
// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker', rescue(async (req, res) => {
  const file = await middlewares.talker();
  if (file) return res.status(200).json(file);  
  return res.status(200).json([]);
}));

app.get('/talker/:id', rescue(async (req, res) => {
  const file = await middlewares.talker();
  const result = file.find(({ id }) => id === Number(req.params.id));
  if (result) return res.status(200).json(result);
  return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
}));

app.listen(PORT, () => {
  console.log('Online');
});
