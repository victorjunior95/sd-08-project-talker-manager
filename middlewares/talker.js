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

module.exports = app;
