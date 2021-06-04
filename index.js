const express = require('express');
// const bodyParser = require('body-parser');
// const fs = require('fs');
// const rescue = require('express-rescue');
// const getTalker = require('./utils/getAll');
// const getById = require('./utils/getById');
const login = require('./Routes/login');
const talker = require('./Routes/talker');

const app = express();
app.use(express.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

// app.get(
//   '/talker',
//   rescue(async (_req, res) => {
//     const talkers = await getTalker();
//     return res.status(200).send(talkers);
//   }),
// );

// app.get('/talker/:id', async (_req, res) => {
//   const { id } = _req.params;
//   const talkerById = await getById(Number(id));
//   if (!talkerById) {
//     return res
//       .status(404)
//       .send({ message: 'Pessoa palestrante não encontrada' });
//   }
//   return res.status(200).send(talkerById);
// });

app.use('/talker', talker);
app.use('/login', login);

app.listen(PORT, () => {
  console.log('Online');
});
