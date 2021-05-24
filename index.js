const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const emailVal = require('./authEmail');
const tokenGenerate = require('./generateToken');
const addNewTalker = require('./addNewTalker');
const autorization = require('./autorizationMid');
const nameVali = require('./nameValidation');
const ageVali = require('./ageValidation');
const { dataValidate, fieldsValidate } = require('./validationTalk');
const modTalker = require('./modTalker');
const deleteTalker = require('./deleteTalker');

const app = express();

app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
response.status(HTTP_OK_STATUS).send();
});

app.get('/talker', (_req, res) => {
  fs.readFile('./talker.json', (_err, data) => {
    res.status(HTTP_OK_STATUS).send(JSON.parse(data));
  });
});

app.get('/talker/:id', (req, res) => {
const { id } = req.params;
const conteudo = JSON.parse(fs.readFileSync('./talker.json'));
const filter = conteudo.find((idPeople) => idPeople.id === Number(id));
if (!filter) {
res.status(404).send({ message: 'Pessoa palestrante não encontrada' });
}
res.status(HTTP_OK_STATUS).send(filter);
});

 app.post('/login', (req, res) => {
const { email, password } = req.body;

if (!email) return res.status(400).send({ message: 'O campo "email" é obrigatório' });

  if (!emailVal(email)) {
    return res.status(400).send({ message: 'O "email" deve ter o formato "email@email.com"' });
}

if (!password) return res.status(400).send({ message: 'O campo "password" é obrigatório' });

  if (password.toString().length < 6) {
    return res.status(400).send({ message: 'O "password" deve ter pelo menos 6 caracteres' });
  }
 const token = tokenGenerate();

  res.status(HTTP_OK_STATUS).send({ token });
});

app.post('/talker', autorization, nameVali, ageVali, dataValidate, fieldsValidate, addNewTalker); 

app.put('/talker:id', autorization, nameVali, ageVali, dataValidate, fieldsValidate, modTalker); 

app.delete('/talker:id', autorization, deleteTalker);

/* app.put('/talker/:id', (req, res) => {
const { id } = req.params;
const jsonData = fs.readFileSync('./talker.json');
const data = JSON.parse(jsonData);
const editedTalker = req.body;
const filter = data.find((element) => element.id === Number(id));
const index = data.indexOf(filter);
const arrNovo = {
name: req.body.name,
age: req.body.age,
id: index + 1,
talk: req.body.talk,
};
data.splice(index, 1, arrNovo);
fs.writeFileSync('./talker.json', (JSON.stringify(data)));
res.send(data);  
}); */

app.listen(PORT, () => {
console.log('Online');
});
