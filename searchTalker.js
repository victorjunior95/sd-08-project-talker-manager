const express = require('express');

const getTalkerJson = require('./fs-talkers');
const middleware = require('./middlewares');

const router = express.Router();

const searchTalker = router.get('/talker/search', middleware.authorization,
  
  async (req, res) => {
    const content = await getTalkerJson();
      const { q } = req.query;
      if (q) {
        const filteredTalkers = content.filter(({ name }) => name.includes(q));
        return res.status(200).json(filteredTalkers);
      }
      return res.status(200).send(content);
  });

  module.exports = searchTalker;
