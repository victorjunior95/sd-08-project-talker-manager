const express = require('express');
// const bodyParser = require('body-parser');
// const fs = require('fs');
const rescue = require('express-rescue');
const getTalker = require('./utils/utils');

const app = express();
app.use(express.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get(
  '/talker',
  rescue(async (_req, res) => {
    const talkers = await getTalker();
    return res.status(200).send(talkers);
    // try {
    //   const talkers = await getTalker();
    //   return res.status(200).send(talkers);
    // } catch (error) {
    //   return res.status(500).send({ error });
    // }
  }),
);

// app.get('/talker/:id', (req, res) ={

// })

app.listen(PORT, () => {
  console.log('Online');
});
