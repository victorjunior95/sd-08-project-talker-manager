const app = require('../utils/express');
const readFile = require('../utils/readFile');

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

module.exports = app;
