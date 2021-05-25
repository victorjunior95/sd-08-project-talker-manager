const express = require('express');
const bodyParser = require('body-parser');

const { HTTP_OK_STATUS, PORT } = require('./src/common/defs')

const app = express();
app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send({});
});

app.listen(PORT, () => {
  console.log('Online');
});
