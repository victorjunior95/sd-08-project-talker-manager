const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs/promises');

const app = express();
const token = require('./generateToken');

app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker', async (req, res) => {
  const talkers = await fs.readFile('talker.json', 'utf8');
  const jason = await JSON.parse(talkers);
  res.status(200).json(jason);
});

app.get('/talker/:id', async (req, res) => {
  const { id } = req.params;
  const talkers = await fs.readFile('talker.json', 'utf8');
  const jason = await JSON.parse(talkers);
  const finder = jason.find((item) => item.id === +id);

  if (!jason.some((item) => item.id === +id)) {
    return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  }

  return res.status(200).json(finder);
});

app.post('/login', (req, res) => {
  const { email, password } = req.body;
  
  const validadeRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (!email) {
    return res.status(400).json({ message: 'O campo "email" é obrigatório' });
  }

  if (!validadeRegex.test(email)) {
    return res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
  } 

  if (!password) {
    return res.status(400).json({ message: 'O campo "password" é obrigatório' });
  }

  if (password.length < 6) {
    return res.status(400).json({ message: 'O "password" deve ter pelo menos 6 caracteres',
  });
  }
    return res.status(200).json({ token: token() });
});

// app.post('/talker', (req, res) => {
//       const token  = req.headers.Authorization;
//       const validHeaderRegex = new RegExp('0-9a-z', 'i');
//       const validatDate = /^(0[1-9]|1\d|2\d|3[01])\/(0[1-9]|1[0-2])\/(19|20)\d{2}$/
//       const validateRate = /^[1-5]$/

//       const {name, age, talk:{watchedAt, rate}, } = req.body

// if(!token){
//   return res.status(401).json({"message": "Token inválido"})
// }

// if(!validHeaderRegex.test(token)){
//   return res.status({"message": "Token inválido"})
// }

// if(!name) {
//   return res.status(400).json({  "message": "O campo \"name\" é obrigatório"}) 
// }

// if(name.length < 3){
//   return res.status(400).json({  "message": "O \"name\" deve ter pelo menos 3 caracteres"
// })
// }
// if(!age) {
//   return res.status(400).json({  "message": "O campo \"age\" é obrigatório"}) 
// }

// if(age.length < 18){
//   return res.status(400).json({    "message": "A pessoa palestrante deve ser maior de idade"})}

// if(!validatDate.test(talk[watchedAt]) ){
//     return res.status(400).json({  "message": "O campo \"watchedAt\" deve ter o formato \"dd/mm/aaaa\""  })}

// if(!validateRate.test(talk[rate])){
//   return res.status(400).json({ "message": "O campo \"rate\" deve ser um inteiro de 1 à 5"})
// }

//   })

app.listen(PORT, () => {
  console.log('Online');
});
