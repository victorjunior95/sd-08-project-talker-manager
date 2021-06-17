const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs').promises;
const { 
  validateToken, 
  validateLogin, 
  validateName, 
  validateAge, 
  validateTalk, 
  validateFormats } = require('./middleware');

const talkerJSON = './talker.json';

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker', async (req, res) => {
  const talkersList = JSON.parse(await fs.readFile(talkerJSON, 'utf-8'));
  return res.status(200).json(talkersList);
});

app.get('/talker/search', validateToken, async (req, res) => {
  const { q } = req.query;  
  const talkersList = JSON.parse(await fs.readFile(talkerJSON, 'utf-8'));
  const search = talkersList.filter((talker) => talker.name.includes(q));  
  if (search) {
    return res.status(200).json(search);
  }
  return res.status(200).json(talkersList);
});

app.get('/talker/:id', async (req, res) => {
  const { id } = req.params;
  const talkersList = JSON.parse(await fs.readFile(talkerJSON, 'utf-8'));
  const search = talkersList.find((talker) => talker.id === id);
  if (!search) {
    return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  }
  return res.status(200).json(search);
});

app.post('/login', validateLogin, (req, res) => {
  // https://stackoverflow.com/questions/8532406/create-a-random-token-in-javascript-based-on-user-details
  function generateToken() {
    const a = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890'.split('');
    const b = [];  
    for (let i = 0; i < 16; i += 1) {
        const j = (Math.random() * (a.length - 1)).toFixed(0);
        b[i] = a[j];
    }
    return b.join('');
  }
  const token = generateToken();

  return res.status(200).json({ token });
});

app.post('/talker', validateToken, validateName, validateAge, validateTalk, validateFormats, 
async (req, res) => {
  const talkersList = JSON.parse(await fs.readFile(talkerJSON, 'utf-8'));
  const talkerAdd = req.body;
  talkerAdd.id = talkersList.length + 1;
  talkersList.push(talkerAdd);
  await fs.writeFile(talkerJSON, JSON.stringify(talkersList));
  return res.status(201).json(talkerAdd);
});

app.put('/talker/:id', validateToken, validateName, validateAge, validateTalk,
  validateFormats, async (req, res) => {
  const { id } = req.params;
  const { name, age, talk } = req.body;
  const talkersList = JSON.parse(await fs.readFile(talkerJSON, 'utf-8'));
  const talkerByID = talkersList.find((talker) => talker.id === id);
  talkersList[talkerByID] = { name, age, id: parseInt(id, 10), talk };
  await fs.writeFile(talkerJSON, JSON.stringify(talkersList));
  return res.status(200).json(talkersList);
});

app.delete('/talker/:id', validateToken, async (req, res) => {
  const { id } = req.params;
  const talkersList = JSON.parse(await fs.readFile(talkerJSON, 'utf-8'));
  const talkerByID = talkersList.find((talker) => talker.id === id);
  talkersList.splice(talkerByID, 1);
  await fs.writeFile(talkerJSON, JSON.stringify(talkersList));
  return res.status(200).json({ message: 'Pessoa palestrante deletada com sucesso' });
});

app.listen(PORT, () => {
  console.log('Online');
});
