const rescue = require('express-rescue');
const data = require('../../data');
// const schema = require('../../schemas');

const deleteTalker = rescue(async (req, res, _next) => {
  const { id } = req.params;

  const content = await data.readFileTalker(); // Trata possível erro

  const newContent = content.filter((talker) => talker.id !== +id);

  await data.writeFileTalker(newContent); // Trata possível erro

  res.status(200).json({ message: 'Pessoa palestrante deletada com sucesso' });
});

module.exports = deleteTalker;
