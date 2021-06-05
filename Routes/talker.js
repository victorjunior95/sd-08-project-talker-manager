const app = require('../utils/express');
const readFile = require('../utils/readFile');
const tokenMiddleware = require('../middlewares/validation/token');
const nameMiddleware = require('../middlewares/validation/name');
const ageMiddleware = require('../middlewares/validation/age');
const talkMiddleware = require('../middlewares/validation/talk');
const watchedAtMiddleware = require('../middlewares/validation/watchedAt');
const rateMiddleware = require('../middlewares/validation/rate');
const writeFile = require('../utils/writeFile');

const path = `${__dirname}/../talker.json`;

app.get('/', async (req, res) => {
  try {
    const data = await readFile(path);
    res.status(200);
    res.json(data);
  } catch (err) {
    res.status(500);
    res.json({ message: 'Ocorreu um erro inesperado' });
  }
});

app.get('/:talkerID', async (req, res) => {
  try {
    const data = await readFile(path);
    const { talkerID } = req.params;
    const filteredID = data.find(({ id }) => id === Number(talkerID));

    if (filteredID) {
      res.status(200);
      res.json(filteredID);
    } else {
      res.status(404);
      res.json({ message: 'Pessoa palestrante não encontrada' });
    }
  } catch (err) {
    res.status(500);
    res.json({ message: 'Ocorreu um erro inesperado' });
  }
});

app.post('/',
  tokenMiddleware,
  nameMiddleware,
  ageMiddleware,
  talkMiddleware,
  watchedAtMiddleware,
  rateMiddleware,
  async (req, res) => {
    try {
      const talker = await writeFile(path, req.body);
      res.status(201).json(talker);
    } catch (err) {
      res.json({ message: 'Ocorreu um erro inesperado' });
    }
  });

module.exports = app;
