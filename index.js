const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

const fs = require('fs');

// const rawdata = fs.readFileSync('talker.json', 'utf-8');
// const list = JSON.parse(rawdata);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker', (req, res, _next) => {
  // fs.readFile('talker.json', (err, data) => {
  //   const list = JSON.parse(data);
  //   res.status(200).send(list);
  // });
  const list = JSON.parse(fs.readFileSync('talker.json'));
  res.status(200).send(list);
});

app.listen(PORT, () => {
  console.log('Online');
});
