// Leonardo Sardinha
const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

function readFilePromise (fileName) {
  return new Promise((resolve, reject) => {

    fs.readFile(fileName, (err, content) => {
      if (err) return reject(err);
      resolve(content);
    });

  });
}

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/teste', (_request, response) => {
  response.status(HTTP_OK_STATUS).send('Teste do aplicativo');
});

app.get('/talker', async (_request, response) => {
  const retorno = await readFilePromise('./talker.json')
  response.status(HTTP_OK_STATUS).send(retorno);
});

app.listen(PORT, () => {
  console.log('Online');
});
