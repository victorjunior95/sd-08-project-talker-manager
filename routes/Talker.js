const fs = require('fs');
const express = require('express');

const route = express.Router();

// meu código aqui assim como foi visto da aula da turma 07

route.get('/', (req, res) => {
  const dataTalker = JSON.parse(fs.readFileSync('talker.json', 'utf-8'));
  if (!dataTalker.length) {
    return res.status(200).json([]);
  }
  return res.status(200).json(dataTalker);
});

route.get('/:id', (req, res) => {
  const dataTalkers = JSON.parse(fs.readFileSync('talker.json', 'utf-8'));
  const talkerId = dataTalkers.find(
    (dataId) => dataId.id === +req.params.id, 
    // o sinal de + é dica do meu amigo Ediberto para transformar o req.params.id em número
  );
  
  if (talkerId) {
    return res.status(200).json(talkerId);
  }
  return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
});

module.exports = route;
