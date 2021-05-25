const express = require('express');
// const bodyParser = require('body-parser');
const { TalkerRoute, loginRoute } = require('./routes');

const app = express();
// app.use(bodyParser.json());
app.use(express.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

// meu código aqui, assim como foi visto da aula da turma 07

app.use('/talker', TalkerRoute);
app.use('/login', loginRoute);

app.listen(PORT, () => {
  console.log('Online');
});
