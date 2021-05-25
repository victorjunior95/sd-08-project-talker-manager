const express = require('express');

const fs = require('fs');

const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

const content = JSON.parse(fs.readFileSync('./talker.json'));
const ids = [];
function preencheids() {
 content.forEach((element) => {
 ids.push(element.id);
}); 
}
preencheids();

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker', (req, res) => res.status(200).send(content));

app.get('/talker/:id', (req, res) => {
  if (!ids.includes(+req.params.id)) {
      return (res.status(404).send({ message: 'Pessoa palestrante não encontrada' })); 
    } 
    return (res.status(200).send(content.find((obj) => obj.id === +req.params.id)));
 });

app.listen(PORT, () => {
  console.log('Online');
});
