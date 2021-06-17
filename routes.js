const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const { readFile, writeIntoFile } = require('./auxFunctions');

app.use(bodyParser.json());

const handleTalkersRequest = (_req, res) => {
  const readFileResponse = readFile();
  return res.status(200).json(readFileResponse);
  // return res.status(404).send(err);
};

const handleSearchForId = (req, res) => {
  const readFileResponse = readFile();
  const talkerFilterById = readFileResponse.filter(
    (talker) => talker.id.toString() === req.params.id,
  )[0];
  if (!talkerFilterById) {
    return res
      .status(404)
      .json({ message: 'Pessoa palestrante não encontrada' });
  }
  return res.status(200).send(talkerFilterById);
};

const createTalker = async (req, res) => {
  const arrTalkers = await readFile();
  const { name, age, talk } = req.body;
  const objectToSaveNewTalker = {
    id: arrTalkers.length + 1,
    name,
    age,
    talk: {
      watchedAt: talk.watchedAt,
      rate: talk.rate,
    },
  };
  arrTalkers.push(objectToSaveNewTalker);
  await writeIntoFile('./talker.json', arrTalkers);

  return res.status(201).json(objectToSaveNewTalker);
};

const updateTalker = async (req, res) => {
  const readFileResponse = readFile();
  const { name, age, talk } = req.body;

  const updateTalkerArr = readFileResponse.map((talker) => {
    if (talker.id === req.params.id) {
      return {
        id: talker.id,
        name: talker.name,
        age: talker.age,
        talk: talker.talk,
      };
    }
    return talker;
  });

  await writeIntoFile('./talker.json', updateTalkerArr);
};

const deleteTalker = async (req, res) => {
  const readFileResponse = readFile();
  const updateArrTalker = readFileResponse.filter(
    (talker) => talker.id.toString() !== req.params.id,
  )[0];
  await writeIntoFile('./talker.json', updateArrTalker);
  res.status(200).json({ message: 'Pessoa palestrante deletada com sucesso' });
};

const searchByTerm = (req, res) => {
  const { q } = req.query;
  const readFileResponse = readFile();

  const talkerSearchQ = readFileResponse.filter((talker) => talker.includes(q));
  if (!talkerSearchQ) {
    res.status(200).send([]);
  }
  if (!q) {
    return res.status(200).json(readFileResponse);
  }

  res.status(200).json(talkerSearchQ);
};

module.exports = {
  handleTalkersRequest,
  handleSearchForId,
  createTalker,
  deleteTalker,
  searchByTerm,
  updateTalker,
};
