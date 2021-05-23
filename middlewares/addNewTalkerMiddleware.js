const fs = require('fs').promises;
const talkersData = require('../talker.json');

module.exports = async (request, response) => {
  const talker = request.body;
  const newTalker = {
    id: talkersData.length + 1,
    ...talker,
  };
  talkersData.push(newTalker);
  await fs.writeFile(`${__dirname}/../talker.json`, JSON.stringify(talkersData))
    .then(() => response.status(201).json(newTalker))
    .catch((err) => console.log(err));
};
