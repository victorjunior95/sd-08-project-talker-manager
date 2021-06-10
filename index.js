const express = require('express');
const bodyParser = require('body-parser');
const middlewares = require('./middlewares');
const talks = require('./middlewares/talks');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});
// requisito 1
app.get('/talker', middlewares.getTalker);
// requisito 2
app.get('/talker/:id', middlewares.talkerId);
// requisito 3
app.post('/login', middlewares.login);
// requisito 4
app.post('/talker', 
middlewares.token, 
middlewares.name, 
middlewares.age,
talks, 
middlewares.rate, 
middlewares.watchedAt, 
middlewares.newTalker);
// requisito 5
app.put('/talker/:id', 
middlewares.token, 
middlewares.name, 
middlewares.age,
talks, 
middlewares.rate, 
middlewares.watchedAt,
middlewares.editTalker); 
// async (req, res) => {
//   const id = Number(req.params.id);
//   const file = await readTalker();
//   const editTalker = { ...req.body, id };
//   const verifyTalker = file.map((data) => {
//     if (data.id === id) return editTalker;
//     return data;
//   });
//   await writeTalker(verifyTalker);
//   res.status(200).json(editTalker);
// });

app.listen(PORT, () => {
  console.log('Online');
});
