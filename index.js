const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();

app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
response.status(HTTP_OK_STATUS).send();
});

app.get('/talker', (_req, res) => {
  fs.readFile('./talker.json', (_err, data) => {
    res.status(HTTP_OK_STATUS).send(JSON.parse(data));
  });
});
app.get('/talker/:id', (req, res) => {
const { id } = req.params;
const conteudo = JSON.parse(fs.readFileSync('./talker.json'));
const filter = conteudo.find((idPeople) => idPeople.id === Number(id));
if (!filter) {
res.status(404).send({ message: 'Pessoa palestrante não encontrada' });
}
res.status(HTTP_OK_STATUS).send(filter);
});

app.listen(PORT, () => {
console.log('Online');
});
