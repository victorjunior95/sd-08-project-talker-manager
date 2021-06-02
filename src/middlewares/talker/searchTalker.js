const rescue = require('express-rescue');
const data = require('../../data');
// const schema = require('../../schemas');

const searchTalker = rescue(async (req, res, _next) => {
  const { q: query } = req.query;
  const content = await data.readFileTalker(); // Trata possível erro

  if (!query) return res.status(200).json(content);

  const talker = content.filter(({ name }) =>
    name.toUpperCase().includes(query.toUpperCase()));
  res.status(200).send(talker);
});

module.exports = searchTalker;
