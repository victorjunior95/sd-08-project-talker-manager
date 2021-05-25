const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const data = fs.readFileSync('./talker.json', 'utf8');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

// Requisito 01 -----------------------------------------------------
app.get('/talker', (_req, res) => {
  if (data) return res.status(200).json(JSON.parse(data));
  res.status(200).send([]);
//    try {
//      res.status(200).send(data);  
//    } catch (err) {
//     throw new Err(err);
// }
});

// Requisito 02 -----------------------------------------------------
app.get('/talker/:id', (req, res) => {
  try {
      const id = parseInt(req.params.id, 10);
      const findTalker = data.find((talker) => talker.id === id);
        if (findTalker) {
      res.status(200).send(findTalker);
    } else {
      res.status(404).send({ message: 'Pessoa palestrante não encontrada' });
    }
  } catch (err) {
    return res.status(500).send({ err });
  }
});

// Requisito 03 -----------------------------------------------------

app.listen(PORT, () => {
  console.log('Online');
});
