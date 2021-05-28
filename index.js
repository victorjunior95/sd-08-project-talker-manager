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

function validateEmail(email) {
  const validEmail = /.+@[A-z]+[.]com/;
  if (!email) return false;
  return validEmail.test(email);
}
function validatePassword(password) { 
  if (!password) return false;
  if (password.length > 6) return true;
}
function messages(res, email, password) {
  if (email === [{ email: '' }]) { 
    return res.status(400).json({ message: 'O campo "email" é obrigatório' });
  }
  if (!email) {
    return res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
  }
  if (password === [{ password: '' }]) { 
    return res.status(400).json({ message: 'O campo "password" é obrigatório' });
  }
  if (!password) { 
    return res.status(400).json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
  }
}
// Requisito 03 -----------------------------------------------------
app.post('/login', (req, res) => {
  const { body } = req;
  const password = validatePassword(body.password);
  const email = validateEmail(body.email);
  const token = crypto.randomBytes(8).toString('hex'); 
  messages(res, body.email, body.password);
  if (password && email) return res.status(200).json({ token });
});
