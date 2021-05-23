const express = require('express');

const getAllTalkers = require('./getAllTalkers.js');
const getTalkerById = require('./getTalkerById.js');

const app = express();
app.use(express.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker', getAllTalkers);

app.get('/talker/:id', getTalkerById);

app.listen(PORT, () => {
  console.log(`App listening at http://localhost:${PORT}`);
});
