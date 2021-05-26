const fs = require('fs');
const express = require('express');
const { allValidation, validationToken } = require('../middlewares/validationForms');

const route = express.Router();

// meu código aqui assim como foi visto da aula da turma 07

const talkers = 'talker.json';

route.get('/', (req, res) => {
  const dataTalker = JSON.parse(fs.readFileSync(talkers, 'utf-8'));
  if (!dataTalker.length) {
    return res.status(200).json([]);
  }
  return res.status(200).json(dataTalker);
});

route.get('/:id', (req, res) => {
  const dataTalkers = JSON.parse(fs.readFileSync(talkers, 'utf-8'));
  const talkerId = dataTalkers.find(
    (dataId) => dataId.id === +req.params.id, 
    // o sinal de + é dica do meu amigo Ediberto para transformar o req.params.id em número
  );
  
  if (talkerId) {
    return res.status(200).json(talkerId);
  }
  return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
});

route.post('/', async (req, res) => {
  const dataTalker = await JSON.parse(fs.readFileSync(talkers, 'utf-8'));
  const { name, age, talk } = req.body;
  try {
    allValidation(req);
    await dataTalker.push({ name, age, id: dataTalker.length + 1, talk });
    await fs.writeFileSync(`${__dirname}/../talker.json`, JSON.stringify(dataTalker), 'utf-8');
    return res.status(201).json(dataTalker[dataTalker.length - 1]);
  } catch (error) {
    if (error.message.includes('Token')) return res.status(401).json({ message: error.message });
    return res.status(400).json({ message: error.message });
  }
});

route.delete('/:id', async (req, res) => {
  const dataTalker = await JSON.parse(fs.readFileSync(talkers, 'utf-8'));
  const { authorization } = req.headers;
  const { id } = req.params;
  try {
    validationToken(authorization);
    const newDataTalkers = await dataTalker.filter((talker) => talker.id !== +id);
    await fs.writeFileSync(`${__dirname}/../talker.json`, JSON.stringify(newDataTalkers));
    return res.status(200).json({ message: 'Pessoa palestrante deletada com sucesso' });
  } catch (error) {
    return res.status(401).json({ message: error.message });
  }
});

route.put('/:id', async (req, res) => {
  const dataTalker = await JSON.parse(fs.readFileSync(talkers, 'utf-8'));
  const { name, age, talk } = req.body;
  const { id } = req.params;
  try {
    allValidation(req);
    const editTalker = await dataTalker.find((talker) => talker.id === +id);
    if (editTalker) {
      dataTalker[id - 1].name = name;
      dataTalker[id - 1].age = age;
      dataTalker[id - 1].talk = talk;
    }
    await fs.writeFileSync(`${__dirname}/../talker.json`, JSON.stringify(dataTalker));
    return res.status(200).json(dataTalker[+id - 1]);
  } catch (error) {
    if (error.message.includes('Token')) return res.status(401).json({ message: error.message });
    return res.status(400).json({ message: error.message });
  }
});

module.exports = route;
