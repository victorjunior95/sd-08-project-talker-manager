const express = require('express');
const bodyParser = require('body-parser');
const fsfunctions = require('./fs-functions');
const middlewares = require('./middlewares');

const app = express();
app.use(bodyParser.json());

// ...\/ Não excluir \/...//
const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

// 7 - Crie o endpoint GET /talker/search?q=searchTerm
app.get('/talker/search', middlewares.validationToken, async (req, res) => {
  const file = await fsfunctions.readDataTalkers();
  const { q } = req.query;
  if (q) {
    const verifyName = file.filter(({ name }) => name.includes(q));
    return res.status(200).json(verifyName);
  }
  return res.status(200).json(file);
});

// 1 - Crie o endpoint GET /talker 
app.get('/talker', async (req, res) => {
  const file = await fsfunctions.readDataTalkers();
  res.status(200).json(file);
});
// 2 - Crie o endpoint GET /talker/:id
app.get('/talker/:id', async (req, res) => {
  const { id } = req.params;
  const file = await fsfunctions.readDataTalkers();
  const verifyID = file.find((date) => date.id === parseInt(id, 10));
  if (verifyID) {
    res.status(200).json(verifyID);
  } else {
    res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  }
});
// 3 - Crie o endpoint POST /login
app.post('/login', middlewares.login);

// 4 - Crie o endpoint POST /talker
app.post('/talker', middlewares.validationToken, middlewares.validationName,
  middlewares.validationAge, middlewares.validationTalker, middlewares.validationDate,
  middlewares.validationRate, async (req, res) => {
    const file = await fsfunctions.readDataTalkers();
    const registreTalker = req.body;
    registreTalker.id = file.length + 1;
    file.push(registreTalker);
    await fsfunctions.writeDataTalkers(file);
    res.status(201).json(registreTalker);
  });
// 5 - Crie o endpoint PUT /talker/:id
app.put('/talker/:id', middlewares.validationToken, middlewares.validationName,
  middlewares.validationAge, middlewares.validationTalker, middlewares.validationDate,
  middlewares.validationRate, async (req, res) => {
    const id = Number(req.params.id);
    const file = await fsfunctions.readDataTalkers();
    const editTalker = { ...req.body, id };
    const verifyTalker = file.map((data) => {
      if (data.id === id) return editTalker;
      return data;
    });
    await fsfunctions.writeDataTalkers(verifyTalker);
    res.status(200).json(editTalker);
  });

// 6 - Crie o endpoint DELETE /talker/:id
app.delete('/talker/:id', middlewares.validationToken, async (req, res) => {
  const id = Number(req.params.id);
  const file = await fsfunctions.readDataTalkers();
  const veridyDeleteById = file.find((data) => data.id !== id);
  await fsfunctions.writeDataTalkers(veridyDeleteById);
  res.status(200).json({ message: 'Pessoa palestrante deletada com sucesso' });
});

app.listen(PORT, () => {
  console.log('Online');
});
