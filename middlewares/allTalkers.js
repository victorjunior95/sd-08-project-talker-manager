const fs = require('fs');

module.exports = async (req, res, next) => {
  try {
    const response = await fs.promises.readFile('./talker.json', 'utf8');
    req.talkersAll = (JSON.parse(response));
    next();
  } catch (error) {
    res.status(401).send('Erro');
  }
};
