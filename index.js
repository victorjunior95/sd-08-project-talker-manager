const express = require('express');

// const rescue = require('express-rescue');

const fs = require('fs');

const bodyParser = require('body-parser');

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

 // importando funcionalidades de validação
const {
  authemail,
  authpaswd,
  req1,
  req2,
  req5,
  req6,
  authToken,
  authname,
  authAge,
  authTalk,
  authdata,
  
  } = require('./validation');
// const talkers = require('./helpers/talkers');

// req-1
app.get('/talker', req1);

// req-2
app.get('/talker/:id', req2);

// req-3
app.post('/login', authpaswd, authemail, (req, res) => {
 res.status(200).send({ token: (Math.random()).toString(2).substring(2, 18) }); 
});

// req-4
 app.post('/talker', authToken, authname, authAge, authTalk, authdata, (req, res) => {
 const novoTalker = [req.body];
  
  let te = Object.entries(novoTalker[0]);
   te.splice(1, 0, ['id', 5]);
   te = Object.fromEntries(te);
   novoTalker.splice(0, 1, te);
   novoTalker.push(...(JSON.parse(fs.readFileSync('./talker.json'))));
  fs.writeFileSync('./talker.json', JSON.stringify(novoTalker));
  // console.log(novoTalker);
  res.status(201).send(novoTalker[0]);
}); 

// req-5
 app.put('/talker/:id', authToken, authname, authAge, authTalk, authdata,
  req5);

// req-6
app.delete('/talker/:id', authToken, req6, (req, res) => {
   res.status(200).send({ message: 'Pessoa palestrante deletada com sucesso',
  }); 
});  

app.listen(PORT, () => {
  console.log('Online');
});