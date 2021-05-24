const express = require('express');

const app = express();

const HTTP_OK_STATUS = 200;
const PORT = '3000';

const { 
  validateEmail,
  validatePassword,
  validateName,
  validateAge,
  validateTalk,
  validateWatchedAt, 
  validateRate,
  validateToken,
  readTalkers,
  writeTalkers,
  generateToken,
} = require('./middlewares');

app.use(express.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_req, res) => res.status(HTTP_OK_STATUS).send());
// não remova esse endpoint, e para o avaliador funcionar

app.get('/talker/search', validateToken, async (req, res) => {
  const { searchTerm } = req.query;
  
  const talkerList = await readTalkers();

  if (searchTerm === '' || searchTerm === undefined) {
    return res.status(200).json(talkerList);
  }

  const filteredTalker = talkerList.filter((talk) => talk.name.includes(searchTerm));

  return res.status(200).json(filteredTalker);
});

app.get('/talker', async (_req, res) => {
  const talkList = await readTalkers();

  return res.status(200).json(talkList);
});

app.get('/talker/:id', async (req, res) => {
  const id = Number(req.params.id);
  const talkList = await readTalkers();
  const findTaker = talkList.find((talker) => talker.id === id);

  if (!findTaker) { 
    return res.status(404)
      .json({ message: 'Pessoa palestrante não encontrada' });
  }

  return res.status(200).json(findTaker);
});

app.post('/login', validateEmail, validatePassword, async (_req, res) => {
  const token = generateToken();

  return res.status(200).json(token);
});

app.post('/talker', validateToken, validateName, validateAge,
  validateTalk, validateWatchedAt, validateRate, async (req, res) => {
    const { name, age, talk } = req.body;

    const talkList = await readTalkers();

    const id = talkList.length + 1;
    
    talkList.push({ name, age, id, talk });
  
    await writeTalkers(talkList);
  
    return res.status(201).json({ name, age, id, talk });
});

app.put('/talker/:id', validateToken, validateName, validateAge,
  validateTalk, validateWatchedAt, validateRate, async (req, res) => {
    const id = parseInt(req.params.id, 10);

    const { name, age, talk } = req.body;

    const talkList = await readTalkers();

    const findTalker = talkList.find((talker) => talker.id === id);
  
    if (!findTalker) return { err: { message: 'Pessoa palestrante não encontrada' } };
    
    const indexOfTalker = talkList.indexOf(findTalker);
    
    talkList[indexOfTalker] = { name, age, id, talk };
  
    await writeTalkers(talkList);
  
    return res.status(200).json({ name, age, id, talk });
});

app.delete('/talker/:id', validateToken, async (req, res) => {
  const { id } = req.params;

  let talkList = await readTalkers();

  talkList = talkList.map((talker) => talker.id === id);

  await writeTalkers(talkList);

  return res.status(200).json({ message: 'Pessoa palestrante deletada com sucesso' });
});

app.listen(PORT, () => console.log(`Online PORT ${PORT}`));
