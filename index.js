const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs').promises;
const crypto = require('crypto');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
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

function messages(res, email, password) {
  const validEmail = /.+@[A-z]+[.]com/.test(email);
  if (!email) {
    return res.status(400).json({ message: 'O campo "email" é obrigatório' });
  }
  if (!validEmail) {
    return res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
  }
  if (!password) {
    return res.status(400).json({ message: 'O campo "password" é obrigatório' });
  }
  if (password.length < 6) { 
    return res.status(400).json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
  }
  return true;
}
// Requisito 03 -----------------------------------------------------
app.post('/login', (req, res) => {
  const { body } = req;  
  const token = crypto.randomBytes(8).toString('hex');   
  if (messages(res, body.email, body.password)) return res.status(200).json({ token });
});
