const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

const rescue = require('express-rescue');
const talkersFile = require('./middlewares/fs-readFile');

app.get('/talker', 
rescue(async (_req, res, _next) => {
  const talkers = await talkersFile.getTalker();
  res.status(200).json(talkers);
}));

app.listen(PORT, () => {
  console.log('Online');
});
