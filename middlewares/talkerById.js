const fs = require('fs');

module.exports = async (req, res, next) => {
  try {
    const { id } = req.params;
    const response = await fs.promises.readFile('./talker.json', 'utf8');
    req.talkerID = JSON.parse(response).find((talker) => talker.id === parseInt(id, 10));
    next();
  } catch (error) {
    res.status(401).json({
      message: 'Not Found',
    });
  }
};
