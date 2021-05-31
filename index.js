const express = require('express');

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
app.post('/talker', authToken, authname, authAge, authTalk, authdata, async (req, res) => {
  talkers = [req.body];
  
  let te = Object.entries(talkers[0]);
   te.splice(1, 0, ['id', 5]);
   te = Object.fromEntries(te);
   talkers.splice(0, 1, te);
  talkers.push(...(JSON.parse(fs.readFileSync('./talker.json'))));
  fs.writeFileSync('./talker.json', JSON.stringify(talkers));
   console.log(talkers);
   
  res.status(201).json(talkers[0]);
});

// req-5

app.listen(PORT, () => {
  console.log('Online');
});