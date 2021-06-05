const app = require('../utils/express');
const readFile = require('../utils/readFile');

const data = `${__dirname}/../talker.json`;

app.get('/', async (req, res) => {
  try {
    const fileContent = await readFile(data);
    res.status(200);
    res.json(fileContent);
  } catch (err) {
    res.status(500);
    res.json({ message: 'Ocorreu um erro inesperado' });
  }
});

module.exports = app;
