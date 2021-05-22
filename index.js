const express = require('express');
const bodyParser = require('body-parser');
// const talker = require('./talker.json');
const talkers = require('./routers/talkers');
const login = require('./routers/login')

const app = express();

app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.use('/talker', talkers);
app.use('/login', login);
// app.get('/login', (req, res) => {
//   return res.status(HTTP_OK_STATUS).send('LOGIN');
// });

app.listen(PORT, () => {
  console.log('Online');
});
