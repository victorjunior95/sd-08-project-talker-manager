const express = require('express');

const fs = require('fs');

const bodyParser = require('body-parser');

const app = express();

// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});
// conteudo de talker .json
const talkers = JSON.parse(fs.readFileSync('./talker.json'));

 // console.log(typeof req.body); 
// importando funcionalidades de validação
const {
  authemail,
  authpaswd,
  req1,
  req2,
  authToken,
  authname,
  authAge,
  authTalk,
  authdata,
} = require('./validation');

// req-1
app.get('/talker', req1);

// req-2
app.get('/talker/:id', req2);

// req-3
app.post('/login', authpaswd, authemail, (req, res) => {
  res.status(200).send({ token: (Math.random()).toString(2).substring(2, 18) }); 
});

// req-4
app.post('/talker', authToken, authname, authAge, authTalk,authdata, (req, res) => {
  talkers.push(req.body);
  res.status(201).send(talkers[talkers.length - 1]);
});

// req-5

app.listen(PORT, () => {
  console.log('Online');
});
