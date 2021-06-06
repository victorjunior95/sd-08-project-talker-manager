const app = require('../utils/express');
const readFile = require('../utils/readFile');
const tokenMiddleware = require('../middlewares/validation/token');
const nameMiddleware = require('../middlewares/validation/name');
const ageMiddleware = require('../middlewares/validation/age');
const talkMiddleware = require('../middlewares/validation/talk');
const watchedAtMiddleware = require('../middlewares/validation/watchedAt');
const rateMiddleware = require('../middlewares/validation/rate');
const writeFile = require('../utils/writeFile');
const modifyFile = require('../utils/modifyFile');

const path = `${__dirname}/../talker.json`;
const errorMessage = 'Ocorreu um erro inesperado';

app.get('/', async (req, res) => {
  try {
    const data = await readFile(path);
    res.status(200);
    res.json(data);
  } catch (err) {
    res.status(500);
    res.json({ message: errorMessage });
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
    res.json({ message: errorMessage });
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
      res.json({ message: errorMessage });
    }
  });

  app.put('/:id',
  tokenMiddleware,
  nameMiddleware,
  ageMiddleware,
  talkMiddleware,
  watchedAtMiddleware,
  rateMiddleware,
  async (req, res) => {
    try {
      const { id } = req.params;
      const talker = await modifyFile(path, req.body, id, 'edit');
      res.status(200).json(talker);
    } catch (err) {
      res.send({ message: errorMessage });
    }
  });

  app.delete('/:id',
  tokenMiddleware,
  async (req, res) => {
    try {
      await modifyFile(path, req.body, req.params.id, 'delete');
      res.status(200).json({ message: 'Pessoa palestrante deletada com sucesso' });
    } catch (err) {
      res.send({ message: errorMessage });
    }
  });

module.exports = app;
