const express = require('express');
const rescue = require('express-rescue');
const { readFile, writeFile } = require('fs').promises;

const {
  validateToken,
  validateName,
  validateAge,
  validateTalk
} = require('./talkerMiddleware');

const router = express.Router();

/*
------------------------- UTILS -----------------------------
*/

async function getSpeakers() {
  return await readFile(`${__dirname}/talker.json`, 'utf-8')
  .then((data) => JSON.parse(data));
};

async function setSpeaker(content) {
  const newData = JSON.stringify(content);
  return await writeFile(`${__dirname}/talker.json`, newData);
}
/*
------------------------- UTILS -----------------------------
*/

/*
------------------------- ROUTERS -----------------------------
*/

router.get('/', rescue(async (_req, res) => {
  const talkers = await getSpeakers();
  res.status(200).json(talkers);
}));

router.get('/:id', rescue(async (req, res) => {
  const talkers = await getSpeakers();
  const talker = talkers.find(({ id }) => parseInt(id, 10) === parseInt(req.params.id, 10));
  if(!talker) {
    res.status(404).send({ "message": "Pessoa palestrante não encontrada" });
  };

  res.status(200).send(talker);
}));

// router.get('/search?q=searchTerm', rescue(async (req, res) => {
//   const talkers = await getSpeakers();
//   const talker = talkers.find(({ id }) => parseInt(id, 10) === parseInt(req.params.id, 10));
//   if(!talker) {
//     res.status(404).send({ "message": "Pessoa palestrante não encontrada" });
//   };

//   res.status(200).send(talker);
// }));

router.post('/', validateToken, validateName, validateAge, validateTalk, rescue(async (req, res) => {
  const talkers = await getSpeakers();
  const { name, age, talk } = req.body;
  const id = talkers.length + 1;
  const newTalker = { name, age, id, talk};

  talkers.push(newTalker);

  await setSpeaker(talkers);

  res.status(201).send(newTalker);
}));

router.put('/:id', validateToken, validateName, validateAge, validateTalk, rescue(async (req, res) => {
  const talkers = await getSpeakers();
  const { name, age, talk } = req.body;
  const { id } = req.params;
  const editedTalker = { name, age, id: Number(id), talk };

  talkers[id - 1] = editedTalker;

  await setSpeaker(talkers);

  res.status(200).send(editedTalker);
}));

router.delete('/:id', validateToken, rescue(async (req, res) => {
  const talkers = await getSpeakers();
  const { id } = req.params;

  talkers.splice((id - 1), 1);

  await setSpeaker(talkers);

  res.status(200).send({ "message": "Pessoa palestrante deletada com sucesso" });
}));

/*
------------------------- ROUTERS -----------------------------
*/

module.exports = router;
